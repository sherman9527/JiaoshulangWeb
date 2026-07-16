import { API_BASE_URL, API_KEY } from './config';

export interface DownloadOutcome {
  ok: boolean;
  message?: string;
}

/**
 * 请求后端下载接口并触发下载。
 *
 * 流程：GET /api/v1/downloads/{channel}/exe（带客户端认证头）→ 后端返回 Blob SAS URL
 * → 浏览器直连 Blob 下载（exe 不经过后端，天然断点续传）。
 *
 * 失败时返回可展示的友好文案（区分“暂未发布 503 / 限流 429 / 其他”），
 * 而不是跳转到无效锚点。
 */
export async function requestDownload(channel: 'beta' | 'stable' = 'beta'): Promise<DownloadOutcome> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/downloads/${channel}/exe`, {
      headers: { 'Ocp-Apim-Subscription-Key': API_KEY },
    });

    if (res.ok) {
      const data = (await res.json()) as { downloadUrl?: string };
      if (data?.downloadUrl) {
        window.location.href = data.downloadUrl;
        return { ok: true };
      }
      return { ok: false, message: '暂未发布，敬请期待' };
    }

    if (res.status === 503) return { ok: false, message: '当前版本暂未发布，敬请期待' };
    if (res.status === 429) return { ok: false, message: '请求过于频繁，请稍后再试' };
    return { ok: false, message: '下载暂时不可用，请稍后再试' };
  } catch {
    return { ok: false, message: '网络异常，请检查连接后重试' };
  }
}
