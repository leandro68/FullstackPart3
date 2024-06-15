const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('You must enter a password');
}

if(process.argv.length > 5 || process.argv.length === 4){
  console.log('Incorrect number of params');
}

//Mongodb connection
const password = process.argv[2]
const url =
  `mongodb+srv://leandro:${password}@fullstackcourse.v7gjr4s.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

//mongodb collection schema
const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

//only password as args then show persons
if(process.argv.length === 3){
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => { console.log(person)})
    mongoose.connection.close()
  })
}

//name and number as arg then save peerson
if(process.argv.length === 5){
  const person = new Person({
    id: Math.floor(Math.random()*10e16),
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log('added ', process.argv[3], process.argv[4], ' to Phonebook')
    mongoose.connection.close()
  })
}