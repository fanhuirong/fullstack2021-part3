let persons = [{
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

// node version
// const http = require('http')
// const app = http.createServer((request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'application/json'
//   })
//   response.end(JSON.stringify(persons))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)

// express version

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

// step 3.1
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// step 3.2
app.get('/info', (req, res) => {
  res.send(`<p>Photobook has info for ${persons.length} people</p> <br> ${new Date()}`)
})

// step 3.3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(item => item.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// step 3.4 test with postman
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(item => item.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})