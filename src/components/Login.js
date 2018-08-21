import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    userId: null,
    loggedIn: false,
  }

  handleChange = (e) => {
    const userId = e.target.value

    this.setState(() => ({
      userId
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { userId } = this.state

    this.props.dispatch(setAuthedUser(userId))

    this.setState(() => ({
      userId: null,
      loggedIn: this.state.userId === null ? false : true,
    }))
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-container'>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <div className='select-menu'>
            <select onChange={this.handleChange}>
              <option defaultValue={null}> -- select username -- </option>
              {this.props.usersList.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
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
      return { id: key, name: users[key].name }
    })
  }
}

Login.propTypes = {
  usersList: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Login)
