import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/shared'
import PropTypes from 'prop-types'

class AddQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  handleSubmit = (e) => {
    const { author, dispatch } = this.props
    const { optionOneText, optionTwoText } = this.state

    dispatch(handleAddQuestion({ optionOneText, optionTwoText, author }))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
    }))
  }

  handleChange = (e) => {
    const text = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: text
    }))
  }

  render() {
    const { optionOneText, optionTwoText } = this.state

    return (
      <div>
        <h1>Add Question</h1>
        <div>Would you Rather</div>
        <input name='optionOneText'  type='text' value={optionOneText} onChange={this.handleChange} />
        <input name='optionTwoText' type='text' value={optionTwoText} onChange={this.handleChange} />
        <input onClick={this.handleSubmit} disabled={!(optionOneText && optionTwoText)} type='submit' />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    author: authedUser,
  }
}

AddQuestion.propTyypes = {
  author: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(AddQuestion)
