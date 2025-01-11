import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-aws': ['aws-amplify'],
          'vendor-aws-react': ['@aws-amplify/ui-react', '@aws-amplify/ui-react-storage'],
          'vendor-tanstack': ['@tanstack/react-query', '@tanstack/react-table'],
          
          // Combined editor chunk to prevent initialization issues
          'editor-bundle': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-code-block',
            '@tiptap/extension-image',
            '@tiptap/extension-link',
            '@tiptap/extension-placeholder',
            '@tiptap/extension-table',
            '@tiptap/extension-table-cell',
            '@tiptap/extension-table-header',
            '@tiptap/extension-table-row',
            '@tiptap/extension-task-item',
            '@tiptap/extension-task-list',
            '@tiptap/extension-text-align',
            '@tiptap/extension-typography'
          ],

          // Additional vendor dependencies
          'vendor-ui': ['lucide-react', 'react-hot-toast'],
          'vendor-date': ['date-fns'],
          'vendor-state': ['zustand']
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || 'chunk'
          return `assets/${name}-[hash].js`
        },
      },
    },
  },
})