const {Router} = require('express');
const Posts = require('../models/Posts');
const router = Router();


const Telegraf = require('telegraf');

let bot = new Telegraf('503445753:AAFxXgba3wUI6517Xgh38VYI-9pheL-c-9Y');
bot.hears('Hi', ctx => {
  return ctx.reply('hello');
});

// let intervals = [];
async function reload(intervals) {
  console.log("reload");
  let posts = await Posts.find({});
  posts = posts.map(posts => posts.toJSON());

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

    intervals.push(setInterval(() => {let currentdate = new Date();if (currentdate >= posts[i].date_start.date_start && currentdate <= posts[i].date_end.date_end) { bot.telegram.sendMessage(posts[i].id, posts[i].post)}}, time_rate))
  }
  console.log("in intervals");
  console.log(intervals);
  return intervals;
}


router.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    title: 'Posts list',
    isIndex: true,
    isCreate: false,
    posts: posts.map(posts => posts.toJSON())
  });

  console.log("in get'/'");

})

router.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add post',
    isCreate: true,
    isIndex: false,
  });
    console.log("in get'/add'");



});


let setInt_array = [];
let intervals = [];
router.post('/add', async (req, res) => {
  console.log("in post'/add'");
  const post = new Posts({
    post: req.body.post,
    date_start: {
      date_start: req.body.date_start,
      year: req.body.date_start_y,
      month: req.body.date_start_m,
      day: req.body.date_start_d,
      hour: req.body.date_start_h,
      minute: req.body.date_start_mt
    },
    date_end: {
      date_end: req.body.date_end,
      year: req.body.date_end_y,
      month: req.body.date_end_m,
      day: req.body.date_end_d,
      hour: req.body.date_end_h,
      minute: req.body.date_end_mt
    }, 
    time_rate: req.body.time_rate,
    num_rate: req.body.num_rate,
    id: req.body.id
  })


  await post.save();
  let {intervals} = require('../index');
  
  console.log(intervals)
  intervals.forEach(clearInterval);
  reload(intervals);
  console.log(intervals);

  res.redirect('/');

})

// router.post('/complete', async (req, res) => {
//   const todo = await Todo.findById(req.body.id);
//   todo.completed = !!req.body.completed;
//   await todo.save();
//   res.redirect('/');
// });

module.exports = {router, reload};