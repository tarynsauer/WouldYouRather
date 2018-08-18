import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'

const Question = ({ question }) => (
  <div className='options'>
    <div className='optionOne'>{ question.optionOne.text }</div>
    <div className='optionTwo'>{ question.optionTwo.text }</div>
    <div className='author'>{ question.author }</div>
    <div className='timestamp'>{ formatDate(question.timestamp) }</div>
  </div>
)

Question.propTypes = {
  question: PropTypes.object.isRequired
}

export default Question
