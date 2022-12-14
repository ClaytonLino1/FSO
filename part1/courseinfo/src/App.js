import { useState } from "react"

const App = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

   
  return (
    <div>
      <Display counter={counter} />
      <Button 
        onClick={increaseByOne}
        text="plus"
      />
      <Button 
        onClick={setToZero}
        text="zero"
      />
      <Button 
        onClick={decreaseByOne}
        text="minus"
      />
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => {
  console.log("props is:", props);
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
  


export default App