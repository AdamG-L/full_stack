const logoutUser = (setUser) => {
    window.localStorage.clear()
    setUser(null)
}

const UserDisplay = ({username, setUser}) => (
    <div>
    <p>Current User: <strong>{username}</strong></p>
    <button className="button" onClick={() => logoutUser(setUser)}>Logout</button>
    </div>
)

export default UserDisplay