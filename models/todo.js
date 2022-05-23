var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  id: number,
  description: {type: String, required: true, min:3, maxlength:10000},
  faite: {type: Boolean, required: true}
});

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;