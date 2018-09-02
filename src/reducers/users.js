import { ADD_USER, ANSWER_QUESTION, ASK_QUESTION, RECEIVE_USERS } from '../actions/types'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ANSWER_QUESTION :
      const { answer, authedUser, qid } = action

      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }
      }
    case ASK_QUESTION :
      const question = action.question
      const { author, id } = question

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id]),
        }
      }
    case ADD_USER :
      const user = action.user

      return {
        ...state,
        [user.id]: user,
      }
    default :
      return state
  }
}
