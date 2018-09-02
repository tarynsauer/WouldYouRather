import { ADD_USER, ANSWER_QUESTION, ASK_QUESTION, RECEIVE_USERS } from './types'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function answerQuestion ({answer, authedUser, qid}) {
  return {
    type: ANSWER_QUESTION,
    answer,
    authedUser,
    qid,
  }
}

export function askQuestion (question) {
  return {
    type: ASK_QUESTION,
    question,
  }
}

export function addUser (user) {
  return {
    type: ADD_USER,
    user,
  }
}
