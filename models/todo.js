var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  id: number,
  description: String,
  faite: Boolean
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;