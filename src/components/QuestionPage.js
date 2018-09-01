import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'

class QuestionPage extends Component {
  handleClick = (e) => {
    e.preventDefault()
    const { dispatch, question, user } = this.props

    dispatch(handleAnswerQuestion({
      authedUser: user.id,
      qid: question.id,
      answer: e.target.value,
    }))
  }

  render() {
    const { question, author, user, invalid } = this.props

    if (invalid) {
      return <Redirect to='/404' />
    }

    const { optionOne, optionTwo } = question
    const unansweredByUser = !Object.keys(user.answers).includes(question.id)
    const userAnswer = user.answers[question.id]

    return (
      <div className='question-section'>
        <img src={author.avatarURL} alt={author.name} />
        <p>{author.name} asks...</p>
        <h1>Would you Rather</h1>

        {unansweredByUser ? (
          <UnansweredQuestion optionOneText={optionOne.text} optionTwoText={optionTwo.text} handleClick={this.handleClick} />
        ) : (
          <AnsweredQuestion optionOne={optionOne} optionTwo={optionTwo} userAnswer={userAnswer} />
        )}
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const question = questions[props.match.params.id]

  if (question === undefined) {
    return { invalid: true }
  }

  return {
    author: users[question.author],
    question: question,
    user: users[authedUser],
    invalid: false,
  }
}

QuestionPage.propTypes = {
  author: PropTypes.object,
  question: PropTypes.object,
  user: PropTypes.object,
}

export default connect(mapStateToProps)(QuestionPage)
