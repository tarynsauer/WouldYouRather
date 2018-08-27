import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class Nav extends Component {
  render() {
    const { isLoggedOut, userName } = this.props

    if (isLoggedOut) {
      return <Redirect to='/login' />
    }
    return (
      <ul className='menu'>
        <li className='username'><Link to='/'>Hello, <em>{userName}</em></Link></li>
        <li><Link to='/login'>Logout</Link></li>
        <li><Link to='/questions'>Questions</Link></li>
        <li><Link to='/add'>Add Question</Link></li>
        <li><Link to='/leaderboard'>Leaderboard</Link></li>
      </ul>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    isLoggedOut: authedUser === null,
    userName: authedUser === null ? 'N/A' : users[authedUser].name,
  }
}

Nav.propTypes = {
  isLoggedOut: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(Nav)
