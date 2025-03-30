import { createNotification, deleteNotification } from "../reducers/notificationReducer"
import { updateAnecdote, addAnecdote } from "../reducers/anecdoteReducer";

let timeoutId = null

const notificationMiddleware = (store) => (next) => (action) => {
    if (action.type === updateAnecdote.type) {
        const id = action.payload
        const state = store.getState();
        const anecdote = state.anecdotes.find(a => a.id === id)
        store.dispatch(createNotification(`Anecdote "${anecdote.content}" was upvoted!`))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            store.dispatch(deleteNotification())
        }, 5000)
    }
    else if (action.type === addAnecdote.type) {
        store.dispatch(createNotification(`Anecdote: "${action.payload.content}" was added!`))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            store.dispatch(deleteNotification())
        }, 5000)
    }

    return next(action);
}

export default notificationMiddleware