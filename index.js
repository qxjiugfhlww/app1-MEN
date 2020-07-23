const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes');
// const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype->access');




const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
  // handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('views/img')); 

app.use(routes);

app.use(express.static('models')); 

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://xiaoji0w:FF11ff@cluster0.5lkqb.mongodb.net/posts', {
        useNewUrlParser: true,
        useFindAndModify: false
      })
    app.listen(PORT, () => {
      console.log('Server started...');
    })
  } catch (e) {
    console.log(e);
  }
}

start();


// const Posts = require('./models/Posts');

// const getPosts = async () => {
//   const posts = await Posts.find({});
//   console.log(posts[0]);
//   return posts;
// };

// let posts = getPosts();


// const Telegraf = require('telegraf');
// const bot = new Telegraf('503445753:AAFxXgba3wUI6517Xgh38VYI-9pheL-c-9Y');

// bot.telegram.sendMessage(966434509, () => {posts});

// bot.hears('Hi', ctx => {
//   return ctx.reply('hello');
// });


// setInterval(() => {
//   if (posts.length != 0) {
//       last_post = store.posts.length - 1;

//       // if (currentdate.getFullYear() == store.time.year[last_post] && currentdate.getMonth() == store.time.month[last_post] && currentdate.getDay() == store.time.day[last_post] && currentdate.getHours() == store.time.hour[last_post] && currentdate.getMinutes() == store.time.minute[last_post]) {
//       if ((new Date()).getMinutes() == store.time.minute[last_post]) {
//           console.log('SENDED');
//           bot.telegram.sendMessage(store.tg_id[last_post], `${store.posts[last_post]} s: ${(new Date()).getTime()}`);
//       }
//           //bot.startPolling();
//       }
// }, 1000);


// const btn = document.querySelector('#sendButton');
// const tg_id = document.querySelector('#tg-id');
// const schdl = document.querySelector('#input5');
// const txtarea = document.querySelector('#exampleFormControlTextarea3');

// let txtarea_val = '';
// let tg_id_val = '';
// let schdl_val = '';

// let currentdate = new Date();

// let last_post = 0;


// setInterval(() => {
// console.log(store.posts);
// if (store.posts.length != 0) {
//     console.log(`store in IF: ${store.posts} ${store.tg_id} ${store.time.year} ${store.time.month} ${store.time.day} ${store.time.hour} ${store.time.minute} ${store.time.day}`);
//     console.log((new Date()).getMinutes());
    
//     last_post = store.posts.length - 1;

//     // if (currentdate.getFullYear() == store.time.year[last_post] && currentdate.getMonth() == store.time.month[last_post] && currentdate.getDay() == store.time.day[last_post] && currentdate.getHours() == store.time.hour[last_post] && currentdate.getMinutes() == store.time.minute[last_post]) {
//     if ((new Date()).getMinutes() == store.time.minute[last_post]) {
//         console.log('SENDED');
//         bot.telegram.sendMessage(store.tg_id[last_post], `${store.posts[last_post]} s: ${(new Date()).getTime()}`);
//     }
//         //bot.startPolling();
//     }
// }, 1000);





// btn.addEventListener("click", function () {


//     let datetime = "Last Sync: " + currentdate.getDate() + "/"
//         + (currentdate.getMonth() + 1) + "/"
//         + currentdate.getFullYear() + " @ "
//         + currentdate.getHours() + ":"
//         + currentdate.getMinutes() + ":"
//         + currentdate.getSeconds();


//     console.log(datetime);
//     console.log("clicked");
//     txtarea_val = txtarea.value;
//     tg_id_val = tg_id.value;
//     schdl_val = schdl.value;



//     store.posts.push(txtarea_val);
//     store.time.year.push(schdl_val.slice(0, 4));
//     store.time.month.push(schdl_val.slice(5, 7));
//     store.time.day.push(schdl_val.slice(8, 10));
//     store.time.hour.push(schdl_val.slice(11, 13));
//     store.time.minute.push(schdl_val.slice(14, 16));
//     store.tg_id.push(tg_id_val);

//     console.log(`added to store: ${store.posts} ${store.tg_id} ${store.time.year} ${store.time.month} ${store.time.day} ${store.time.hour} ${store.time.minute} ${store.time.day}`);

//     bot.hears('Hi', ctx => {
//         return ctx.reply('hello');
//     });


// });




