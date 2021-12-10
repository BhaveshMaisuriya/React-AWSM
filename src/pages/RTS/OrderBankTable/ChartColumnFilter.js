import SearchIcon from "../../../assets/images/AWSM-search.svg"
import Checkbox from "@material-ui/core/Checkbox"
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import { useEffect, useMemo, useState } from "react"
import { ReactSVG } from "react-svg"
import "../style.scss"
import VirtualList from "react-tiny-virtual-list"

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
}) => {

  const [selectedRows, setSelectedRows] = useState({
    isFirst: true,
    list: [],
  })
  
  function getData() {
    return filterData.map(e => ({
      text: e,
      checked: selectedRows.isFirst || !!selectedRows.list.find(v => v === e),
      visible: true,
    }))
  }

  const [data, setData] = useState(getData());

  const visibleData = useMemo(() => {
    return data.filter(e => e.visible)
  }, [data])
  
  useEffect(() => {
    setData(getData());
  }, [filterData])

  const onItemChange = text => {
    const newData = [...data]
    const selectedRow = newData.find(e => e.text === text);
    selectedRow.checked = !selectedRow.checked
    setData(newData)
    setSelectedRows({ isFirst: false, list: newData.filter(e => e.checked).map(e => e.text) })
  }

  const isCheckAll = useMemo(() => {
    return data.length === data.filter(e => e.checked).length
  }, [data])

  const checkAllChange = () => {
    setData([...data].map(e => ({ ...e, checked: !isCheckAll })))
    setSelectedRows({ isFirst: false, list: data.filter(() => !isCheckAll).map(e => e.text) })
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
  
  const isApplyDisable = useMemo(() => {
    return !data.some(e => e.checked)
  }, [data])

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
        <VirtualList
          width='100%'
          height={visibleData.length >= 5 ? 200 : visibleData.length*40}
          itemCount={visibleData.length}
          itemSize={40}
          renderItem={({index, style}) =>
            {
              const e = visibleData[index] ?? {}
              return (
                <div
                  className={`chart-column-select-item ${
                    e.checked ? "checked" : " "
                  }`}
                  style={style}
                  key={index}
                >
                  <Checkbox
                    checked={e.checked}
                    onChange={() => onItemChange(e.text)}
                    icon={<CustomIcon />}
                    checkedIcon={<CustomIcon2 />}
                    style={{
                      height: "20px",
                      width: "5px",
                      marginLeft: "5px",
                      marginTop: "-1px",
                    }}
                  />
                  <label>{e.text.toString()}</label>
                </div>
              )
            }
          }
        />
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
          <button disabled={isApplyDisable} className="btn btn-primary" onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChartColumnFilter
