import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';

// 创建Hono应用实例
const app = new Hono();

// 添加CORS支持
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 静态文件服务 - 处理前端资源
app.use('/*', serveStatic({ root: './' }));

// 基本的健康检查端点
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 获取网站列表的API端点（示例）
app.get('/api/sites', async (c) => {
  // 这里可以连接到KV存储或D1数据库
  // 目前返回示例数据
  const sites = [
    {
      id: 1,
      name: '示例网站',
      url: 'https://example.com',
      description: '这是一个示例网站',
      category: '工具',
      icon: 'https://example.com/favicon.ico'
    }
  ];
  
  return c.json({ success: true, data: sites });
});

// 添加网站的API端点（示例）
app.post('/api/sites', async (c) => {
  try {
    const body = await c.req.json();
    
    // 这里应该验证数据并保存到数据库
    // 目前只是返回成功响应
    return c.json({ 
      success: true, 
      message: '网站添加成功',
      data: { id: Date.now(), ...body }
    });
  } catch (error) {
    return c.json({ 
      success: false, 
      message: '添加网站失败',
      error: error instanceof Error ? error.message : '未知错误'
    }, 400);
  }
});

// 404处理
app.notFound((c) => {
  return c.json({ 
    success: false, 
    message: 'API端点未找到' 
  }, 404);
});

// 错误处理
app.onError((err, c) => {
  console.error('API错误:', err);
  return c.json({ 
    success: false, 
    message: '服务器内部错误',
    error: err.message 
  }, 500);
});

export default app;
