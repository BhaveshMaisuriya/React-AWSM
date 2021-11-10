import SearchIcon from "../../../assets/images/AWSM-search.svg"
import Checkbox from "@material-ui/core/Checkbox"
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import { useMemo, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import "../style.scss"

const CustomIcon = () => {
  // untick checkbox icon
  return <img src={selectAllIcon3} alt="icon" />
}
const CustomIcon2 = () => {
  // ticked checkbox icon
  return <img src={selectAllIcon2} alt="icon" />
}
const CustomIcon3 = () => {
  // indeterminate icon
  return <img src={selectAllIcon} alt="icon" />
}

const ChartColumnFilter = ({
  filterData = [],
  filterKey,
  onApply,
  onReset,
  type,
}) => {
  const originalDataList = useMemo(() => {
    switch (type) {
      case "list": {
        return [
          ...new Set([].concat(...filterData.map(e => e[`${filterKey}_list`]))),
        ]
      }
      default: {
        return filterData.map(e => e[filterKey])
      }
    }
  }, [filterData])

  useEffect(() => {
    setData(
      [...new Set(originalDataList)].map(e => ({
        text: e,
        checked: true,
        visible: true,
      }))
    )
  }, [originalDataList])

  const [data, setData] = useState(
    [...new Set(originalDataList)].map(e => ({
      text: e,
      checked: true,
      visible: true,
    }))
  )

  const onItemChange = index => {
    const newData = [...data]
    if (newData[index]) {
      newData[index].checked = !newData[index].checked
    }
    setData(newData)
  }

  const isCheckAll = useMemo(() => {
    return data.length === data.filter(e => e.checked).length
  }, [data])

  const checkAllChange = () => {
    setData([...data].map(e => ({ ...e, checked: !isCheckAll })))
  }

  const onInputSearchChange = event => {
    const value = event.target.value.toString()
    setData(
      [...data].map(e => ({
        ...e,
        visible:
          !value ||
          e.text
            .toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase()),
      }))
    )
  }

  const apply = () => {
    if (onApply) {
      onApply(
        data.filter(e => e.checked && e.visible).map(e => e.text),
        filterKey
      )
    }
  }

  const reset = () => {
    if (onReset) {
      onReset(filterKey)
    }
    setData([...data].map(e => ({ ...e, checked: true })))
  }

  return (
    <div
      className={`chart-column-filter hide`}
      id={`gantt-chart-tooltip-${filterKey}`}
    >
      <div className="chart-column-input-search">
        <input onChange={onInputSearchChange} />
        <ReactSVG src={SearchIcon} />
      </div>
      <div className="chart-column-filter-body">
        {data.map(
          (e, index) =>
            e.visible && (
              <div
                className={`chart-column-select-item ${
                  e.checked ? "checked" : " "
                }`}
              >
                <Checkbox
                  checked={e.checked}
                  onChange={() => onItemChange(index)}
                  icon={<CustomIcon />}
                  checkedIcon={<CustomIcon2 />}
                  style={{
                    height: "20px",
                    width: "5px",
                    marginLeft: "5px",
                    marginTop: "-1px",
                  }}
                />
                <label>{e.text}</label>
              </div>
            )
        )}
      </div>
      <div className="chart-column-footer">
        <div>
          <Checkbox
            checked={isCheckAll}
            onChange={checkAllChange}
            icon={<CustomIcon3 />}
            checkedIcon={<CustomIcon2 />}
            style={{
              height: "20px",
              width: "5px",
              marginLeft: "5px",
              marginTop: "-1px",
            }}
          />
          <label>Select All</label>
        </div>
        <div>
          <button className="btn btn-outline-primary" onClick={reset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChartColumnFilter
