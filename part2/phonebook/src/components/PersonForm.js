const PersonForm = ({newPerson, newName, newNumber, handleNameChange, handleNumberChange}) => (
    <form onSubmit={newPerson}>
        <div>
          name: <input
           value={newName}
           onChange={handleNameChange}/>
        </div>
          number: <input
           value={newNumber}
           onChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

export default PersonForm