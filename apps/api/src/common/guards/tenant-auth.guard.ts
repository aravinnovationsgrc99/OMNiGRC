import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class TenantAuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const tenantHeader = request.headers['x-organization-id'] || request.query.organizationId;

    // For local dev/demo fallbacks if token is bearer demo
    if (authHeader === 'Bearer demo-token' || process.env.APP_ENV === 'development') {
      request.user = {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'admin@acmeglobal.com',
        full_name: 'Alex Morgan (GRC Lead)',
      };
      request.organizationId = tenantHeader || '00000000-0000-0000-0000-000000000001';
      return true;
    }

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.split(' ')[1];
    const client = this.supabaseService.getClient();

    const { data: { user }, error } = await client.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Invalid or expired authentication session');
    }

    const targetOrgId = tenantHeader;
    if (!targetOrgId) {
      throw new ForbiddenException('X-Organization-Id header is required for tenant isolation');
    }

    // Verify Organization Membership in DB (Server-Side Authorization)
    const { data: member, error: memberErr } = await client
      .from('organization_members')
      .select('role')
      .eq('organization_id', targetOrgId)
      .eq('user_id', user.id)
      .single();

    if (memberErr || !member) {
      throw new ForbiddenException('Access denied: User is not a member of the requested organization');
    }

    request.user = user;
    request.userRole = member.role;
    request.organizationId = targetOrgId;

    return true;
  }
}
