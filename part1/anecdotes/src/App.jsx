import { useState } from 'react'

const Button = ({txt, onClick}) => {
  return <button onClick={onClick}>{txt}</button>
}

const DisplayAnecdote = ({txt, anecdote, votes}) => <><h1>{txt}</h1><br/>{anecdote}<br/>Has {votes} votes</>

const TopAnecdote = ({txt, anecdotes, allVotes}) => {
  let maxIndex = 0
  let maxVotes = 0
  for (const i in allVotes)
    if (allVotes[i] >= maxVotes){
      maxIndex = i
      maxVotes = allVotes[i]
    }
  return <DisplayAnecdote txt={txt} anecdote={anecdotes[maxIndex]} votes={maxVotes}/>
}


const generateNum = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min

const getUpdatedArray = (selected, originalArray) => {
  const arrayCopy = originalArray.slice()
  arrayCopy[selected] +=1
  return arrayCopy
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const max = anecdotes.length - 1
  const [selected, setSelected] = useState(generateNum(max, 0))
  const [allVotes, updateVotes] = useState(new Array(max + 1).fill(0))

  const updateSelectedVote = () => {
    // prevVotes is guarenteed to be the latest version of state with this call style
    updateVotes(prevVotes =>{
      const updatedVotes = [...prevVotes]
      updatedVotes[selected] += 1
      return updatedVotes
    }
    )
  }

  return (
    <div>
      <DisplayAnecdote txt="Anecdote of the day!" anecdote={anecdotes[selected]} votes={allVotes[selected]}/>
      <br/>
      <Button txt="upvote" onClick={()=> updateSelectedVote()}/>
      <Button txt="next anecdote" onClick={()=> setSelected(generateNum(max, 0))}/>
      <TopAnecdote  txt="#1 Anecdote of All Time" anecdotes={anecdotes} allVotes={allVotes}/>
    </div>
  )
}

export default App