export function formatDate (timestamp) {
  const date = new Date(timestamp)
  const time = date.toLocaleTimeString('en-US')
  return `${date.toLocaleDateString()} | ${time.substr(0, 4)} ${time.slice(-2).toLowerCase()}`
}

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
