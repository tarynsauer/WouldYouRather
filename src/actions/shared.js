import { getInitialData, saveAnswer } from '../utils/api'
import { receiveQuestions, addAnswer } from './questions'
import { receiveUsers, answerQuestion } from './users'

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
