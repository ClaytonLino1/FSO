import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import personService from "./services/persons"


const App = () => {
  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((persons) => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`))
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id != id ? p : null))
        notify(`${name} number deleted`)
      })
  }

  const notify = (message, type="info") => {
    setMessage({message, type})
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  
  const filteredPersons = persons.filter
  (person => person.name.toLowerCase().includes(filter.toLowerCase()))

  

  const nameExists = () => (
    persons.every((person) => person.name !== newName)
  )
    

  const newPerson = (event) => {
    event.preventDefault()

    if(!nameExists()) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        return (personService
          .update(changedPerson.id, changedPerson))
          .then((returnedPerson) => {
            setPersons(persons.map(person => 
              person.id !== changedPerson.id 
              ? person
              : returnedPerson))
            setNewName("")
            setNewNumber("")
            notify(`${returnedPerson.name} number changed`)
          })
          .catch(error => {
            notify(`information of ${changedPerson.name} has already been removed from server`, "error")
            setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    
    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        notify(`Added ${returnedPerson.name}`)
      })

  }

  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>

      <Filter handleFilter={handleFilter} filter={filter} />

      <h3>add a new</h3>

      <PersonForm 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      newName={newName}
      newNumber={newNumber}
      newPerson={newPerson}
      />
      
      <h3>Numbers</h3>
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App