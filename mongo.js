const mongoose = require('mongoose')
// step 3.19
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true
  }
});

personSchema.plugin(uniqueValidator);

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const dbName = `phoneBook-app`

const url =
  `mongodb://fullstack:${password}@clusterfullstackopen-shard-00-00.wfqfc.mongodb.net:27017,clusterfullstackopen-shard-00-01.wfqfc.mongodb.net:27017,clusterfullstackopen-shard-00-02.wfqfc.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-upn6s0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', phoneSchema)

const person = new Person({
  name,
  number,
})

// 保存
person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
