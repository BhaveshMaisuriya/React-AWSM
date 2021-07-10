function checkType(value) {
  let string = ""
  switch (typeof value) {
    case "number":
      string = value
      break
    case "string":
      string = `'${value}'`
      break
    default:
      string = value
  }
  return string
}

export function transformObjectToStringSentence(qObject) {
  let newString = ""
  if (Object.keys(qObject).length !== 0 && qObject) {
    const keys = Object.keys(qObject)
    for (let [index, key] of keys.entries()) {
      if(qObject[key].length !== 0) {
        newString = newString.concat("(")
        for (let [index, object] of qObject[key].entries()) {
          newString = newString.concat(key, "==", checkType(object))
          if (index !== qObject[key].length - 1)
            newString = newString.concat("||")
        }
        if (index !== keys.length - 1) newString = newString.concat(")&&")
      } else {
        newString = '';
        newString = newString.concat("(");
      }
    }
    newString = newString.concat(")")
  }
  return newString
}

export function transformArrayToString(array) {
  let newString = ""
  if (array !== [])
    array.forEach((item, index) => {
      newString = newString.concat(item)
      if (index !== array.length - 1) newString = newString.concat(",")
    })
  return newString
}
export function filterObject(objects, qKey) {
  let newObject = {}
  if (Object.keys(objects).length !== 0 && objects) {
    const keys = Object.keys(objects)
    for (let [index, key] of keys.entries()) {
      if (key !== qKey) newObject[key] = objects[key]
    }
  }
  return newObject
}

/**
 * Get cookies by key
 * @param key
 * @returns {string|null}
 */
export function getCookieByKey(key) {
  try {
    if (!document.cookie) {
      return null
    }
    return document.cookie
      .split("; ")
      .find(row => row.startsWith(key))
      .split("=")[1]
  } catch (err) {
    return null
  }
}
