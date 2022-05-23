const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/testMongo")
  .then(() => console.log("Connected to mango"))
  .catch((err) => console.log("Not connected to database", err));

const Joi = require("joi");
const { boolean } = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const schemaJoi = Joi.object({
  _id: Joi.required(),
  description: Joi.string().min(10).max(1000).required(),
  faite: Joi.boolean.required,
  creation: Joi.date(),
});

const todoSchema = new mongoose.Schema({
  id: Number,
  description: { type: String, required: true, min: 20, maxlength: 10000 },
  faite: { type: Boolean, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  creation: { type: Date, default: Date.now() },
});

const Todo = mongoose.model("Todo", todoSchema);

async function createTodo(obj) {
  const todo = new Todo(obj);
  const { value, error } = schemaJoi.validate(todo._doc);
  console.log(value);
  if (error) {
    console.log(error.details[0].message);
  }
  return await todo.save();
}

const todo1 = createTodo({
  description:"todo todo todo walki talki",
  faite: false,
  creator: 1
});

Promise.all([p1]).then(async () => {
  const all_docs = await User.find();
  console.log("All Documents : ");
  console.log(all_docs);

  const filtered_docs = await Todo.find({ id: 1 });
  console.log("Docs filtered '1' : ");
  console.log(filtered_docs);

  const oneTodo = await Todo.findOne();
  console.log("One todo : ");
  console.log(oneTodo);
  console.log(oneTodo._id);

  oneTodo.faite = true;
  const result = await oneTodo.save();
  console.log("One todo modified !");
  console.log(result);

  mongoose.connection.close();
});
