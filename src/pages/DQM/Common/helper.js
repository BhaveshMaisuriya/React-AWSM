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
      newString = newString.concat("(")
      for (let [index, object] of qObject[key].entries()) {
        newString = newString.concat(key, "==", checkType(object))
        if (index !== qObject[key].length - 1)
          newString = newString.concat("||")
      }
      if (index !== keys.length - 1) newString = newString.concat(")&&")
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

export const  runValidation = (data) => {
  if (data.storage) {
    const validateStorage = Object.keys(data.storage).every(key => {
      if (key.startsWith("storage_") && data.storage[key]) {
        return data.storage[key].monthly_fixed_quota <= 10000000
      }
      return  true
    })
    if (!validateStorage) {
      return validateStorage
    }
  }
  if(data.contact) {
    const validateContact = Object.keys(data.contact).every(key => {
      if (key.startsWith("contact_") && data.contact[key]) {
        return /^\+?[0-9- ]+$/.test(data.contact[key].number)
      }
      return true
    })
    if (!validateContact) {
      return validateContact
    }
  }
  if (data.status && data.status.status_awsm === "Temporarily Closed") {
    if (!data.status.close_period || !(data.status.close_period.date_from && data.status.close_period.date_to && data.status.close_period.time_from && data.status.close_period.time_to)) {
      return false
    }
  }
  if (data.territory_manager && !/^\+?[0-9- ]+$/.test(data.territory_manager.number)) {
    return false
  }
  if (data.retail_sales_manager && !/^\+?[0-9- ]+$/.test(data.retail_sales_manager.number)) {
    return false
  }
  return true
}
