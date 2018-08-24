import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import AddQuestion from './AddQuestion'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Nav from './Nav'
import PropTypes from 'prop-types'
import ProtectedRoute from './ProtectedRoute'
import QuestionPage from './QuestionPage'
import QuestionsList from './QuestionsList'
import './App.css'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading } = this.props

    if (loading === true) {
      dispatch(handleInitialData())
    }
  }

  render() {
    const { loading, loggedIn } = this.props

    return (
      <Router>
        <div>
          {loading === true
              ? null
              : <div>
                <Nav />
                <div className='content-container'>
                  <ProtectedRoute path='/' exact component={QuestionsList} loggedIn={loggedIn} />
                  <Route path='/login' component={Login} />
                  <ProtectedRoute path='/question/:id' component={QuestionPage} loggedIn={loggedIn} />
                  <ProtectedRoute path='/questions' component={QuestionsList} loggedIn={loggedIn} />
                  <ProtectedRoute path='/add' component={AddQuestion} loggedIn={loggedIn} />
                  <ProtectedRoute path='/leaderboard' component={Leaderboard} loggedIn={loggedIn} />
                </div>
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

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(App)
