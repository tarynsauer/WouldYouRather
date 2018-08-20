import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../utils/helpers'
import PropTypes from 'prop-types'

class Leaderboard extends Component {
  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>User</th>
              <th>Asked Count</th>
              <th>Answered Count</th>
            </tr>
            {this.props.userStats.map((stat) =>
              <tr key={stat.id}>
                <td>{stat.avatarURL}</td>
                <td>{stat.name}</td>
                <td>{stat.questionsCount}</td>
                <td>{stat.answersCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userStats: getUserStats(users),
  }
}

Leaderboard.propTypes = {
  userStats: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(Leaderboard)
