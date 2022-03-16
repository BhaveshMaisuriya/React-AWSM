export const formatNumberInput = invalidChars => {
  return evt => {
    if (invalidChars.includes(evt.key)) {
      return evt.preventDefault()
    }
  }
}

export const allowOnlyPhoneNumber = e => {
  // character, not with ctrl,cmd, alt key
  if (
    e.keyCode >= 65 &&
    e.keyCode <= 90 &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    return e.preventDefault()
  }

  // number with shift
  if (e.keyCode >= 48 && e.keyCode <= 57 && !!e.shiftKey) {
    return e.preventDefault()
  }

  // ` ~ - _ = + \ | [ { ] } ' " ; : / ? , < . >
  const otherKeys = [186, 187, 188, 189, 190, 191, 192, 219, 220, 221, 222]
  if (otherKeys.indexOf(e.keyCode) !== -1) {
    // allow minus sign
    if (e.keyCode === 189 && !e.shiftKey) {
      return true
    }

    // allow plus sign
    if (e.keyCode === 187 && e.shiftKey) {
      return true
    }

    return e.preventDefault()
  }
  return true
}
