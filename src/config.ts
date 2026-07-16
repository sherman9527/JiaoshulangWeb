/// <summary>
/// API 配置 — 后端地址 + 客户端认证凭证。
/// 生产环境通过环境变量注入，不硬编码。
/// </summary>

// 后端地址
// 开发: 留空（Vite proxy 转发 /api → localhost:8080）
// 生产: Azure APIM URL 或 App Service URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// 客户端认证凭证（前端注册为 "web-frontend" 客户端）
// 开发环境从 .env.local 读取，生产环境从 .env.production 读取
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
export const API_KEY = import.meta.env.VITE_API_KEY || '';

// 环境变量说明：
// VITE_API_BASE_URL  = Azure APIM 网关地址（如 https://<apim-name>.azure-api.net）
// VITE_CLIENT_ID     = 客户端标识
// VITE_API_KEY       = API 密钥（从 APIM subscription 或后端获取）
//
// 本地开发: 复制 .env.example 为 .env.local，填入你的开发密钥
// 生产部署: .env.production 文件不进 git，通过 CI/CD 注入
