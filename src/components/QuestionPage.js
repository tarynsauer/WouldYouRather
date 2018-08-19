import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'

class QuestionPage extends Component {

  handleClick = (e) => {
    e.preventDefault()
    const { authedUser, dispatch, history, question } = this.props

    dispatch(handleAnswerQuestion({
      authedUser: authedUser,
      qid: question.id,
      answer: e.target.value,
    }, history.goBack))
  }

  render() {
    const { question, author } = this.props
    return (
      <div>
        <div>Would you Rather</div>
        <button value='optionOne' onClick={this.handleClick}>{question.optionOne.text}</button>
        <button value='optionTwo' onClick={this.handleClick}>{question.optionTwo.text}</button>
        <img src={author.avatarURL} alt={author.name} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const question = questions[props.match.params.id]

  return {
    authedUser: authedUser,
    question: question,
    author: users[question.author],
  }
}

export default connect(mapStateToProps)(QuestionPage)
