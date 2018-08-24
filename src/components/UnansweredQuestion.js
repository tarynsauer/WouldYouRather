import React from 'react'
import PropTypes from 'prop-types'

const UnansweredQuestion = ({ optionOneText, optionTwoText, handleClick }) => (
  <div className='unanswered-question'>
    <button className='primary-button' value='optionOne' onClick={handleClick}>{optionOneText}</button>
    <button className='primary-button' value='optionTwo' onClick={handleClick}>{optionTwoText}</button>
  </div>
)

UnansweredQuestion.propTypes = {
  optionOneText: PropTypes.string.isRequired,
  optionTwoText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default UnansweredQuestion
