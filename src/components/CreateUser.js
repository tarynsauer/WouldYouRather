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
    const { username, password } = this.state
    const { usersList } = this.props
    const result = usersList.filter(user => (user.id === this.state.username))
    if (result.length > 0) {
      errors.push(`Username ${username} already exists`)
    }

    if (username.length < 3) {
      errors.push('Username must be at least three characters long')
    }

    if (password.length < 9) {
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
    const { username, password, name } = this.state

    return (
      <div className='login-container'>
        <h2>Create user</h2>
        <div className='errors'>{this.state.errors.join(', ')}</div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-inputs'>
            <label className='required'></label>
            <input type='text' onChange={this.handleChange} value={this.state.name} name='name' placeholder='Name' autoComplete='name' />
            <label className='required'></label>
            <input type='text' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' autoComplete='username' />
            <input type='text' onChange={this.handleChange} value={this.state.avatarURL} name='avatarURL' placeholder='Avatar URL' autoComplete='avatar-url' />
            <label className='required'></label>
            <input type='password' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' autoComplete='current-password' />
          </div>
          <input className='primary-button' type='submit' value='Create User' disabled={!(name && username && password)} />
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
