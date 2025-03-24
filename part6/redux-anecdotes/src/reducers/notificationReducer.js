import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'TESTING',
    reducers: {
        createNotification(state, action){
            return action.payload
        },
        deleteNotification(state, action){
            return ''
        }
    }
})

export default notificationSlice.reducer
export const {createNotification, deleteNotification} = notificationSlice.actions