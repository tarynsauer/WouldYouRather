import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'
import { getVotePercentage } from '../utils/helpers'
import PropTypes from 'prop-types'

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
    const { question, author, user } = this.props
    const { optionOne, optionTwo } = question
    const unansweredByUser = !Object.keys(user.answers).includes(question.id)
    const userAnswer = user.answers[question.id]

    return (
      <div>
        <h1>Would you Rather</h1>
          {unansweredByUser ? (
            <div>
              <button value='optionOne' onClick={this.handleClick}>{optionOne.text}</button>
              <button value='optionTwo' onClick={this.handleClick}>{optionTwo.text}</button>
            </div>
          ) : (
            <div className='answered-question'>
              <div className={userAnswer === 'optionOne' ? 'selectedOption' : ''}>{optionOne.text} - {optionOne.votes.length} - {getVotePercentage(optionOne.votes, optionTwo.votes)}%</div>
              <div className={userAnswer === 'optionTwo' ? 'selectedOption' : ''}>{optionTwo.text} - {optionTwo.votes.length} - {getVotePercentage(optionTwo.votes, optionOne.votes)}%</div>
            </div>
          )}

        <img src={author.avatarURL} alt={author.name} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const question = questions[props.match.params.id]

  return {
    author: users[question.author],
    question: question,
    user: users[authedUser],
  }
}

QuestionPage.propTypes = {
  author: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(QuestionPage)
