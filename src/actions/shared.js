import { getInitialData } from '../utils/api'
import { setAuthedUser } from './authedUser'
import { receiveQuestions } from './questions'
import { receiveUsers } from './users'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(receiveQuestions(questions))
        dispatch(receiveUsers(users))
      })
  }
}
