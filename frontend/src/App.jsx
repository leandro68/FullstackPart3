import { useState, useEffect } from 'react'
import PersonList from './components/PersonList'
import Person from './components/Person'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textSearched, setTextSearched] = useState('')
  const [personToShow, setPersonToShow] = useState([])
  const [message, setMessage] = useState(null)


  const addPerson = (event) => {
        event.preventDefault()
        const person = {
          name: newName,
          number: newNumber
        }
        if (persons.some(personInPersons => personInPersons.name === person.name)){
          const answer = confirm(`${person.name} already exists, press ok if you want to modify the number or write another name and/or number`)
          if (answer){
            const personToModify = persons.find(obj => obj.name.toLowerCase() === person.name.toLowerCase());
            console.log('personToModify', personToModify);
            person.id = personToModify.id
            console.log('person', person);
            personService
              .update(person.id, person)
              .then(returnedPerson => {
                console.log('returnedPerson', returnedPerson)
                let newPersons = persons.map(obj => (obj.id === returnedPerson.id) ? { ...obj, ...returnedPerson } : obj)
                console.log('newPersons', newPersons)
                setPersonToShow(newPersons)
                setPersons(newPersons)
                setTextSearched('')
                setMessage(`${returnedPerson.name} modified`)
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })
              .catch(error => {
                setMessage(
                  `Information of ${name} was already removed from server`
                )
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
                personService
                  .getAll()
                  .then(initialPersons => {
                    //console.log('promise fulfilled')
                    setPersons(initialPersons)
                    setPersonToShow(initialPersons)
                    setTextSearched('')
                  })
              })
          }
        }
        else {
          personService
            .create(person)
            .then(returnedPerson => {
            //console.log(response)
            setPersonToShow(persons.concat(returnedPerson))
            setPersons(persons.concat(returnedPerson))
            setTextSearched('')
            setMessage(`${returnedPerson.name} added`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          //const newPersons = persons.concat(person)
          //
          //
          //
        }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTextSearched = (event) => {
    const text = event.target.value
    setTextSearched(event.target.value)
    const toShow = (text === '') ?
      persons :
      persons.filter(person => person.name.toLowerCase().includes(text.toLowerCase()))
    setPersonToShow(toShow)
  }

  useEffect(() => {
    //console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        //console.log('promise fulfilled')
        setPersons(initialPersons)
        setPersonToShow(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'persons')
  
  const deletePersonId = (id, name) => {
    personService
      .delPerson(id)
      .then(personDeleted => {
        //console.log('person deleted',personDeleted)
        const newPersons = persons.filter(obj => obj.id !== personDeleted.id)
        setPersons(newPersons)
        setPersonToShow(newPersons)
      })
      .catch(error => {
        setMessage(
          `Information of ${name} was already removed from server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        personService
          .getAll()
          .then(initialPersons => {
            //console.log('promise fulfilled')
            setPersons(initialPersons)
            setPersonToShow(initialPersons)
            setTextSearched('')
          })
      })
      
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={textSearched} onChange={handleTextSearched}/>
      <h2>add a new</h2>
      <Person onSubmitPerson={addPerson} 
              onChangeName={handleNameChange} 
              valueName={newName} 
              onChangeNumber={handleNumberChange}
              valueNumber= {newNumber}/>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person, id) =>
          <PersonList key={id} person={person} deletePerson={() => deletePersonId(person.id, person.name)}/>
        )}
      </ul>
    </div>
  )
}

export default App






