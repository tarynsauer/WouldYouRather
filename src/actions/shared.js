import { getInitialData, saveAnswer, saveQuestion } from '../utils/api'
import { receiveQuestions, addAnswer, addQuestion } from './questions'
import { receiveUsers, answerQuestion, askQuestion } from './users'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveQuestions(questions))
        dispatch(receiveUsers(users))
      })
  }
}

export function handleAnswerQuestion (data) {
  return (dispatch) => {
    dispatch(addAnswer(data))
    dispatch(answerQuestion(data))
    return saveAnswer(data)
  }
}

export function handleAddQuestion (data) {
  return (dispatch) => {
    return saveQuestion(data)
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(askQuestion(question))
      })
  }
}
