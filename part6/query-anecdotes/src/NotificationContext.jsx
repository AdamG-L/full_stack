import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext