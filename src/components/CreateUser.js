import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { handleUserCreate } from '../actions/shared'
import { connect } from 'react-redux'

class CreateUser extends Component {
  state = {
    errors: [],
    password: '',
    username: '',
    name: '',
    avatarURL: '',
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(() => ({
      [name]: value
    }))
  }

  validateInputs = () => {
    let errors = []
    const { username, password, name } = this.state
    const { usersList } = this.props
    const result = usersList.filter(user => (user.id === this.state.username))
    if (result.length > 0) {
      errors.push(`Username ${username} already exists`)
    }

    const inputs = Object.entries({ username, password, name })
    const invalidInputs = inputs.filter(input => (input[1].length === 0))
    const invalidInputNames = invalidInputs.map(input => input[0])

    if (invalidInputNames.length > 0) {
      errors.push(`Missing required inputs: ${invalidInputNames.join(', ')}`)
    }

    if (username.length > 0 && username.length < 3) {
      errors.push('Username must be at least three characters long')
    }

    if (password.length > 0 && password.length < 9) {
      errors.push('Password must be at least nine characters long')
    }

    return errors
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { dispatch, setLoggedIn } = this.props
    const { username, password, name, avatarURL } = this.state
    const errors = this.validateInputs()

    if (errors.length === 0) {
      dispatch(handleUserCreate({
        username: username,
        name: name,
        password: password,
        avatarURL: avatarURL,
      }, () => setLoggedIn(true)))

      this.setState(() => ({
        errors: [],
        password: '',
        username: '',
        name: '',
        avatarURL: '',
      }))
    } else {
      this.setState({ errors: errors })
    }
  }

  render() {
    return (
      <div className='login-container'>
        <h2>Create user</h2>
        <div className='errors'>{this.state.errors.join(', ')}</div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-inputs'>
            <input type='text' onChange={this.handleChange} value={this.state.name} name='name' placeholder='Name' autoComplete='name' />
            <input type='text' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' autoComplete='username' />
            <input type='text' onChange={this.handleChange} value={this.state.avatarURL} name='avatarURL' placeholder='Avatar URL' autoComplete='avatar-url' />
            <input type='password' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' autoComplete='current-password' />
          </div>
          <input type='submit' value='Create User' />
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    usersList: Object.keys(users).map((key) => {
      return { id: key, name: users[key].name }
    })
  }
}

CreateUser.propTypes = {
  usersList: PropTypes.array.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(CreateUser)
