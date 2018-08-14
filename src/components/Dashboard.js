import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    authedUser: authedUser,
    questions: questions,
  }
}

export default connect(mapStateToProps)(Dashboard)
