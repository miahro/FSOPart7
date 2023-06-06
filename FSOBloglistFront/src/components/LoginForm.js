import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={handleUsernameChange}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={handlePasswordChange}
          />
          <Button variant="primary" type="submit" id="login">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

// const LoginForm = ({
//   handleSubmit,
//   handleUsernameChange,
//   handlePasswordChange,
//   username,
//   password
// }) => {
//   return (

//     <div>
//       <h2>Log in to application</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//       username &nbsp;
//           <input
//             type="text"
//             value={username}
//             name="Username"
//             id="username"
//             onChange = {handleUsernameChange}
//           />
//         </div>
//         <div>
//       password &nbsp;
//           <input
//             type="password"
//             value={password}
//             name="Password"
//             id="password"
//             onChange= {handlePasswordChange}
//           />
//         </div>
//         <button type="submit" id="login">login</button>
//       </form>
//     </div>
//   )
// }

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
