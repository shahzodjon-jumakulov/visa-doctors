module.exports = {
  apps: [
    {
      name: 'visa-doctors-frontend',
      exec_mode: 'cluster',
      instances: 'max', // Или конкретное число экземпляров, например 2
      script: './.output/server/index.mjs',
      watch: true,
      max_memory_restart: '300M', // Перезапуск при превышении памяти
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        BASE_URL: process.env.BASE_URL || 'https://api.visadoctors.uz', // URL API бэкенда
      }
    }
  ]
}