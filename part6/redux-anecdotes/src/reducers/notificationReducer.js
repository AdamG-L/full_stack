import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        createNotification(state, action){
            return action.payload
        },
        deleteNotification(state, action){
            return null
        }
    }
})

export default notificationSlice.reducer
export const {createNotification, deleteNotification} = notificationSlice.actions