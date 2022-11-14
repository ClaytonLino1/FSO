import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total =  (good + neutral + bad)
  const average = ((good - bad) / total)
  const positive = ((good * 100) / total)


  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistics 
      good={good} 
      neutral={neutral} 
      bad={bad} 
      total={total} 
      average={average} 
      positive={positive} />

    </div>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
    return (
      <table>
      <td> <StatisticsLine text={"good"} value={good} /> </td>
      <td> <StatisticsLine text={"neutral"} value={neutral} /> </td>
      <td> <StatisticsLine text={"bad"} value={bad} /> </td>
      <td> <StatisticsLine text={"all"} value={total} /> </td>
      <td> <StatisticsLine text={"average"} value={average} /> </td>
      <td> <StatisticsLine text={"positive"} value={positive} /> </td>
      </table>
    )

}



const StatisticsLine = ({text, value}) => (<div>{text} {value}</div>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



export default App