import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', '@heroicons/react', 'antd', 'lucide-react', 'react-icons'],
          'chart-vendor': ['chart.js', 'react-chartjs-2', 'chartjs-plugin-datalabels'],
          'form-vendor': ['react-hook-form', 'react-input-mask', 'react-datepicker'],
          'pdf-vendor': ['html2canvas', 'jspdf'],
          'stripe-vendor': ['@stripe/react-stripe-js', '@stripe/stripe-js'],
          'utils-vendor': ['axios', 'date-fns', 'socket.io-client', 'zustand'],
          // Route-based chunks
          'admin': [
            './src/pages/admin/AdminDashboard',
            './src/pages/admin/Tasks',
            './src/pages/admin/Settings',
            './src/pages/admin/Teammanagement',
            './src/pages/admin/Customers',
            './src/pages/admin/Invoices',
            './src/pages/admin/Credits'
          ],
          'manager': [
            './src/pages/manager/ManagerDashboard',
            './src/pages/manager/Tasks',
            './src/pages/manager/Invoices',
            './src/pages/manager/Credits'
          ],
          'auth': [
            './src/pages/auth/Login',
            './src/pages/auth/Signup',
            './src/pages/auth/forgotPassword'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand'
    ]
  }
})
