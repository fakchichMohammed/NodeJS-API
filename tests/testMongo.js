
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testMongo')
    .then(() => console.log('Connected to mango'))
    .catch((err) => console.log("Not connected to database", err));


const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaJoi = Joi.object({
    _id: Joi.required(),
    password: Joi.string().min(6).max(50).required(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    creation: Joi.date()
});


const userSchema = new mongoose.Schema({
    username: String,
    creation: {type: Date, default: Date.now()},
    email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);


async function createUser(obj){
    const user = new User(obj);
    const {value, error} = schemaJoi.validate(user._doc);
    console.log(value);
    if (error) {
        console.log(error.details[0].message);
    }
    return await user.save();
}

const p1 = createUser({
    username: "toto",
   email:"toto@gmail.com",
   password:"toto1234"
});



Promise.all([p1]).then(async () => {
    const all_docs = await User.find();
    console.log("All Documents : ");
    console.log(all_docs);

    const filtered_docs = await User.find({username:"toto"})
    console.log("Docs filtered 'toto' : ");
    console.log(filtered_docs)

    const oneUser = await User.findOne();
    console.log("One user : ");
    console.log(oneUser);
    console.log(oneUser._id);

    oneUser.username = "MODIFIED";
    const result = await oneUser.save()
    console.log("One user modified !")
    console.log(result);

    mongoose.connection.close();
});