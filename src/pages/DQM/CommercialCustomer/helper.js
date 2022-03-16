function checkType(value) {
  let string = ''
  switch (typeof value) {
    case 'number':
      string = value
      break
    case 'string':
      string = `'${value}'`
      break
    default:
      string = value
  }
  return string
}

export function transformObjectToStringSentence(qObject) {
  let newString = ''
  if (qObject !== {}) {
    const keys = Object.keys(qObject)
    for (let [index, key] of keys.entries()) {
      for (let [index, qObject] of objects[key].entries()) {
        newString = newString.concat(key, ' = ', checkType(qObject))
        if (index !== objects[key].length - 1)
          newString = newString.concat(' | ')
      }
      if (index !== keys.length - 1) newString = newString.concat(' & ')
    }
  }
  return newString
}

export function transformArrayToString(array) {
  let newString = ''
  if (array !== [])
    array.forEach((item, index) => {
      newString = newString.concat(item)
      if (index !== array.length - 1) newString = newString.concat(',')
    })
  return newString
}
