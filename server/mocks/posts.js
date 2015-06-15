if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

var posts = [
  {
    id: 1,
    tweet: 'That\'s no moon...',
    user: 1
  },
  {
    id: 2,
    tweet: 'It\'s a trap!',
    user: 2
  },
  {
    id: 3,
    tweet: 'I find your lack of faith disturbing.',
    user: 3
  }
];

var users = [
  {
    id: 1,
    name: 'b3n K3n0b1',
    posts: [1]
  },
  {
    id: 2,
    name: 'ADMIRAL AKBAR',
    posts: [2]
  },
  {
    id: 3,
    name: 'DontCallMeAnakin',
    posts: [3]
  }
];

module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'users': users
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
      res.send({
        'post': posts.find(function(post) {
          return post.id == req.params.id
        })
      });
    });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
