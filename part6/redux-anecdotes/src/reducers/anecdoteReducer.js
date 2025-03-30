import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    changeAnecdote(state, action) {
      return state.map(a =>
        a.id === action.payload.id
          ? action.payload : a
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const fetchAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.fetchAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createAnecdote(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const updateAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.updateAnecdote(anecdote)
    dispatch(changeAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
export const { changeAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions