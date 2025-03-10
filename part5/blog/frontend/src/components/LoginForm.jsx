const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <form onSubmit={handleLogin}>
    <div>
      <label className="label">
        Username
      </label>
      <input
        className="input"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <label className="label">
        Password
      </label>
      <input
        className="input"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button className="button" type="submit">
      login
    </button>
  </form>
)

export default LoginForm