import { useRef } from 'react'

const ShiftPopover = ({ record, onChange, type }) => {
  // const list =
  //   record.shift_type === 'Double'
  //     ? ['On', 'On1', 'On2', 'Off']
  //     : record.shift_type === 'OH'
  //     ? ['ON', 'Off']
  //     : []
  return (
    <div className="w-100">
      <button id={`chart-${type}-cell-${record.id}`} type="button">
        {record?.status}
      </button>
    </div>
  )
}

export default ShiftPopover
