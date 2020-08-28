const {Router} = require('express');
const Post = require('../models/Post');
const User = require('../models/User');

const router = Router();

const Telegraf = require('telegraf');
const { Mongoose } = require('mongoose');

let bot = new Telegraf('503445753:AAFxXgba3wUI6517Xgh38VYI-9pheL-c-9Y');
bot.hears('Hi', ctx => {
  return ctx.reply('hello');
});

// let intervals = [];
async function reload(intervals) {
  console.log("reload");
  let posts = await Post.find({});
  //console.log(posts);
  posts = posts.map(posts => posts.toJSON());
  console.log(posts[0].post);
  for (let i=0; i < posts.length; i++) {

    let time_rate;
    if (posts[i].time_rate == "second") {
      time_rate = posts[i].num_rate * 1000;
    } else if (posts[i].time_rate == "minute") {
      time_rate = posts[i].num_rate * 1000*60;
    } else if (posts[i].time_rate == "hour") {
      time_rate = posts[i].num_rate * 1000*60*60;
    } else if (posts[i].time_rate == "day") {
      time_rate = posts[i].num_rate * 1000*60*60*24;
    } else if (posts[i].time_rate == "week") {
      time_rate = posts[i].num_rate * 1000*60*60*24*7;
    } else if (posts[i].time_rate == "month") {
      time_rate = posts[i].num_rate * 1000*60*60*24*7*30;
    } else if (posts[i].time_rate == "year") {
      time_rate = posts[i].num_rate * 1000*60*60*24*7*30*256;
    }

    intervals.push(setInterval(() => {
      let currentdate = new Date();
      if (currentdate >= posts[i].date_start && currentdate <= posts[i].date_end) {
        for (let j=0; j<posts[i].id.length; j++) {
          console.log('' + i + ' ' + j + ' ' + posts[i].id[j]);
          bot.telegram.sendMessage(posts[i].id[j], posts[i].post)
        }
      }
    }, time_rate))
  }
  console.log("in intervals");
  //console.log(intervals);
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
  console.log("in get'/'");
})


router.get('/post-list/delete/:id', async function(req, res) { 
  let db = req.db;
  console.log(db);
  let uid = req.params.id.toString();
  console.log(uid);

  res.send(req.params.id);
  const users = await Post.find({_id: uid});
  //let user = Post.remove({uid});



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
    console.log("in get'/add'");
});

router.get('/add-user', (req, res) => {
  res.render('add-user', {
    title: 'Add user',
    isCreate: true,
    isIndex: false,
  });
    console.log("in get'/add-user'");
});


let setInt_array = [];
let intervals = [];
router.post('/add-post', async (req, res) => {
  console.log("in post'/add'");
  let user_name_arr = req.body.names.split('; ');
  console.log("user_name_arr: " +  user_name_arr);
  const users = await User.find({
    "user_name": user_name_arr
  });
  
  console.log("users: " + users);

  for (let i=0; i< users.length; i++) {
    users[i] = users[i].user_id;
  }
  console.log("users2: " + users);


  const post = new Post({
    post: req.body.post,
    date_start: req.body.date_start,
    date_end: req.body.date_end,
    time_rate: req.body.time_rate,
    num_rate: req.body.num_rate,
    id: users

  })


  await post.save();
  let {intervals} = require('../index');
  
  //console.log(intervals)
  intervals.forEach(clearInterval);
  reload(intervals);
  //console.log(intervals);

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

module.exports = {router, reload};