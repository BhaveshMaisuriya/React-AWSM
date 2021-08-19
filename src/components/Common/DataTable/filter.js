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
import { removeKeywords } from "../../../pages/DQM/Common/helper"
import "./datatable.scss"
import ReplayIcon from "@material-ui/icons/Replay"

const Example = props => {
  const { dataFilter, dataKey, handleClickApply, handleClickReset } = props
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [checkAll, setCheckAll] = useState(true)
  const [data, setData] = useState([])
  const [appliedFiltersList, setAppliedFilters] = useState([])
  const [checkedCount, setCheckedCount] = useState(0)
  const [visibilityCount, setVisibilityCount] = useState(0)
  const [count, setCount] = useState(0)
  const [searchWords, setSearch] = useState("")
  const [hasMore, setHasMore] = useState(true)
  const [isRemark, setHasRemark] = useState(false)
  const [current, setCurrent] = useState([])
  let rowsPerLoad = 30
  const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
  const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />
  const UndeterminateIcon = () => <img src={selectAllIcon} alt="icon" />
  /**
   * initial useEffect
   */
  useEffect(() => {
    if (dataFilter) {
      if (!isNull(dataFilter[dataKey]) && !isUndefined(dataFilter[dataKey])) {
        dataKey === "remarks" ? setHasRemark(true) : setHasRemark(false)
        const alldata = getFilterData()
        setData(alldata)
        const arr = []
        alldata.map((item, index) => {
          if (index < rowsPerLoad) {
            arr.push(item)
          }
        })
        setCount(rowsPerLoad)
        appliedFiltersList.length === 0
          ? setCheckedCount(dataFilter[dataKey].length)
          : setCheckedCount(appliedFiltersList.length)
      }
    }
  }, [dataFilter])

  /**
   * useEffect for loading more dropdown filters
   */
  useEffect(() => {
    let alldata = [...data]
    let arr = []
    let temp = []
    alldata.map(item => {
      if (item.visibility === true) temp.push(item)
    })
    temp.map((item, index) => {
      if (index < rowsPerLoad) arr.push(item)
    })
    temp.length <= rowsPerLoad ? setHasMore(false) : setHasMore(true)
    setVisibilityCount(arr.length)
    setCurrent(arr)
  }, [data])

  /**
   * useEffect for filtering dropdown based on searched words
   */
  useEffect(() => {
    const tempSearch = searchWords === "*" ? "" : searchWords
    let newData = [...data]
    // let count = 0
    newData.map(item => {
      item.visibility =
        item.text !== null &&
        item.text.toString().toLowerCase().includes(tempSearch)
      item.checked =
        appliedFiltersList.length > 0
          ? appliedFiltersList.includes(item.text)
          : item.visibility
      // count = item.checked ? count + 1 : count
    })
    setData(newData)
  }, [searchWords])

  /**
   *
   */
  useEffect(() => {
    if (checkedCount < data.length) setCheckAll(false)
    else if (checkedCount === data.length) setCheckAll(true)
  }, [checkedCount])

  /**
   * set filter object with text checked and visibility value
   * @returns newArr
   */
  function getFilterData() {
    let newArr = []
    dataFilter[dataKey]?.map(item => {
      newArr.push({
        text: item,
        checked:
          appliedFiltersList.length > 0
            ? appliedFiltersList.includes(item)
            : true,
        visibility: true,
      })
    })
    return newArr.sort((a, b) => b.checked - a.checked)
  }

  /**
   * Update check status of row
   * @param event
   */
  function onInputChange(event) {
    const target = event.target
    let newData = [...data]
    newData.map(item => {
      const itemText = isNull(item.text) ? "-null" : item.text
      if (target.value === itemText) {
        item.checked = !item.checked
        item.checked
          ? setCheckedCount(checkedCount + 1)
          : setCheckedCount(checkedCount - 1)
      }
    })
    setData(newData)
  }

  /**
   * Update search words state
   * @param event
   */
  function onSearchTextChange(event) {
    setSearch(event.target.value)
  }

  /**
   * Handle apply button onclick
   */
  function clickApply() {
    const newData = [...data]
    const checkedFilter = newData
      .filter(item => {
        return item.checked === true
      })
      .map(item => {
        return item.text
      })
    setSearch("")
    setAppliedFilters(checkedFilter)
    setPopoverOpen(!popoverOpen)
    handleClickApply(checkedFilter, dataKey)
  }

  /**
   * Handle reset button onclick
   */
  function clickReset() {
    handleClickReset(dataKey)
    setCheckedCount(dataFilter[dataKey].length)
    setAppliedFilters([])
    toggle()
  }

  /**
   * Handle selecct all button onclick
   */
  function clickSelectAll() {
    let newData = [...data]
    newData = newData.map(item => ({ ...item, checked: !checkAll }))
    setData(newData)
    setCheckAll(!checkAll)
    !checkAll ? setCheckedCount(dataFilter[dataKey].length) : setCheckedCount(0)
  }

  /**
   * Handle toggle for filter dropdown, popoverOpen false === open, popoverOpen true === close
   */
  const toggle = () => {
    setPopoverOpen(!popoverOpen)
    if (popoverOpen) {
      setSearch("")
      setData(getFilterData())
      if (appliedFiltersList.length > 0)
        setCheckedCount(appliedFiltersList.length)
      else setCheckAll(true)
    }
  }

  const noResultsMessage = () => {
    const string = `Couldn't find '${searchWords}'`
    return <span style={{ paddingLeft: "7px" }}>{string}</span>
  }

  /**
   * Get more data for dropdown list
   */
  const getMoreData = () => {
    if (data.length <= count) {
      setHasMore(false)
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
      <Button
        id={dataKey}
        color="link"
        className="filter-button"
        onMouseDown={e => e.preventDefault()}
      >
        <i className="mdi mdi-menu-down" />
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={dataKey}
        toggle={toggle}
        trigger="legacy"
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
            {(!isRemark || searchWords !== "") && (
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
                              className={`d-flex align-items-center filter-selection ${
                                row.checked ? "item-checked" : ""
                              }`}
                            >
                              <FormControlLabel
                                key={`${row.text}${index}`}
                                value={isNull(row.text) ? "-null" : row.text}
                                onChange={onInputChange}
                                checked={row.checked}
                                className="checkmark"
                                control={
                                  <Checkbox
                                    icon={<UntickIcon />}
                                    checkedIcon={<CheckedIcon />}
                                    style={{
                                      height: "20px",
                                      width: "5px",
                                      marginLeft: "16px",
                                      marginTop: "8px",
                                    }}
                                  />
                                }
                                label={
                                  isNull(row.text)
                                    ? "-"
                                    : removeKeywords(row.text)
                                }
                              />
                            </div>
                          )
                        )
                      })
                    : noResultsMessage()}
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
              {!isRemark && current.length > 0 && (
                <Fragment>
                  <Checkbox
                    checked={checkAll}
                    icon={<UndeterminateIcon />}
                    checkedIcon={<CheckedIcon />}
                    onClick={clickSelectAll}
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
                </Fragment>
              )}
              <Button
                type="submit"
                className="filter-popover-button filter-popover-button-apply"
                onClick={clickApply}
                disabled={visibilityCount && checkedCount ? false : true}
              >
                Apply
              </Button>
              <Button
                outline
                color="#008F8A"
                onClick={clickReset}
                className="filter-popover-button filter-popover-button-reset"
              >
                Reset
              </Button>
            </div>
          </form>
        </PopoverBody>
      </Popover>
    </Fragment>
  )
}

Example.defaultProps = {
  handleClickApply: () => {},
  handleClickReset: () => {},
}

export default Example
