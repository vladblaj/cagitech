import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-collapsible', '@radix-ui/react-icons', '@radix-ui/react-slot', '@radix-ui/react-toast'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          icons: ['lucide-react'],
          http: ['axios']
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          'console.log', 
          'console.info', 
          'console.debug', 
          'console.warn', 
          'console.error',
          'console.trace',
          'console.time',
          'console.timeEnd'
        ]
      }
    },
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    // Enable CSS minification
    cssMinify: true
  },
  server: {
    host: true,
    hmr: true,
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
})