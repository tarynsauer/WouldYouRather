import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Nav from './Nav'
import ProtectedRoute from './ProtectedRoute'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import QuestionsList from './QuestionsList'
import QuestionPage from './QuestionPage'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading } = this.props

    if (loading === true) {
      dispatch(handleInitialData())
    }
  }

  render() {
    const { loggedIn } = this.props

    return (
      <Router>
        <div>
          {this.props.loading === true
              ? null
              : <div>
                <Nav />
                <ProtectedRoute path='/' exact component={QuestionsList} loggedIn={loggedIn} />
                <Route path='/login' component={Login} />
                <ProtectedRoute path='/question/:id' component={QuestionPage} loggedIn={loggedIn} />
                <ProtectedRoute path='/questions' component={QuestionsList} loggedIn={loggedIn} />
                <ProtectedRoute path='/add' component={AddQuestion} loggedIn={loggedIn} />
                <ProtectedRoute path='/leaderboard' component={Leaderboard} loggedIn={loggedIn} />
              </div>}
            </div>
          </Router>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    loading: (Object.keys(users).length === 0) || (Object.keys(questions).length === 0),
    loggedIn: !(authedUser === null),
  }
}

export default connect(mapStateToProps)(App)
