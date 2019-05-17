const mongoose = require('mongoose');

const { Schema } = mongoose;

const GreenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('green', GreenSchema);
