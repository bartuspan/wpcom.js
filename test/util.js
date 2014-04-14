
/**
 * Module dependencies
 */

var test = require('./data');
var WPCOM = require('../');

/**
 * `Util` module
 */

function Util(){}

/**
 * Create a WPCOM instance
 *
 * @api public
 */

Util.wpcom = function(){
  return WPCOM(test.token.global);
};

/**
 * Create a new WPCOM instance
 * Create a site instance object
 *
 * @api public
 */

Util.public_site = function(){
  var wpcom = WPCOM(test.token.global);
  return wpcom.site(test.site.public.url);
};

/**
 * Create a new WPCOM instance
 * setting with a private site id
 *
 * @api public
 */

Util.private_site = function(){
  var wpcom = WPCOM(test.token.private);
  return wpcom.site(test.site.private.url);
};

/**
 * Export module
 */

module.exports = Util;
