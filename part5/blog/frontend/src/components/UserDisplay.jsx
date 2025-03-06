const logoutUser = (setUser) => {
    window.localStorage.clear()
    setUser(null)
}

const UserDisplay = ({username, setUser}) => (
    <>
    <h3>Current User: {username}</h3>
    <button onClick={() => logoutUser(setUser)}>Logout</button>
    </>
)

export default UserDisplay