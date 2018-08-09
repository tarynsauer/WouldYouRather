import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers,
    _getQuestions,
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestion (data) {
  return _saveQuestion(data)
}

export function saveAnswer (data) {
  return _saveQuestionAnswer(data)
}
