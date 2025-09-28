module.exports = {
  apps: [
    {
      name: 'taskit-frontend',
      script: 'serve',
      args: '-s dist -l 3000',
      cwd: '/home/ubuntu/TaskIt',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/ubuntu/logs/taskit-frontend-error.log',
      out_file: '/home/ubuntu/logs/taskit-frontend-out.log',
      log_file: '/home/ubuntu/logs/taskit-frontend-combined.log',
      time: true
    }
  ]
};
