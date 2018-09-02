import { ADD_ANSWER, ADD_QUESTION, RECEIVE_QUESTIONS } from './types'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function addAnswer ({authedUser, qid, answer}) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer,
  }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}
