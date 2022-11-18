import Person from "./Person"

const Persons = ({filteredPersons, handleDelete}) => (
    filteredPersons.map(person => 
      <Person key={person.id}
       name={person.name} 
       number={person.number} 
       id={person.id}
       handleDelete={handleDelete}/>)
  )

export default Persons