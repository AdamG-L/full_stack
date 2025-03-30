import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter))
    }, shallowEqual)
    const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => dispatch(updateAnecdote(
                            {
                                ...anecdote,
                                votes: anecdote.votes + 1
                            }
                        ))}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList