const ShiftPopover = ({ record, type }) => {
  return (
    <div className="w-100">
      <button id={`chart-${type}-cell-${record.id}`} type="button">
        {record?.status}
      </button>
    </div>
  )
}

export default ShiftPopover
