import { useState, useEffect } from "react";
import axios from "axios";
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
  const [message, setMessage] = useState({message: null, status: null})

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
      })
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
            setMessage({
              message: `${returnedPerson.name} number changed`,
              status: "ok"
            })
            setTimeout(() => {
              setMessage({...message, message: null})
            }, 5000)
          })
          .catch(error => {
            setMessage({
              message: `information of ${changedPerson.name} has already been removed from server`,
              status: "error"
            })
            setTimeout(() => {
              setMessage({...message, message: null})
            }, 5000)

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
        setMessage({
          message: `Added ${returnedPerson.name}`,
          status: "ok"
        })
        setTimeout(() => {
          setMessage({...message, message: null})
        }, 5000)
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