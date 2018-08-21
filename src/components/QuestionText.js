import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const QuestionText = ({ question }) => (
  <div>
    <Link to={`/question/${question.id}`}>
      <p>Would you rather <strong>{question.optionOne.text}</strong> or <strong>{question.optionTwo.text}</strong>?</p>
    </Link>
  </div>
)

QuestionText.propTypes = {
  question: PropTypes.object.isRequired,
}

export default QuestionText
