import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/notes'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        toggleImportance(state, action) {
            const note = state.find(n => n.id === action.payload)
            note.important = !note.important
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
          }
    }
})

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = (content) => {
    return async (dispatch) => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer
