module.exports = {
  name: 'Decoder',
  acronym: 'DECODE',
  description: 'Identifies encoded strings and decodes them',
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  customTypes: [
    {
      key: 'base64',
      regex: /(?:[A-Za-z0-9+\/]{4})+(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)/
    },
    {
      key: 'urlencoding',
      regex: /(?:%[0-7][0-9A-F]|%[C-D][0-9A-F](?:%[0-9A-F][0-9A-F]){1}|%E[0-9A-F](?:%[0-9A-F][0-9A-F]){2}|%F[0-9A-F](?:%[0-9A-F][0-9A-F]){3})+/
    }
  ],
  block: {
    component: {
      file: './components/decoder-block.js'
    },
    template: {
      file: './templates/decoder-block.hbs'
    }
  }
};
