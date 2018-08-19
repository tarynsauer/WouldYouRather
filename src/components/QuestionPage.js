import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/shared'
import { getVotePercentage } from '../utils/helpers'

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
    const isAnsweredByUser = !Object.keys(user.answers).includes(question.id)

    return (
      <div>
        <div>Would you Rather</div>
          {isAnsweredByUser ? (
            <div>
              <button value='optionOne' onClick={this.handleClick}>{optionOne.text}</button>
              <button value='optionTwo' onClick={this.handleClick}>{optionTwo.text}</button>
            </div>
          ) : (
            <div>
              <div>{optionOne.text} - {optionOne.votes.length} - {getVotePercentage(optionOne.votes, optionTwo.votes)}%</div>
              <div>{optionTwo.text} - {optionTwo.votes.length} - {getVotePercentage(optionTwo.votes, optionOne.votes)}%</div>
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
    user: users[authedUser],
    question: question,
    author: users[question.author],
  }
}

export default connect(mapStateToProps)(QuestionPage)
