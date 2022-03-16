function checkType(value) {
  // let string = ""
  // switch (typeof value) {
  //   case "number":
  //     string = value
  //     break
  //   case "string":
  //     string = `'${value}'`
  //     break
  //   default:
  //     string = value
  // }
  // return string

  return `'${value}'` // according to Truong...
}

export function transformObjectToStringSentence(qObject) {
  let newString = ''
  if (Object.keys(qObject).length !== 0 && qObject) {
    const keys = Object.keys(qObject)
    for (let [index, key] of keys.entries()) {
      if (qObject[key].length !== 0) {
        newString = newString.concat('(')
        for (let [index, object] of qObject[key].entries()) {
          newString = newString.concat(key, '==', checkType(object))
          if (index !== qObject[key].length - 1)
            newString = newString.concat('||')
        }
        if (index !== keys.length - 1) newString = newString.concat(')&&')
      } else {
        newString = ''
        newString = newString.concat('(')
      }
    }
    newString = newString.concat(')')
  }
  return newString
}

export function transformObjectToStringSentenceRTS(qObject) {
  let newString = ''
  if (Object.keys(qObject).length !== 0 && qObject) {
    const keys = Object.keys(qObject)
    for (let [index, key] of keys.entries()) {
      if (qObject[key].length !== 0) {
        newString = newString.concat('(')
        for (let [index, object] of qObject[key].entries()) {
          newString = newString.concat(key, '==', `'${object}'`)
          if (index !== qObject[key].length - 1)
            newString = newString.concat('||')
        }
        if (index !== keys.length - 1) newString = newString.concat(')&&')
      } else {
        newString = ''
        newString = newString.concat('(')
      }
    }
    newString = newString.concat(')')
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
      .split('; ')
      .find(row => row.startsWith(key))
      .split('=')[1]
  } catch (err) {
    return null
  }
}

export const isValidDate = date => {
  return (
    date &&
    date.type &&
    ((date.type === 'every' && date.days && date.days.length > 0) ||
      (date.type === 'range' && (date.date_to || date.date_from)) ||
      date.type === 'daily' ||
      (date.type === 'single' && date.date_from))
  )
}

export const isValidDateTime = date => {
  if (!date || typeof date !== 'object') {
    return false
  }
  // Empty date
  if (!date.time_from && !date.time_to && !isValidDate(date)) {
    return true
  }
  return date.type && date.time_from && date.time_to && isValidDate(date)
}

export const runValidation = data => {
  if (data.storage) {
    const validateStorage = Object.keys(data.storage).every(key => {
      if (key.startsWith('storage_') && data.storage[key]) {
        return data.storage[key].monthly_fixed_quota <= 10000000
      }
      return true
    })
    if (!validateStorage) {
      return validateStorage
    }
  }
  if (data.contact) {
    const validateContact = Object.keys(data.contact).map(key => {
      const contactKey = key.split('_').pop()
      if (
        key.startsWith('contact_') &&
        data.contact[key] &&
        ['2', '3'].includes(contactKey)
      ) {
        if (
          data.contact[key].number &&
          !/^\+?[0-9- ]+$/.test(data.contact[key].number)
        ) {
          return false
        }
        if (
          data?.contact[key]?.email &&
          data?.contact[key]?.email.trim().length !== 0 &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
            data.contact[key].email
          )
        ) {
          return false
        }
      }
      return true
    })
    if (validateContact.includes(false)) {
      return false
    }
  }
  if (
    data.retail_sales_manager &&
    data.retail_sales_manager.number &&
    !/^\+?[0-9- ]+$/.test(data.retail_sales_manager.number)
  ) {
    return false
  }
  if (data.delivery) {
    return Object.keys(data.delivery).every(key => {
      const intervalNumber = key.split('_').pop()
      if (
        (key.startsWith('actual_open_time') && intervalNumber < 3) ||
        (key.startsWith('no_delivery_interval') &&
          intervalNumber > 2 &&
          intervalNumber <= 5)
      ) {
        return isValidDateTime(data.delivery[key])
      }
      return true
    })
  }
}

export const removeKeywords = string => {
  const newString = string.toString() ? string.toString() : string
  return newString
    ? newString
        .toString()
        .replace(
          'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
          'Every day'
        )
        .replace(
          'every Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday',
          'Every day'
        )
        .replace('every ', '')
        .replace('daily ', 'Every day')
        .replace('daily', 'Every day')
        .replace('range ', '')
        .replace('single ', '')
        .replace('null', '-')
        .replace('None', '-')
        .replace('true', 'Y')
        .replace('false', 'N')
    : newString
}

export const tagColors = {
  ACTIVE: 'primary',
  INACTIVE: 'secondary',
  DELETE: 'secondary',
  'TEMP BLOCKED': 'tertiary',
  'TEMPORARY INACTIVE': 'tertiary',
  'TEMP INACTIVE': 'tertiary',
}
