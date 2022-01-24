import SearchIcon from '../../../assets/images/AWSM-search.svg'
import Checkbox from '@material-ui/core/Checkbox'
import selectAllIcon3 from '../../../assets/images/AWSM-Checkbox.svg'
import selectAllIcon2 from '../../../assets/images/AWSM-Checked-box.svg'
import selectAllIcon from '../../../assets/images/AWSM-Select-all-Checkbox.svg'
import { useEffect, useMemo, useState } from 'react'
import { ReactSVG } from 'react-svg'
import '../style.scss'
import VirtualList from 'react-tiny-virtual-list'
import { connect } from 'react-redux'
import { setBryntumFilter } from '../../../store/actions'

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
  filterData,
  filterKey,
  onApply,
  onReset,
  isGantt,
  selectedFilters,
  setBryntumFilter,
}) => {
  const [first, setFirstTime] = useState(true)

  const [visibleData, setData] = useState(
    filterData.map(e => ({
      text: e,
      checked: first || selectedFilters[filterKey].includes(e),
    }))
  )

  useEffect(() => {
    const _data = filterData.map(e => ({
      text: e,
      checked: first || selectedFilters[filterKey].includes(e),
    }))
    setData(_data)
  }, [filterData, selectedFilters[filterKey]])

  const onItemChange = text => {
    setData(data => {
      const tmp = [...data]
      const item = tmp.find(s => s.text === text)

      item.checked = !item.checked

      return tmp
    })
    setFirstTime(false)
  }

  const checkAllChange = (setAllToChecked = false) => {
    setData(data => {
      const tmp = [...data]
      tmp.forEach(s => {
        if (setAllToChecked) s.checked = true
        else s.checked = !isCheckAll
      })

      return tmp
    })
    setFirstTime(false)
  }

  const onInputSearchChange = event => {
    const value = event.target.value.toString()
    const _visibles = filterData.filter(
      s => !value || s.toLowerCase().includes(value.toLowerCase())
    )
    const data = _visibles.map(e => ({
      text: e,
      checked: first || selectedFilters[filterKey].includes(e),
    }))

    setData(data)
  }

  const apply = () => {
    const _data = visibleData.filter(e => e.checked).map(e => e.text)
    if (onApply) {
      onApply(_data, filterKey)
    }

    const tmp = selectedFilters[filterKey]
    _data.forEach(text => {
      const index = tmp.indexOf(text)
      if (index > -1) {
        tmp.splice(index, 1)
      }
      tmp.push(text)
    })

    setBryntumFilter({ key: filterKey, values: tmp })
  }

  const reset = () => {
    if (onReset) {
      onReset(filterKey)
    }

    setFirstTime(true)
    setBryntumFilter({ key: filterKey, values: [] })
  }

  const isApplyDisable = useMemo(() => !visibleData.some(e => e.checked), [visibleData])

  const isCheckAll = useMemo(
    () => visibleData.length === visibleData.filter(e => e.checked).length,
    [visibleData]
  )

  return (
    <div
      className="chart-column-filter hide"
      id={isGantt ? `gantt-chart-tooltip-${filterKey}` : `chart-tooltip-${filterKey}`}
    >
      <div className="chart-column-input-search">
        <input onChange={onInputSearchChange} />
        <ReactSVG src={SearchIcon} />
      </div>
      <div className="chart-column-filter-body">
        <VirtualList
          width="100%"
          height={visibleData.length >= 5 ? 200 : visibleData.length * 40}
          itemCount={visibleData.length}
          itemSize={40}
          renderItem={({ index, style }) => {
            const e = visibleData[index]
            return (
              <div
                className={`chart-column-select-item ${e.checked ? 'checked' : ' '}`}
                style={style}
                key={index}
              >
                {e.checked ? 'true' : 'false'}
                <Checkbox
                  checked={e.checked}
                  onChange={() => onItemChange(e.text)}
                  icon={<CustomIcon />}
                  checkedIcon={<CustomIcon2 />}
                  style={{
                    height: '20px',
                    width: '5px',
                    marginLeft: '5px',
                    marginTop: '-1px',
                  }}
                />
                <label>{e.text}</label>
              </div>
            )
          }}
        />
      </div>
      <div className="chart-column-footer">
        <div>
          <Checkbox
            checked={isCheckAll}
            onChange={() => checkAllChange()}
            icon={<CustomIcon3 />}
            checkedIcon={<CustomIcon2 />}
            style={{
              height: '20px',
              width: '5px',
              marginLeft: '5px',
              marginTop: '-1px',
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

export default connect(
  ({ orderBank }) => ({
    selectedFilters: orderBank.ganttChart.selectedFilters,
  }),
  dispatch => ({
    setBryntumFilter: params => dispatch(setBryntumFilter(params)),
  })
)(ChartColumnFilter)
