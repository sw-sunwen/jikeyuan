import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({        // L5: 导出配置对象
  plugins: [react()],                // L6: React 插件
  resolve: {                         // L8: 解析配置（路径别名等）
    alias: {                         // L9: 别名设置
      '@': path.resolve(__dirname, './src'),  // L10: @ → src 目录
    },
  },
  server: {                          // L13: 开发服务器配置
    port: 3000,                      // L14: 端口号
  },                                 // L15: 结束
});