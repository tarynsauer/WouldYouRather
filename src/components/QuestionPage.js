import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class QuestionPage extends Component {
  render() {
    const { question, author } = this.props

    return (
      <div>
        <div>Would you Rather</div>
        <div>{question.optionOne.text}</div>
        <div>{question.optionTwo.text}</div>
        <img src={author.avatarURL} alt={`Avatar of ${author.name}`} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const question = questions[props.match.params.id]

  return {
    question: question,
    author: users[question.author],
  }
}

export default connect(mapStateToProps)(QuestionPage)
