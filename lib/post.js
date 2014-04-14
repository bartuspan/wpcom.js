
/**
 * Module dependencies.
 */

var events = require('events');
var util = require('util');
var debug = require('debug')('wpcom:action');

/**
 * Alias
 */

var Emitter = events.EventEmitter;

/**
 * Post methods
 *
 * @param {String} id
 * @param {String} sid site id
 * @param {WPCOM} wpcom
 * @api public
 */

function Post(id, sid, wpcom){
  if (!(this instanceof Post)) return new Post(id, sid, wpcom);

  this.wpcom = wpcom;
  this._sid = sid;

  // set `id` and/or `slug` properties
  id = id || {};
  if ('object' != typeof id) {
    this._id = id;
  } else {
    this._id = id.id;
    this._slug = id.slug;
  }
}

/**
 * Inherit from Emitter
 */

util.inherits(Post, Emitter);

/**
 * Set post `id`
 *
 * @api public
 */

Post.prototype.id = function(id){
  this._id = id;
};

/**
 * Set post `slug`
 *
 * @param {String} slug
 * @api public
 */

Post.prototype.slug = function(slug){
  this._slug = slug;
};

/**
 * Get post data
 *
 * @param {Object} [params]
 * @param {Function} fn
 * @api public
 */

Post.prototype.get = function(params, fn){
  if (!this._id && this._slug) {
    return this.getbyslug(params, fn);
  }

  var set = { site: this._sid, post_id: this._id };
  this.wpcom.req.send('post.get', set, params, fn);
};

/**
 * Get post data by slug
 *
 * @param {String} slug
 * @param {Object} [params]
 * @param {Function} fn
 * @api public
 */

Post.prototype.getbyslug = function(params, fn){
  var set = { site: this._sid, post_slug: this._slug };
  this.wpcom.req.send('post.get_by_slug', set, params, fn);
};

/**
 * Add post
 *
 * emit `add` event
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

Post.prototype.add = function(data, fn){
  var set = { site: this._sid };
  this.wpcom.req.send('post.add', set, { data: data }, function(err, data){
    if (err) return fn(err);

    this.emit('add', data);
    if (fn) fn(null, data);
  }.bind(this));
};

/**
 * Edit post
 *
 * @param {Object} data
 * @param {Function} fn
 * @api public
 */

Post.prototype.update = function(data, fn){
  var set = { site: this._sid, post_id: this._id };
  this.wpcom.req.send('post.edit', set, { data: data }, fn);
};

/**
 * Delete post
 *
 * @param {Function} fn
 * @api public
 */

Post.prototype.delete = function(fn){
  var set = { site: this._sid, post_id: this._id };
  this.wpcom.req.send('post.delete', set, fn);
};

/**
 * Expose `Post` module
 */

module.exports = Post;
