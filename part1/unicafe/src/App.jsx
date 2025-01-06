import { useState } from 'react'

const Display = ({ txt }) => {
  return <h1>{txt}</h1>
}

const Button = ({ onClick, txt }) => {
  return <button onClick={onClick}>{txt}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  return <p>good {good}<br />neutral {neutral}<br />bad {bad}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Display txt="give feedback" />
      <Button onClick={() => setGood(good + 1)} txt="good" />
      <Button onClick={() => setNeutral(neutral + 1)} txt="neutral" />
      <Button onClick={() => setBad(bad + 1)} txt="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App