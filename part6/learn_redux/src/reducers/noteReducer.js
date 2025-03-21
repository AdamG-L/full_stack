const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return [...state, action.payload]
        case 'TOGGLE_IMPORTANCE':
            const id = action.payload.id
            const noteToChange = state.find(n => n.id == id)
            const newNote = {
                ...noteToChange,
                important: !noteToChange.important
            }
            return state.map(n => n.id === id ? newNote : n)
        default:
            return state
    }
}

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        payload: {
            content,
            important: false,
            id: generateId()
        }
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        payload: { id }
    }
}

export default noteReducer