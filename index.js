
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

// fix cors
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  next(error)
}


// step 3.13
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// step 3.14 add
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  const person = new Person({
    ...body,
  })

  // 这里是小写的实例对象
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

// step 3.15 delete
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch((error) => next(error));
})

// step 3.17 update
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  // const person = new Person({
  //   ...body // 会带上_id 导致修改错误 
  // })
  
  const person = {
    name: body.name,
    number: body.number,
  };
  console.log(person)

  Person.findByIdAndUpdate(request.params.id, person, {
      new: true
    })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
})

// step 3.16 error 
const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: "unknown endpoint"
  });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);
// error handler
app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
