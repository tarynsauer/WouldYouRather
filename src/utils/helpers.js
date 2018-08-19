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
