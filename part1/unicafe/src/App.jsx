import { useState } from 'react'

const Display = ({ txt }) => {
  return <h1>{txt}</h1>
}

const Button = ({ onClick, txt }) => {
  return <button onClick={onClick}>{txt}</button>
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total == 0) {
    return <p>No feedback given</p>
  }
  else {
    return (
      <table>
        <tbody>
          <StatisticsLine txt="good" val={good} />
          <StatisticsLine txt="neutral" val={neutral} />
          <StatisticsLine txt="bad" val={bad} />
          <StatisticsLine txt="all" val={total} />
          <StatisticsLine txt="average" val={(bad * -1 + good) / total} />
          <StatisticsLine txt="positive" val={`${good / total * 100} %`} />
        </tbody>
      </table>
    )
  }
}

const StatisticsLine = ({ txt, val }) => {
  return <tr><td>{txt}</td><td>{val}</td></tr>
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