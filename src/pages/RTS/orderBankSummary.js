import React, { useState, useEffect } from 'react'

const OrderBankSummary = props => {
  const { data, totalOrders } = props
  const [asr, setASR] = useState(0)
  const [comm, setComm] = useState(0)
  const [smp, setSMP] = useState(0)

  useEffect(() => {
    if (data) {
      data.map(item => {
        if (item.order_type.toString().toUpperCase() === 'ASR') setASR(item.volume)
        else if (item.order_type.toString().toUpperCase() === 'COMM') setComm(item.volume)
        else if (item.order_type.toString().toUpperCase() === 'SMP') setSMP(item.volume)
      })
    }
  }, [data])

  // const convertToMillions = value => (Math.abs(Number(value)) / 1.0e6).toFixed(1) + 'm'

  const convertToSummaryVolume = value => {
    const absoluteValue = Math.round(Number(value))
    const numberOfDigits = absoluteValue.toString().length
    let result = 0
    if (numberOfDigits < 4) result = absoluteValue
    else if (numberOfDigits < 7) result = (absoluteValue / 1000).toFixed(1) + 'k'
    else if (numberOfDigits < 10) result = (absoluteValue / 1000000).toFixed(1) + 'm'
    else if (numberOfDigits < 13) result = (absoluteValue / 1000000000).toFixed(1) + 'b'
    else if (numberOfDigits < 16) result = (absoluteValue / 1000000000000).toFixed(1) + 't'
    return result
  }

  const validateWithOrders = value => {
    if (totalOrders > 0) return convertToSummaryVolume(value)
    else return 0
  }

  return (
    <>
      {`${totalOrders} orders, ${validateWithOrders(asr)} ASR, ${validateWithOrders(
        smp
      )} SMP, ${validateWithOrders(comm)} Comm, Total ${validateWithOrders(asr + smp + comm)}`}
    </>
  )
}

export default OrderBankSummary
