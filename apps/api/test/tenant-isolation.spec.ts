import { TenantAuthGuard } from '../src/common/guards/tenant-auth.guard';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('Tenant Isolation Guard Verification', () => {
  let guard: TenantAuthGuard;
  let mockSupabaseService: any;

  beforeEach(() => {
    mockSupabaseService = {
      getClient: () => ({
        auth: {
          getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-a' } }, error: null }),
        },
        from: jest.fn().mockImplementation((table) => {
          if (table === 'organization_members') {
            return {
              select: () => ({
                eq: (col1: string, val1: string) => ({
                  eq: (col2: string, val2: string) => ({
                    single: jest.fn().mockImplementation(() => {
                      if (val1 === 'org-allowed' && val2 === 'user-a') {
                        return Promise.resolve({ data: { role: 'owner' }, error: null });
                      }
                      return Promise.resolve({ data: null, error: { message: 'Not found' } });
                    }),
                  }),
                }),
              }),
            };
          }
          return {};
        }),
      }),
    };

    guard = new TenantAuthGuard(mockSupabaseService);
  });

  it('should allow access when user is a member of the requested organization', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid-jwt',
            'x-organization-id': 'org-allowed',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    // Set production env to test real guard logic
    const oldEnv = process.env.APP_ENV;
    process.env.APP_ENV = 'production';

    const result = await guard.canActivate(mockContext);
    expect(result).toBe(true);

    process.env.APP_ENV = oldEnv;
  });

  it('should throw ForbiddenException when user attempts cross-tenant access to unauthorized organization', async () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid-jwt',
            'x-organization-id': 'org-unauthorized-target',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    const oldEnv = process.env.APP_ENV;
    process.env.APP_ENV = 'production';

    await expect(guard.canActivate(mockContext)).rejects.toThrow(ForbiddenException);

    process.env.APP_ENV = oldEnv;
  });
});
