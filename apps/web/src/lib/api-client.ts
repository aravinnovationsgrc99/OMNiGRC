const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
const DEFAULT_ORG_ID = '00000000-0000-0000-0000-000000000001';

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Authorization')) {
    headers.set('Authorization', 'Bearer demo-token');
  }
  if (!headers.has('X-Organization-Id')) {
    headers.set('X-Organization-Id', DEFAULT_ORG_ID);
  }
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`API Error [${res.status}]: ${errText}`);
    }

    return res.json();
  } catch (err: any) {
    // If fetching fails during SSR on Vercel Serverless Functions, return empty fallback to prevent FUNCTION_INVOCATION_FAILED 500 crash
    if (typeof window === 'undefined') {
      console.warn(`[Vercel SSR Graceful Fallback] ${endpoint}: ${err.message}`);
      return [] as unknown as T;
    }
    throw err;
  }
}
