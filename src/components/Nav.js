import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
  handleClick = (e) => {
    e.preventDefault()

    this.props.dispatch(setAuthedUser(null))
  }

  render() {
    if (this.props.authedUser === null) {
      return <Redirect to='/login' />
    }
    return (
      <ul className='menu align-right'>
        <li>Hello, {this.props.userName}</li>
        <li><a href="#" onClick={this.handleClick}>Logout</a></li>
      </ul>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    userName: authedUser === null ? 'N/A' : users[authedUser].name,
  }
}
export default connect(mapStateToProps)(Nav)
