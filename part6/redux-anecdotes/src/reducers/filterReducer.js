const reducer = (state ='', action) => {
    if(action.type === 'FILTER'){
        return action.payload
    } else {
        return state
    }
}

export const setFilter = (content) => {
    return {
        type: 'FILTER',
        payload: content
    }
}

export default reducer