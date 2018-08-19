export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

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
