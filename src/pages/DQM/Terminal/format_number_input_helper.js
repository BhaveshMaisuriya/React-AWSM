// export const formatNumberInput = (evt) => {
//   const invalidChars = ["e", "E", "+", "-", ".", ",","ê", "Ê"]
//   if (invalidChars.includes(evt.key)) {
//     return evt.preventDefault()
//   }
// }

export const formatNumberInput = (invalidChars) => {
  return (evt)=>{
    if (invalidChars.includes(evt.key)) {
      return evt.preventDefault()
    }
  }
}