const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbName = `note-app`

const url =
  `mongodb://fullstack:${password}@clusterfullstackopen-shard-00-00.wfqfc.mongodb.net:27017,clusterfullstackopen-shard-00-01.wfqfc.mongodb.net:27017,clusterfullstackopen-shard-00-02.wfqfc.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-upn6s0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

// 保存
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// 查找
Note.find({important:true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})