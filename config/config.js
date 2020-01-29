module.exports = {
  name: 'Decoder',
  acronym: 'DECODE',
  description: 'Identifies encoded strings and decodes them',
  onDemandOnly: true,
  logging: {
    level: 'info' //trace, debug, info, warn, error, fatal
  },
  customTypes: [
    {
      key: 'base64',
      regex: /(?:[A-Za-z0-9+\/]{4}|\s)+(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?/
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
  },
  options: [
    {
      key: 'asciiOnly',
      name: 'Only Display ASCII Printable Characters',
      description:
        'If checked, only text which decodes to printable ASCII characters will be displayed (ASCII codes between 32 and 127.',
      default: true,
      type: 'boolean',
      userCanEdit: true,
      adminOnly: false
    },
    {
      key: 'minLength',
      name: 'Minimum Input Length',
      description:
        'The minimum text input length for a string to be converted from base64 and displayed.',
      default: 15,
      type: 'number',
      userCanEdit: true,
      adminOnly: false
    }
  ]
};
