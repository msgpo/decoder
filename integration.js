let Logger;

function startup(log) {
  Logger = log;
}

function doLookup(entities, options, cb) {
  let lookupResults = [];

  Logger.trace({ entities }, 'doLookup');

  entities.forEach((entity) => {
    if (entity.types.indexOf('custom.base64') >= 0) {
      if (entity.value.trim().length <= options.minLength) {
        return;
      }

      let b64string = _decodeBase64String(entity.value);

      if ((options.asciiOnly && isASCII(b64string)) || !options.asciiOnly) {
        lookupResults.push({
          entity: entity,
          data: {
            summary: [b64string],
            details: {
              type: 'base64',
              title: 'Base 64',
              decodedString: b64string
            }
          }
        });
      }
    } else if (entity.types.indexOf('custom.urlencoding') >= 0) {
      let urlstring = _decodeUrlString(entity.value);
      if (urlstring !== null) {
        lookupResults.push({
          entity: entity,
          data: {
            summary: [urlstring],
            details: {
              type: 'urlencoding',
              title: 'URL Encoding',
              decodedString: urlstring
            }
          }
        });
      }
    }
  });

  cb(null, lookupResults);
}

/**
 * Tests to see if the string only contains ASCII characters between code 30 and 127 as well as spaces.
 * @param str
 * @returns {boolean}
 */
function isASCII(str) {
  return /^[\s\x20-\x7F]*$/.test(str);
}

function _decodeBase64String(string) {
  let ascii = Buffer.from(string, 'base64').toString('ascii');
  return ascii;
}

function _decodeUrlString(string) {
  let ascii = null;
  try {
    ascii = decodeURIComponent(string);
  } catch (e) {
    Logger.warn({ string }, 'Invalid URL encoded string received');
  }
  return ascii;
}

module.exports = {
  doLookup: doLookup,
  startup: startup
};
