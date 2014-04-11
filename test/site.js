

/**
 * WPCOM module
 */

var WPCOM = require('../');
var Site = require('../lib/site');
var util = require('./util');

/**
 * Testing data
 */

var test = require('./data');

/**
 * Create a `Site` instance
 */

describe('site', function(){

  describe('sync', function(){

    it('should be an instance of `Site`', function(){
      var wpcom = WPCOM();
      wpcom.site.should.be.an.instanceOf(Site);
    });

    it('should be set site identifier', function(){
      var wpcom = WPCOM();
      wpcom.site.id(test.public_site);
      wpcom.site._id
        .should.be.eql(test.public_site);
    });

  });

  describe('async', function(){

    describe('info', function(){
      it('should require site data', function(done){
        var wpcom = WPCOM();
        var site = wpcom.site;

        site.id(test.public_site);

        site.info(function(err, info){
          if (err) throw err;

          // check site info
          info.ID
            .should.be.an.instanceOf(Number);

          info.name
            .should.be.an.instanceOf(String);
          done();
        });
      });
    });

    describe('posts', function(){

      it('should request posts list', function(done){
        var wpcom = util.public_site();

        wpcom.site.posts(function(err, list){
          if (err) throw err;

          // list object data testing
          list
            .should.be.an.instanceOf(Object);

          // `posts list` object data testing
          list.found
            .should.be.an.instanceOf(Number);

          list.posts
            .should.be.an.instanceOf(Array);

          done();
        });
      });

      it('should request only one post', function(done){
        var wpcom = util.public_site();

        wpcom.site.posts({ number: 1 }, function(err, list){
          if (err) throw err;

          // list object data testing
          list
            .should.be.an.instanceOf(Object);

          // `posts list` object data testing
          list.found
            .should.be.an.instanceOf(Number);

          // get only one post
          list.posts
            .should.be.an.instanceOf(Array)
            .and.length(1);

          done();
        });
      });
    });
  });

});
