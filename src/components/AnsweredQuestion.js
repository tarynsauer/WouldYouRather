import React from 'react'
import PropTypes from 'prop-types'
import { getVotePercentage } from '../utils/helpers'

const AnsweredQuestion = ({ optionOne, optionTwo, userAnswer }) => (
  <div className='answered-question'>
    <div className={userAnswer === 'optionOne' ? 'selectedOption' : ''}>{optionOne.text} - {optionOne.votes.length} - {getVotePercentage(optionOne.votes, optionTwo.votes)}%</div>
    <div className={userAnswer === 'optionTwo' ? 'selectedOption' : ''}>{optionTwo.text} - {optionTwo.votes.length} - {getVotePercentage(optionTwo.votes, optionOne.votes)}%</div>
  </div>
)

AnsweredQuestion.propTypes = {
  userAnswer: PropTypes.string.isRequired,
  optionOne: PropTypes.object.isRequired,
  optionTwo: PropTypes.object.isRequired,
}

export default AnsweredQuestion
