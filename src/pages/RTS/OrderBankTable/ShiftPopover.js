import { Popover, PopoverBody } from "reactstrap"
import ArrowDropDownIcon from "../../../assets/images/AWSM-Caret-Down-Icon.svg"
import { ReactSVG } from "react-svg"
import { useRef, useState } from "react"
import "../style.scss"

const ShiftPopover = ({ record, onChange, type }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const toggle = () => setPopoverOpen(!popoverOpen)
  const buttonRef = useRef()
  const list =
    record.shift_type === "ON"
      ? ["On", "On1", "On2", "Off"]
      : record.shift_type === "OH"
      ? ["ON", "Off"]
      : []
  return (
    <div className="w-100">
      <button
        ref={buttonRef}
        id={`chart-${type}-cell-${record.id}`}
        type={"button"}
        onBlur={() => setPopoverOpen(false)}
      >
        <div>{record?.shift_type}</div>
        <ReactSVG src={ArrowDropDownIcon} />
      </button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={buttonRef}
        toggle={toggle}
      >
        <PopoverBody className="p-0">
          {list?.map?.(e => (
            <div className="shift-item" onClick={() => onChange(record.id, e)}>
              {e}
            </div>
          ))}
        </PopoverBody>
      </Popover>
    </div>
  )
}

export default ShiftPopover