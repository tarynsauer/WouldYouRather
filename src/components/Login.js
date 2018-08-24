import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    error: '',
    password: '',
    loggedIn: false,
    userId: null,
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

    if (this.isValidLogin(username, password)) {
      this.props.dispatch(setAuthedUser(username))

      this.setState(() => ({
        error: '',
        password: '',
        loggedIn: true,
        userId: username,
        username: '',
      }))
    } else {
      this.setState(() => ({
        error: 'The username or password entered is incorrect. Try again.',
        password: '',
        loggedIn: false,
        userId: null,
        username: '',
      }))
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-container'>
        <h1>Log in</h1>
        <div className='errors'>{this.state.error}</div>
        <form onSubmit={this.handleSubmit}>
          <div className='login-inputs'>
            <input type='text' onChange={this.handleChange} value={this.state.username} name='username' placeholder='Username' autoComplete='username' />
            <input type='password' onChange={this.handleChange} value={this.state.password} name='password' placeholder='Password' autoComplete='current-password' />
          </div>
          <input type='submit' value='Login' />
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
}

export default connect(mapStateToProps)(Login)
