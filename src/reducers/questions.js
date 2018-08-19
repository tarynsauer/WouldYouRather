import { RECEIVE_QUESTIONS } from '../actions/questions'
import { ADD_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      }
    case ADD_ANSWER :
      const { answer, authedUser, qid } = action

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          }
        }
      }
    default :
      return state
  }
}
