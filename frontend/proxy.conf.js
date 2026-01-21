const PROXY_CONFIG = {
  '/api': {
    target: 'http://127.0.0.1:3000',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
    ws: true, // Enable websocket proxying
    onProxyReq: (proxyReq, req, res) => {
      console.log('🔄 Proxying request:', req.method, req.url);
      // Add any custom headers if needed
      // proxyReq.setHeader('X-Custom-Header', 'value');
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log('✅ Proxy response:', req.method, req.url, '→', proxyRes.statusCode);
    },
    onError: (err, req, res) => {
      console.error('❌ Proxy error:', err.message);
      console.error('   Request URL:', req.url);
      console.error('   Error details:', err);
      
      if (!res.headersSent) {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('Proxy error: ' + err.message);
      }
    }
  }
};

module.exports = PROXY_CONFIG;
