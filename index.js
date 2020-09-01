const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const {router, reload} = require('./routes/routes');
// let {setIntObj} = require('./setIntObj');
//let {updated_posts} = require('./routes/routes');

// const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
// const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype->access');


let intervals = []

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

app.use(router);


// app.post('/add', async (req, res, next) => {
//   posts = await Posts.find({});
//   console.log('Time:', Date.now());
// })

app.use(express.static('models')); 


async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://xiaoji0w:FF11ff@cluster0.5lkqb.mongodb.net/tgbot?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
      })
    app.listen(PORT, async () => {
      console.log('Server started...');
      intervals = await reload(intervals, 'none');
      module.exports = intervals;
    })



    // setInterval(() => {
    //   let currentdate = new Date();
    //   if (currentdate >= posts[4].date_start.date_start && currentdate <= posts[4].date_end.date_end) {
    //     bot.telegram.sendMessage(posts[4].id, "6");
    //   } 
    // }, 5000);

    // setInterval(() => {
    //   if (posts.length != 0) {
    //       for (let i=0; i < posts.length;i++) {
    //         let currentdate = new Date();
    //         console.log(currentdate.getHours()+ "<=" +posts[i].date_end.hour);

    //         if (currentdate.getFullYear() <= posts[i].date_end.year && currentdate.getMonth() <= posts[i].date_end.month && 
    //         currentdate.getDay() <= posts[i].date_end.day && 
    //         currentdate.getHours() <= posts[i].date_end.hour) {
    //           console.log(currentdate.getFullYear()+ "<=" +posts[i].date_end.year);
    //         }
          
    //         if (currentdate.getFullYear() < posts[i].date_end.year) {
    //           bot.telegram.sendMessage(posts[i].id, '5');
    //         } else if (currentdate.getFullYear() < posts[i].date_end.year) 
    //         currentdate.getMonth() <= posts[i].date_end.month && 
    //         currentdate.getDay() <= posts[i].date_end.day && 
    //         currentdate.getHours() <= posts[i].date_end.hour && 
    //         currentdate.getMinutes() <= posts[i].date_end.minute &&
    //         currentdate.getFullYear() >= posts[i].date_start.year && 
    //         currentdate.getMonth() >= posts[i].date_start.month && 
    //         currentdate.getDay() >= posts[i].date_start.day && 
    //         currentdate.getHours() >= posts[i].date_start.hour && 
    //         currentdate.getMinutes() >= posts[i].date_start.minute) {
    //           bot.telegram.sendMessage(posts[i].id, '5');
    //         }
    //       }   
    //     } 
    // }, 5000);


    // while(true) {

    //   console.log(` ${i}: ${setIntervals[i].time_rate}`);
    //   setTimeout(() => {     
    //     if ("13" >= 2) {
    //       bot.telegram.sendMessage(posts[i].id, posts[i].post);
    //       //bot.startPolling();
    //     }
    //   }, 1000);
    //   if (i==0) {
    //     i = 1;
    //   } else {
    //     i = 0;
    //   }
    // }




    // setTimer1 = setInterval(() => {
    //   console.log("setint");
    //   if (posts.length != 0) {
    //       console.log(" != 0");
    //       for (let i=0; i < posts.length;i++) {
    //         console.log('  ' + i);
    //         let currentdate = new Date();
    //         console.log(currentdate.getFullYear());
    //         // if (currentdate.getFullYear() <= posts[i].date_end.year && 
    //         // currentdate.getMonth() <= posts[i].date_end.month && 
    //         // currentdate.getDay() <= posts[i].date_end.day && 
    //         // currentdate.getHours() <= posts[i].date_end.hour && 
    //         // currentdate.getMinutes() <= posts[i].date_end.minute &&
    //         // currentdate.getFullYear() >= posts[i].date_start.year && 
    //         // currentdate.getMonth() >= posts[i].date_start.month && 
    //         // currentdate.getDay() >= posts[i].date_start.day && 
    //         // currentdate.getHours() >= posts[i].date_start.hour && 
    //         // currentdate.getMinutes() >= posts[i].date_start.minute) {
    //         if ("13" >= 2) {
    //           console.log("within");
    //           bot.telegram.sendMessage(posts[i].id, '5');
    //           //bot.startPolling();
    //           console.log('sent');
    //           console.log(new Date().getTime());
    //         }
    //       }   
    //     } 
    // }, 5000);
    // setTimer1();
  } catch (e) {
    console.log(e);
  }

}

start();




// let Posts = require('./models/Posts');

// const getPosts = () => {
//   let posts = Posts.find({});
//   //posts = posts.map(posts => posts.toJSON());
//   console.log("in: " + posts);
//   return posts;
// };

// posts = getPosts();
// console.log("1: " + posts[0]);
// console.log(posts[0]);

// Promise.resolve(getPosts()).then(function(value) {
//   Posts = require('./models/Posts');
//   posts = getPosts();
//   console.log("1: " + posts);
//   console.log(posts);
// })










// const Telegraf = require('telegraf');
// const bot = new Telegraf('503445753:AAFxXgba3wUI6517Xgh38VYI-9pheL-c-9Y');

// bot.telegram.sendMessage(966434509, () => {posts});

// bot.hears('Hi', ctx => {
//   return ctx.reply('hello');
// });


// console.log(`2: ${new Date().getFullYear()} ${posts}`);

// setInterval(() => {
//   if (posts.length != 0) {
//       for (let i=0; i < posts.length-1;i++) {
//         let currentdate = new Date();
//         console.log(currentdate.getTime());
//         if (currentdate.getFullYear() <= posts[i].date_end.year && 
//         currentdate.getMonth() <= posts[i].date_end.month && 
//         currentdate.getDay() <= posts[i].date_end.day && 
//         currentdate.getHours() <= posts[i].date_end.hour && 
//         currentdate.getMinutes() <= posts[i].date_end.minute &&
//         currentdate.getFullYear() >= posts[i].date_start.year && 
//         currentdate.getMonth() >= posts[i].date_start.month && 
//         currentdate.getDay() >= posts[i].date_start.day && 
//         currentdate.getHours() >= posts[i].date_start.hour && 
//         currentdate.getMinutes() >= posts[i].date_start.minute) {
          
//           bot.telegram.sendMessage(posts[i].id, `${posts[i].post} s: ${(new Date()).getTime()}`);
//           //bot.startPolling();
//           console.log('sent');
//           console.log(new Date().getTime());
//         }
//       }   
//     } 
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




