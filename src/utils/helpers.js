function sortByTimestamp (object) {
  const list = Object.values(object)
  return list.sort((a, b) => a.timestamp < b.timestamp)
}

export function includeQuestions (questions, ids) {
  const relevantQuestions = Object.keys(questions)
    .filter(id => ids.includes(id))
    .reduce((question, id) => {
      question[id] = questions[id]
      return question
    }, {})

  return sortByTimestamp(relevantQuestions)
}

export function filterQuestions (questions, ids) {
  const relevantQuestions = Object.keys(questions)
    .filter(id => !ids.includes(id))
    .reduce((question, id) => {
      question[id] = questions[id]
      return question
    }, {})

  return sortByTimestamp(relevantQuestions)
}

export function getVotePercentage (votesListOne, votesListTwo) {
  const votesCountOne = votesListOne.length
  const votesCountTwo = votesListTwo.length
  const totalCount = votesCountOne + votesCountTwo

  return Math.round(votesCountOne/totalCount * 100)
}

export function getUserStats (users) {
  return Object.values(users).map((user) => {
    const questionsCount = user.questions.length
    const answersCount = Object.values(user.answers).length

    return {
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL.length === 0 ? 'https://ssl.gstatic.com/images/branding/product/1x/avatar_square_grey_512dp.png' : user.avatarURL,
      questionsCount: questionsCount,
      answersCount: answersCount,
      total: questionsCount + answersCount,
    }
  }).sort((a, b) => a.total < b.total)
}
