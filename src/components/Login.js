import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    error: '',
    password: '',
    username: '',
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(() => ({
      [name]: value
    }))
  }

  isValidLogin = (username, password) => {
    const { usersList } = this.props
    const result = usersList.filter(user => (user.id === username) && (user.password === password))
    return result.length > 0
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { username, password } = this.state
    const { dispatch, setLoggedIn } = this.props

    if (this.isValidLogin(username, password)) {
      dispatch(setAuthedUser(username))
      setLoggedIn(true)

      this.setState(() => ({
        error: '',
        password: '',
        username: '',
      }))
    } else {
      this.setState(() => ({
        error: 'The username or password entered is incorrect. Try again.',
        password: '',
        username: '',
      }))
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <div className='login-container'>
        <h2>Log in</h2>
        <div className='errors'>{this.state.error}</div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-inputs'>
            <label className='required'></label>
            <input type='text' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' autoComplete='username' />
            <label className='required'></label>
            <input type='password' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' autoComplete='current-password' />
          </div>
          <input className='primary-button' type='submit' value='Login' disabled={!(username && password)} />
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    usersList: Object.keys(users).map((key) => {
      return { id: key, name: users[key].name, password: users[key].password }
    })
  }
}

Login.propTypes = {
  usersList: PropTypes.array.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Login)
