import React, { Component } from 'react'
import { connect } from 'react-redux'

class Leaderboard extends Component {
  render() {
    return (
      <ul>
        Leaderboard
      </ul>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
  }
}

export default connect(mapStateToProps)(Leaderboard)
