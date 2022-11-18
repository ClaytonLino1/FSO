const Person = ({name, number, handleDelete, id}) => (
    <div>
      {name} {`${number} `}
      <button onClick={() => handleDelete(id, name)}>delete</button>
    </div>
  )

export default Person