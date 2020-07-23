const {Schema, model} = require('mongoose');

const schema = new Schema({
  post: {
    type: String,
    required: true
  },
  date_start: {
    year: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    hour: {
      type: String,
      required: true
    },
    minute: {
      type: String,
      required: true
    }
  },
  date_end: {
    year: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    hour: {
      type: String,
      required: true
    },
    minute: {
      type: String,
      required: true
    }
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
    type: String,
    required: true
  },
  send : {
    type: Int,
    required: true
  },
});


module.exports = model('Posts', schema);