var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  // id: Number,
  description: {type: String, required: true, min:3, max:10000},
  faite: {type: Boolean, required: true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;