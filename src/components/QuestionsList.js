import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { filterQuestions, includeQuestions } from '../utils/helpers'
import PropTypes from 'prop-types'

class QuestionsList extends Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props

    return (
      <div>
        <h1>Questions</h1>
        <div className='float-left'>
          Unanswered:
          <ul>
            {unansweredQuestions.map((question) => {
              return <Question key={ question.id } question={ question } />
            })}
          </ul>
          Answered:
          <ul>
            {answeredQuestions.map((question) => {
              return <Question key={ question.id } question={ question } />
            })}
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {
  const user = users[authedUser]
  const answeredIds = Object.keys(user.answers)
  const answeredQuestions = includeQuestions(questions, answeredIds)
  const nonRelevantIds = user.questions.concat(answeredIds)
  const unansweredQuestions = filterQuestions(questions, nonRelevantIds)

  return {
    authedUser: authedUser,
    answeredQuestions: answeredQuestions,
    unansweredQuestions: unansweredQuestions,
  }
}

QuestionsList.propTypes = {
  authedUser: PropTypes.string.isRequired,
  answeredQuestions: PropTypes.array.isRequired,
  unansweredQuestions: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(QuestionsList)
