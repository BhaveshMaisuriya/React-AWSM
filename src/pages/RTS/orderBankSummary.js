import React, { useState, useEffect } from "react"

const OrderBankSummary = props => {
  const { data, totalOrders } = props
  const [asr, setASR] = useState(0)
  const [comm, setComm] = useState(0)
  const [smp, setSMP] = useState(0)
  
  useEffect(() => {
    if (data) {
      data.map(item => {
        if (item.order_type.toString().toUpperCase() === "ASR") setASR(item.volume)
        else if (item.order_type.toString().toUpperCase() === "COMM") setComm(item.volume)
        else if (item.order_type.toString().toUpperCase() === "SMP") setSMP(item.volume)
      })
    }
  }, [data])

  const convertToMillions = value => (Math.abs(Number(value)) / 1.0e6).toFixed(1) + "m"

  return (
    <>{`${totalOrders} orders, ${convertToMillions(asr)} ASR, ${convertToMillions(
      smp
    )} SMP, ${convertToMillions(comm)} Comm, Total ${convertToMillions(asr + smp + comm)}`}</>
  )
}

export default OrderBankSummary
