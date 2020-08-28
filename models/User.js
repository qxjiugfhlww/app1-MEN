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







const User = new Schema({
  user_name: {
    type: String,
    required: true
  },
  user_id: {
    type: Number,
    required: true
  }

});

module.exports = model('User', User)

// module.exports = {
//   Post: Post,
//   User: User
// };
