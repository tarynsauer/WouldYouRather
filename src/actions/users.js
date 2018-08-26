export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ASK_QUESTION = 'ASK_QUESTION'
export const ADD_USER = 'ADD_USER'

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
