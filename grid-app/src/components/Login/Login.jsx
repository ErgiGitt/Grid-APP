import { Button, Input } from "antd"
import "./Login.css"

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLoginChange,
}) => {
  return (
    <div className="login-container">
      <div
        className="login-card"
        onKeyPress={(event) => {
          if (event.key === "Enter") handleLoginChange()
        }}
      >
        <p className="login-label">username</p>
        <Input
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        ></Input>
        <p className="login-label">password</p>
        <Input
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          type="password"
        ></Input>
        <Button type={"primary"} onClick={handleLoginChange}>
          Log In
        </Button>
      </div>
    </div>
  )
}

export default Login
