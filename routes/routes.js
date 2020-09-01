const { Router } = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = Router();

const Telegraf = require('telegraf');
const { Mongoose } = require('mongoose');

let bot = new Telegraf('503445753:AAFxXgba3wUI6517Xgh38VYI-9pheL-c-9Y');
bot.hears('Hi', ctx => {
  return ctx.reply('hello');
});


let intervals = require('../index');
console.log('ROUTES')
console.log(intervals);
console.log(typeof(intervals));

async function reload(intervals, code) {
  console.log("reload");
  console.log(intervals);  let posts;
  if (code == 'add_one') {
    console.log('add_one', Post);
    posts = await Post.find().limit(1).sort({$natural:-1});
  } else {
    posts = await Post.find({});
  }
  console.log('posts');
  console.log(posts);
  
  posts = posts.map(posts => posts.toJSON());
  for (let i = 0; i < posts.length; i++) {
    let time_rate;
    if (posts[i].time_rate == "секунда") {
      time_rate = posts[i].num_rate * 1000;
    } else if (posts[i].time_rate == "минута") {
      time_rate = posts[i].num_rate * 1000 * 60;
    } else if (posts[i].time_rate == "час") {
      time_rate = posts[i].num_rate * 1000 * 60 * 60;
    } else if (posts[i].time_rate == "день") {
      time_rate = posts[i].num_rate * 1000 * 60 * 60 * 24;
    } else if (posts[i].time_rate == "неделя") {
      time_rate = posts[i].num_rate * 1000 * 60 * 60 * 24 * 7;
    } else if (posts[i].time_rate == "месяц") {
      time_rate = posts[i].num_rate * 1000 * 60 * 60 * 24 * 7 * 30;
    } else if (posts[i].time_rate == "год") {
      time_rate = posts[i].num_rate * 1000 * 60 * 60 * 24 * 7 * 30 * 256;
    }

    intervals.push(
      {
        si: setInterval(async () => {
          let currentdate = new Date();
          if (currentdate >= posts[i].date_start && currentdate <= posts[i].date_end) {
            for (let j = 0; j < posts[i].id.length; j++) {
              console.log('' + i + ' ' + j + ' ' + posts[i].id[j]);
              await bot.telegram.sendMessage(posts[i].id[j], posts[i].post)
            }
          }
        }, time_rate),
        post_id: posts[i]._id
      });
    console.log(intervals);
  }

  //console.log("in intervals");

  return intervals;
}


router.get('/post-list', async (req, res) => {
  const posts = await Post.find({});
  res.render('post-list', {
    title: 'Posts list',
    isIndex: true,
    isCreate: false,
    posts: posts.map(posts => posts.toJSON())
  });
  intervals = require('../index');
  console.log('get /post-list')
  console.log(intervals);
})

router.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('main', {
  });
  intervals = require('../index');
  console.log('get /')
  console.log(intervals);
  console.log(Object.keys(intervals));
})

router.get('/post-list/delete/:id', async function (req, res) {

  //const posts = await Post.find({});
  //const users = await Post.find({ _id: uid });
  Post.findOneAndRemove({ _id: req.params.id }, function (err) {
  });


  intervals = require('../index');
  console.log('get /post-list/delete/:id')
  console.log('1');
  console.log(intervals);
  //intervals.forEach(clearInterval).si;

  for (let i=0; i < intervals.length; i++) {
    if (intervals[i].post_id == req.params.id) {
      clearInterval(intervals[i].si);
      intervals.splice(i, 1);
    }
  }
  console.log('2');
  console.log(intervals);


  //let user = Post.remove({uid});

  res.redirect('/post-list');

});


router.get('/user-list/delete/:id', async function (req, res) {

  //const posts = await Post.find({});
  //const users = await Post.find({ _id: uid });
  User.findOneAndRemove({ _id: req.params.id }, function (err) {
  });

  res.redirect('/user-list');

});


router.get('/user-list', async (req, res) => {
  const users = await User.find({});
  res.render('user-list', {
    title: 'User list',
    isIndex: true,
    isCreate: false,
    users: users.map(users => users.toJSON())
  });
  console.log("in get'/'");
})

router.get('/add-post', async (req, res) => {
  const users = await User.find({});
  res.render('add-post', {
    title: 'Add post',
    isCreate: true,
    isIndex: false,
    users: users.map(users => users.toJSON())
  });
  console.log('get /add-post');
  intervals = require('../index');
  console.log(intervals);
  console.log(Object.keys(intervals));

});

router.get('/add-user', (req, res) => {

  res.render('add-user', {
    title: 'Add user',
    isCreate: true,
    isIndex: false,
  });

});


router.post('/add-post', async (req, res) => {
  console.log('post /add-post');
  let user_name_arr = req.body.names.split('; ');
  const users = await User.find({
    "user_name": user_name_arr
  });

  for (let i = 0; i < users.length; i++) {
    users[i] = users[i].user_id;
  }

  const post = new Post({
    post: req.body.post,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    time_rate: req.body.time_rate,
    num_rate: req.body.num_rate,
    id: users,
  })
  await post.save();

  intervals = require('../index');
  console.log(intervals)
  //intervals.forEach(clearInterval);
  intervals = await reload(intervals, 'add_one');
  console.log(intervals);


  res.redirect('/post-list');
})



router.post('/add-user', async (req, res) => {
  console.log("in user'/add'");
  const user = new User({
    user_name: req.body.user_name,
    user_id: req.body.user_id
  })

  await user.save();


  res.redirect('/user-list');

})




// router.post('/complete', async (req, res) => {
//   const todo = await Todo.findById(req.body.id);
//   todo.completed = !!req.body.completed;
//   await todo.save();
//   res.redirect('/');
// });

module.exports = { router, reload };