import { useNotificationDispatch, useNotificationValue } from "../notificationHooks"
import { useEffect } from "react"
const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    if (!notification) return
    const timeout = setTimeout(() => {
      dispatch({type:'SET', value:null})
    }, 5000)

    return () => clearTimeout(timeout) // Cleanup previous timeout
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
