import React, { Component } from 'react'
import { connect } from 'react-redux'

class AddQuestion extends Component {
  render() {
    return (
      <div>
        Add Question Form
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
  }
}

export default connect(mapStateToProps)(AddQuestion)
