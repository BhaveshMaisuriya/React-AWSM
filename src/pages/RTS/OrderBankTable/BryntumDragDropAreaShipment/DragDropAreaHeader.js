import React, { memo } from 'react'
import { format } from 'date-fns'

const DragDropAreaHeader = memo(({ vehicle, currentDate }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center
            p-3 border-black-100 drag-drop-header"
    >
      <p className="mb-0">
        vehicle id: &nbsp;
        <span className="text-primary-green">{vehicle ? vehicle : ' - '}</span>
      </p>
      <p className="mb-0 b-text-align-center">
        {currentDate
          ? format(new Date(currentDate), 'EEEE, do MMM yyyy')
          : 'Thursday, 11th FEB 2021'}
      </p>
      <p />
    </div>
  )
})

export default DragDropAreaHeader
