
/**
 * Module dependencies.
 */

var Like = require('./like');
var Reblog = require('./reblog');
var Comment = require('./comment');
var debug = require('debug')('wpcom:post');

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
 * Get post
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.get = function(query, fn){
  if (!this._id && this._slug) {
    return this.getBySlug(query, fn);
  }

  var path = '/sites/' + this._sid + '/posts/' + this._id;
  this.wpcom.request(path, query, null, fn);
};

/**
 * Get post by slug
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.getBySlug = function(query, fn){
  var path = '/sites/' + this._sid + '/posts/slug:' + this._slug;
  this.wpcom.request(path, query, null, fn);
};

/**
 * Add post
 *
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.add = function(body, fn){
  var path = '/sites/' + this._sid + '/posts/new';
  this.wpcom.request({ path: path, method: 'post' }, null, body, fn);
};

/**
 * Edit post
 *
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.update = function(body, fn){
  var path = '/sites/' + this._sid + '/posts/' + this._id;
  this.wpcom.request({ path: path, method: 'post' }, null, body, fn);
};

/**
 * Delete post
 *
 * @param {Function} fn
 * @api public
 */

Post.prototype['delete'] =
Post.prototype.del = function(fn){
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/delete';
  this.wpcom.request({ path: path, method: 'post' }, null, null, fn);
};

/**
 * Get post likes list
 *
 * @param {Object} [query]
 * @param {Function} fn
 * @api public
 */

Post.prototype.likesList = function(query, fn){
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/likes';
  this.wpcom.request(path, query, null, fn);
};

/**
 * Search within a site for related posts
 *
 * @param {Object} body
 * @param {Function} fn
 * @api public
 */

Post.prototype.related = function(body, fn){
  var path = '/sites/' + this._sid + '/posts/' + this._id + '/related';
  this.wpcom.request({ path: path, method: 'post' }, null, body, fn);
};

/**
 * Create a `Like` instance
 *
 * @api public
 */

Post.prototype.like = function(){
  return Like( this._id, this._sid, this.wpcom);
};

/**
 * Create a `Reblog` instance
 *
 * @api public
 */

Post.prototype.reblog = function(){
  return Reblog(this._id, this._sid, this.wpcom);
};

/**
 * Create a `Comment` instance
 *
 * @param {String} [cid] comment id
 * @api public
 */

Post.prototype.comment = function(cid){
  return Comment(cid, this._id, this._sid, this.wpcom);
};

/**
 * :COMMENT:
 * Return recent comments
 *
 * @param {Objecy} [query]
 * @param {String} id
 * @api public
 */

Post.prototype.comments = function(query, fn){
  var comment = Comment(null, this._id, this._sid, this.wpcom);
  comment.replies(query, fn);
  return comment;
};

/**
 * Expose `Post` module
 */

module.exports = Post;
