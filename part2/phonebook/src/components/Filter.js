const Filter = ({handleFilter, filter}) => {
  
    return (
      <div>
        filter shown with <input
        value={filter}
        onChange={handleFilter}/> 
      </div>
    )
  }

  export default Filter