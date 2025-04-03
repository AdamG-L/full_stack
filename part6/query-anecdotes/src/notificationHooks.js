import {useContext} from 'react'
import NotificationContext from './NotificationContext'

export const useNotificationValue = () => {
    const [val] = useContext(NotificationContext)
    return val
}

export const useNotificationDispatch = () => {
    const [,dispatch] = useContext(NotificationContext)
    return dispatch
}