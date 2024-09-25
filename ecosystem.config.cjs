module.exports = {
  apps: [
    {
      name: 'нановости.чточто.рф',
      port: '3222',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs'
    }
  ]
}
