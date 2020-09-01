const {Schema, model} = require('mongoose');

// module.exports = model('Post',new Schema( {
//   post: {
//     type: String,
//     required: true
//   },
//   date_start: {
//     type: Date,
//     required: true
//   },
//   date_end: {
//     type: Date,
//     required: true
//   },
//   time_rate: {
//     type: String,
//     required: true
//   },
//   num_rate: {
//     type: String,
//     required: true
//   },
//   id : {
//     type: Number,
//     required: true
//   },
//   send : {
//     type: Number,
//     required: false
//   }
// }));



const Post = new Schema({
  post: {
    type: String,
    required: true
  },
  date_start: {
    type: Date,
    required: true
  },
  date_end: {
    type: Date,
    required: true
  },
  time_rate: {
    type: String,
    required: true
  },
  num_rate: {
    type: String,
    required: true
  },
  id : {
    type: Array,
    required: true
  },
  send : {
    type: Number,
    required: false
  },
  counter: {
    type: Number,
    required: false
  },
  time_between: {
    type: Number,
  }
});

module.exports = model('Post', Post)


// const User = new Schema({
//   user_name: {
//     type: String,
//     required: true
//   },
//   user_id: {
//     type: Number,
//     required: true
//   }

// });


// module.exports = {
//   Post: Post,
//   User: User
// };
