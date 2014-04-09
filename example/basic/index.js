
/**
 * Module dependencies.
 */

var express = require('express');
var WPCONN = require('../../');

/**
 * wpcon app data
 */

var wpapp = require('../../test/data');

/**
 * Create a WPCONN instance
 */

var wpconn = WPCONN(wpapp.token);

var pub = __dirname + '/public';
var app = express();

app.use(express.static(pub));
app.set('views', __dirname + '/');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  // set site id
  wpconn.site.id(wpapp.public_site);

  // get site info
  wpconn.site.info(function(err, site){
    if (err) return console.log(err);

    // get lastest posts
    wpconn.site.posts({ number: 10 }, function(err, posts) {
      if (err) return console.log(err);

      res.render('layout', { site: site, posts: posts });
    });
  });
});

app.listen(3000);
console.log('WPConn app started on port 3000');
