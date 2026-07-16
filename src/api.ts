import { API_BASE_URL, CLIENT_ID, API_KEY } from './config';

function authHeaders(): Record<string, string> {
  return {
    'X-Client-Id': CLIENT_ID,
    'X-Api-Key': API_KEY,
  };
}

/**
 * 通用 API 请求封装。
 * 自动拼接 API_BASE_URL，携带认证头，统一错误处理。
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: authHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `API error: ${res.status}`);
  }
  return res.json();
}
