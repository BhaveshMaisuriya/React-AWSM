import React, { useState, Fragment, useEffect } from "react"
import { Button, Popover, PopoverBody, Input } from "reactstrap"
import searchIcon from "../../../assets/images/AWSM-search.svg"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import { IconButton, FormControlLabel } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import SimpleBar from "simplebar-react"
import { isNull, isUndefined } from "lodash"
import "./datatable.scss"
import ReplayIcon from "@material-ui/icons/Replay"

const Example = React.memo(props => {
  const { dataFilter, dataKey, handleClickApply, handleClickReset } = props
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [checkAll, setCheckAll] = useState(true)
  const [data, setData] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [checkedCount, setCheckedCount] = useState(0)

  const [count, setCount] = useState(0)

  const [hasMore, setHasMore] = useState(true)
  const [hasRemark, setHasRemark] = useState(true)
  const [current, setCurrent] = useState([])
  var rowsPerLoad = 30
  /**
   * dataFilter should never be zero unless api fails or db has no data
   */
  useEffect(() => {
    if (dataFilter) {
      if (!isNull(dataFilter[dataKey]) && !isUndefined(dataFilter[dataKey])) {
        let alldata = []

        dataFilter[dataKey].map((item, index) => {
          alldata.push({
            text: item,
            checked: checkedList.length > 0 ? checkedList.includes(item) : true,
            visibility: true,
          })
        })
        setData(alldata)
        let arr = []
        alldata.length <= 10 && setHasMore(false)
        alldata.map((item, index) => {
          if (index < rowsPerLoad) {
            arr.push(item)
          }
        })
        setCount(rowsPerLoad)
        setCurrent(arr)
        checkedList.length === 0
          ? updateCheckedCount("all")
          : updateCheckedCount("current")
      }
    }
  }, [dataFilter])

  useEffect(() => {
    let alldata = [...data]
    let arr = []
    alldata.map((item, index) => {
      if (index < rowsPerLoad) {
        arr.push(item)
      }
    })
    arr.length <= rowsPerLoad ? setHasMore(false) : setHasMore(true)
    setCurrent(arr)
  }, [data])

  function updateCheckedCount(string) {
    switch (string) {
      case "increment":
        setCheckedCount(checkedCount + 1)
        break
      case "decrement":
        setCheckedCount(checkedCount - 1)
        break
      case "all":
        setCheckedCount(dataFilter[dataKey].length)
        break
      case "current":
        setCheckedCount(checkedList.length)
        break
      case "none":
        setCheckedCount(0)
        break
      default:
        setCheckedCount(0)
        break
    }
  }

  /**
   * Update check status of row
   * @param index
   */
  function onInputChange(index) {
    const newData = [...data]
    newData[index].checked = !newData[index].checked
    setData(newData)
    if (checkAll) {
      setCheckAll(false)
    }
    updateCheckedCount(newData[index].checked ? "increment" : "decrement")
  }

  /**
   * Filter
   * @param event
   */
  function onSearchTextChange(event) {
    const newData = [...data]
    newData.map((item, index) => {
      item.visibility =
        item.text !== null &&
        item.text.toString().toLowerCase().includes(event.target.value)
      item.checked =
        item.text !== null &&
        item.text.toString().toLowerCase().includes(event.target.value)
    })
    setData(newData)
  }

  function clickApply(e) {
    const newData = [...data]
    const checkedFilter = newData
      .filter(item => {
        return item.checked === true
      })
      .map(item => {
        return item.text
      })
    setCheckedList(checkedFilter)
    toggle()
    handleClickApply(checkedFilter, dataKey)
  }

  function clickReset(e) {
    handleClickReset(dataKey)
    updateCheckedCount("all")
    setCheckAll(true)
    toggle()
  }

  function selectAll(e) {
    let newData = [...data]
    newData = newData.map(item => ({ ...item, checked: !checkAll }))
    setData(newData)
    setCheckAll(!checkAll)

    // handleClickReset(dataKey)
    updateCheckedCount(!checkAll ? "all" : "none")
  }
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

  const toggle = () => {
    setPopoverOpen(!popoverOpen)
    dataKey === "remarks" ? setHasRemark(true) : setHasRemark(false)
  }

  const getMoreData = () => {
    if (data.length <= count) {
      setHasMore(false)
      return
    } else {
      let arr = [...current]
      data.map((item, index) => {
        if (index + 1 > count + 1 && index - 1 < count + rowsPerLoad) {
          arr.push(item)
        }
      })
      setCurrent(arr)
      setCount(count + rowsPerLoad)
    }
  }

  return (
    <Fragment>
      <Button id={dataKey} type="button" color="link" className="filter-button">
        <i className="mdi mdi-menu-down" />
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={dataKey}
        toggle={toggle}
        trigger="legacy"
        style={{ width: "auto" }}
      >
        <PopoverBody className="filter-container">
          <div className="position-relative">
            <Input
              placeholder="Search"
              onChange={onSearchTextChange}
              style={{
                fontFamily: "Museo Sans",
                fontSize: "12px",
              }}
            />
            <img
              className="position-absolute search-icon"
              src={searchIcon}
              alt="search"
              style={{
                paddingRight: "8px",
              }}
            />
          </div>
          <form
            className="pt-2"
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            {!hasRemark && (
              <Fragment>
                <SimpleBar
                  autoHide={false}
                  style={{
                    maxHeight: "160px",
                    width: "100%",
                    overflow: "auto",
                  }}
                >
                  {current.length > 0 && !isNull(current)
                    ? current.map((row, index) => {
                        return (
                          row.visibility && (
                            <div
                              key={row.text}
                              className={`d-flex align-items-center filter-selection ${
                                row.checked || checkAll ? "item-checked" : ""
                              }`}
                            >
                              <FormControlLabel
                                key={`${row}${index}`}
                                onChange={() => onInputChange(index)}
                                checked={checkAll || row.checked}
                                className="checkmark"
                                control={
                                  <Checkbox
                                    icon={<CustomIcon />}
                                    checkedIcon={<CustomIcon2 />}
                                    style={{
                                      height: "20px",
                                      width: "5px",
                                      marginLeft: "16px",
                                      marginTop: "8px",
                                    }}
                                    name={isNull(row.text) ? "-" : row.text}
                                  />
                                }
                                label={isNull(row.text) ? "-" : row.text}
                              />
                            </div>
                          )
                        )
                      })
                    : ""}
                  {hasMore && (
                    <IconButton
                      color="primary"
                      aria-label="Load More"
                      component="span"
                      className="Loadmore_Filters"
                      onClick={getMoreData}
                    >
                      <ReplayIcon />
                    </IconButton>
                  )}
                </SimpleBar>
                <p style={{ marginTop: "-10px" }}></p>
              </Fragment>
            )}
            <div style={{ height: "25px" }}>
              <Checkbox
                checked={checkAll}
                onChange={() => setCheckAll(!checkAll)}
                icon={<CustomIcon3 />}
                checkedIcon={<CustomIcon2 />}
                onClick={selectAll}
                style={{
                  height: "20px",
                  width: "5px",
                  marginLeft: "5px",
                  marginTop: "-1px",
                }}
              />
              <label
                style={{
                  color: "#008F8A",
                  fontFamily: "Museo Sans",
                  margin: "3px auto auto 8px",
                }}
              >
                Select All
              </label>
              <Button
                type="submit"
                className="filter-popover-button filter-popover-button-apply"
                onClick={clickApply}
                disabled={checkedCount === 0 || hasRemark ? true : false}
              >
                Apply
              </Button>
              <Button
                type="button"
                outline
                color="#008F8A"
                onClick={clickReset}
                className="filter-popover-button filter-popover-button-reset"
                disabled={hasRemark ? true : false}
              >
                Reset
              </Button>
            </div>
          </form>
        </PopoverBody>
      </Popover>
    </Fragment>
  )
})

Example.defaultProps = {
  handleClickApply: () => {},
  handleClickReset: () => {},
}

export default Example
