import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    userStats: Object.values(users).map((user) => {
      const questionsCount = user.questions.length
      const answersCount = Object.values(user.answers).length

      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionsCount: questionsCount,
        answersCount: answersCount,
        total: questionsCount + answersCount,
      }
    }).sort((a, b) => a.total < b.total),
  }
}

export default connect(mapStateToProps)(Leaderboard)
