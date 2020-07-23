const {Router} = require('express');
const Posts = require('../models/Posts');
const router = Router();

router.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    title: 'Posts list',
    isIndex: true,
    isCreate: false,
    posts: posts.map(posts => posts.toJSON())
  });
})

router.get('/add', (req, res) => {
  res.render('add', {
    title: 'Add post',
    isCreate: true,
    isIndex: false,
  });
});

router.post('/add', async (req, res) => {
  const post = new Posts({
    post: req.body.post,
    date_start: {
      year: req.body.date_start_y,
      month: req.body.date_start_m,
      day: req.body.date_start_d,
      hour: req.body.date_start_h,
      monute: req.body.date_start_mt
    },
    date_end: {
      year: req.body.date_end_y,
      month: req.body.date_end_m,
      day: req.body.date_end_d,
      hour: req.body.date_end_h,
      monute: req.body.date_end_mt
    },
    id: req.body.id,
    time_rate: req.body.time_rate,
    num_rate: req.body.num_rate,
  })

  await post.save();
  res.redirect('/');

})

// router.post('/complete', async (req, res) => {
//   const todo = await Todo.findById(req.body.id);
//   todo.completed = !!req.body.completed;
//   await todo.save();
//   res.redirect('/');
// });

module.exports = router;