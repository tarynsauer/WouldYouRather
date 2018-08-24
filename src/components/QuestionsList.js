import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionText from './QuestionText'
import { filterQuestions, includeQuestions } from '../utils/helpers'
import PropTypes from 'prop-types'

class QuestionsList extends Component {
  state = {
    showUnanswered: true,
  }

  handleClick = (e) => {
    const newValue = !this.state.showUnanswered
    this.setState(() => ({
      showUnanswered: newValue,
    }))
  }

  render() {
    const { answeredQuestions, unansweredQuestions } = this.props
    const { showUnanswered } = this.state

    return (
      <div className='question-list'>
        <h1>Questions</h1>
        <span className='primary-button' onClick={this.handleClick}>Show {showUnanswered ? 'Answered' : 'Unanswered'}</span>
        <div>
          {showUnanswered ? (
            <div>
              <h2>Unanswered</h2>
              <ul>
                {unansweredQuestions.map((question) => {
                  return <QuestionText key={ question.id } question={ question } />
                })}
              </ul>
            </div>
          ) : (
            <div>
              <h2>Answered</h2>
              <ul>
                {answeredQuestions.map((question) => {
                  return <QuestionText key={ question.id } question={ question } />
                })}
              </ul>
            </div>
          )}
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
