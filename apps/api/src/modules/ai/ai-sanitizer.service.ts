import { Injectable } from '@nestjs/common';
import { sanitizeAIPrompt } from '@omnigrc/shared';

@Injectable()
export class AISanitizerService {
  /**
   * Data Minimization & Redaction Engine
   * Strips organization names, user emails, UUIDs, and unnecessary tenant data.
   */
  redactControlContext(controlCode: string, controlName: string, controlDescription: string, orgName?: string): string {
    const rawContent = `Control Code: ${controlCode}\nName: ${controlName}\nDescription: ${controlDescription}`;
    return sanitizeAIPrompt(rawContent, orgName);
  }
}
