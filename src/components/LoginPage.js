import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Login from './Login'
import CreateUser from './CreateUser'

class LoginPage extends Component {
  state = {
    loggedIn: false,
  }

  setLoggedIn = (isLoggedIn) => {
    this.setState(() => ({
      loggedIn: isLoggedIn,
    }))
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h1>Would you Rather</h1>
        <Login users={this.props.users} setLoggedIn={this.setLoggedIn} />
        <CreateUser users={this.props.users} setLoggedIn={this.setLoggedIn} />
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    users: users,
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(LoginPage)
