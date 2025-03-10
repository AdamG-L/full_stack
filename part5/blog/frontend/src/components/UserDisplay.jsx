const logoutUser = (setUser) => {
    window.localStorage.clear()
    setUser(null)
}

const UserDisplay = ({username, setUser}) => (
    <div className="flex flex-row items-center gap-2">
    <h3>Current User: {username}</h3>
    <button className="button" onClick={() => logoutUser(setUser)}>Logout</button>
    </div>
)

export default UserDisplay