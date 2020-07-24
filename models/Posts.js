const {Schema, model} = require('mongoose');

const schema = new Schema({
  post: {
    type: String,
    required: true
  },
  date_start: {
    date_start: {
      type: Date,
      required: true
    },
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
    date_end: {
      type: Date,
      required: true
    },
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
    type: Number,
    required: true
  },
  send : {
    type: Number,
    required: false
  },
});


module.exports = model('Posts', schema);