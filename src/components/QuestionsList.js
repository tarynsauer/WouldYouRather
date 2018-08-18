import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { filterQuestions, includeQuestions } from '../utils/helpers'

class QuestionsList extends Component {
  render() {
    const { answeredQuestions, unansweredQuestions } = this.props

    return (
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

export default connect(mapStateToProps)(QuestionsList)
