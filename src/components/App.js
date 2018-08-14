import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import Nav from './Nav'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading } = this.props

    if (loading === true) {
      dispatch(handleInitialData())
    }
  }

  render() {
    return (
      <Router>
        <div>
          {this.props.loading === true
              ? null
              : <div>
                <Nav />
                <Route path='/' exact component={Dashboard} />
                <Route path='/login' component={Login} />
              </div>}
            </div>
          </Router>
    )
  }
}

function mapStateToProps ({ questions, users }) {
  return {
    loading: (Object.keys(users).length === 0) || (Object.keys(questions).length === 0),
  }
}

export default connect(mapStateToProps)(App)
