const LoginForm = ({username, password, setUsername, setPassword, handleLogin }) => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
    <div>
      username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({target}) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

export default LoginForm