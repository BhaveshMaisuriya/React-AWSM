import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { Button, Popover, PopoverBody, Input } from 'reactstrap'
import searchIcon from 'assets/images/AWSM-search.svg'
import { IconButton, FormControlLabel } from '@material-ui/core'
import SimpleBar from 'simplebar-react'
import { isEmpty, isNull, isUndefined } from 'lodash'
import { removeKeywords } from 'pages/DQM/Common/helper'
import './index.scss'
import ReplayIcon from '@material-ui/icons/Replay'
import { format } from 'date-fns'
import CustomCheckbox from 'components/Common/CustomCheckbox'

const FilterDropdown = ({
  handleResetAll,
  dataFilter,
  dataKey,
  handleClickApply,
  handleClickReset,
  rowsPerLoad = 30,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [checkAll, setCheckAll] = useState(true)
  const [data, setData] = useState([])
  const [appliedFiltersList, setAppliedFilters] = useState([])
  const [checkedCount, setCheckedCount] = useState(0)
  const [visibilityCount, setVisibilityCount] = useState(0)
  const [count, setCount] = useState(0)
  const [searchWords, setSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [current, setCurrent] = useState([])
  /**
   * initial useEffect
   */
  useEffect(() => {
    if (dataFilter) {
      if (dataFilter && !isUndefined(dataFilter[dataKey])) {
        const alldata = getFilterData()
        setData(alldata)
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
    const temp = data.filter(item => item.visibility === true)
    const arr = temp.filter((item, index) => index < rowsPerLoad)
    temp.length <= rowsPerLoad ? setHasMore(false) : setHasMore(true)
    setVisibilityCount(arr.length)
    if (
      [
        'inventory_variance',
        'sales_variance',
        'sales_variance_percentage',
        'inventory_variance_percentage',
      ].includes(dataKey)
    ) {
      setCurrent([
        {
          text: 'Outside Threshold',
          checked:
            data.find(e => e.text === 'Outside Threshold')?.checked ?? false,
          visibility: true,
          disabled: arr.findIndex(e => e.text === 'Outside Threshold') < 0,
        },
        {
          text: 'Within Threshold',
          checked:
            data.find(e => e.text === 'Within Threshold')?.checked ?? false,
          visibility: true,
          disabled: arr.findIndex(e => e.text === 'Within Threshold') < 0,
        },
      ])
    } else {
      setCurrent(arr)
    }
  }, [data])

  /**
   * useEffect for filtering dropdown based on searched words
   */
  useEffect(() => {
    const tempSearch = searchWords === '*' ? '' : searchWords
    const newData = [...data]
    newData.forEach(item => {
      item.visibility =
        item.text !== null &&
        item.text
          .toString()
          .toLowerCase()
          .includes(tempSearch.toString().toLowerCase())
      item.checked =
        appliedFiltersList.length > 0
          ? appliedFiltersList.includes(item.text)
          : item.visibility
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

  // useEffect(() => {
  //   !handleResetAll ? resetAll() : null
  // }, [handleResetAll])

  /**
   * set filter object with text checked and visibility value
   * @returns newArr
   */
  function getFilterData() {
    const newArr = []
    dataFilter[dataKey]?.forEach(item => {
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
    const value = event.target.value
    const newData = [...data]
    newData.forEach(item => {
      const itemText = isNull(item.text) ? '-null' : item.text
      if (value.toString() === itemText.toString()) {
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
    const checkedFilter = data
      .filter(item => item.checked === true)
      .map(item => item.text)
    setSearch('')
    setAppliedFilters(checkedFilter)
    setPopoverOpen(!popoverOpen)
    handleClickApply(checkedFilter, dataKey)
  }

  /**
   * Handle reset button onclick
   */
  function clickReset() {
    handleClickReset(dataKey)
    setCheckedCount(dataFilter?.[dataKey]?.length)
    setAppliedFilters([])
    toggle()
  }

  /**
   * Handle reset all filtering
   */
  function resetAll() {
    handleClickReset(dataKey)
    setCheckedCount(dataFilter?.[dataKey]?.length)
    setAppliedFilters([])
  }

  /**
   * Handle selecct all button onclick
   */
  function clickSelectAll() {
    const newData = data.map(item => ({ ...item, checked: !checkAll }))
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
      setSearch('')
      dataFilter ? setData(getFilterData()) : ''
      if (appliedFiltersList.length > 0)
        setCheckedCount(appliedFiltersList.length)
      else setCheckAll(true)
    }
  }

  const ResultsMessage = () => {
    const string =
      visibilityCount > 0
        ? `${visibilityCount} results found for '${searchWords}'`
        : `Couldn't find '${searchWords}'`
    return <span style={{ paddingLeft: '7px' }}>{string}</span>
  }

  /**
   * Get more data for dropdown list
   */
  const getMoreData = () => {
    if (data.length <= count) {
      setHasMore(false)
    } else {
      const arr = [...current]
      data.forEach((item, index) => {
        if (index + 1 > count + 1 && index - 1 < count + rowsPerLoad) {
          arr.push(item)
        }
      })
      setCurrent(arr)
      setCount(count + rowsPerLoad)
    }
  }

  const checkNullValue = useCallback(
    text =>
      isNull(text) ||
      isEmpty(text?.toString()) ||
      text?.toString().includes('null'),
    []
  )

  const escapeRegExp = string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
  }

  const replaceAll = (str, match, replacement) => {
    return str.replace(new RegExp(escapeRegExp(match), 'g'), () => replacement)
  }

  return (
    <Fragment>
      <Button
        id={replaceAll(dataKey, '.', '_')}
        color="link"
        className="filter-button"
        onMouseDown={e => e.preventDefault()}
      >
        <i className="mdi mdi-menu-down" />
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={replaceAll(dataKey, '.', '_')}
        toggle={toggle}
        trigger="legacy"
      >
        <PopoverBody className="filter-container">
          <div className="position-relative">
            <Input
              placeholder="Search"
              onChange={onSearchTextChange}
              style={{
                fontFamily: 'Museo Sans',
                fontSize: '12px',
              }}
            />
            <img
              className="position-absolute search-icon"
              src={searchIcon}
              alt="search"
              style={{
                paddingRight: '8px',
              }}
            />
          </div>
          <form
            className="pt-2"
            onSubmit={e => {
              e.preventDefault()
            }}
          >
            <Fragment>
              <SimpleBar
                autoHide={false}
                style={{
                  maxHeight: '211px',
                  width: '100%',
                  overflow: 'auto',
                }}
              >
                {current.length > 0 && !isNull(current)
                  ? current.map((row, index) => {
                      const renderLabel = () => {
                        if (dataKey === 'dn_status') {
                          return row.text === '-' ? 'Send for DN' : row.text
                        }
                        if (dataKey === 'dipping_timestamp') {
                          return checkNullValue(row.text)
                            ? '-'
                            : format(
                                new Date(row.text),
                                'dd-MM-yyyy , HH:mm:ss'
                              )
                        }
                        if (dataKey === 'override_status') {
                          return checkNullValue(row.text)
                            ? 'Accurate'
                            : row.text
                        }
                        if (
                          [
                            'retain',
                            'runout',
                            'dn_date',
                            'planned_load_time',
                            'eta',
                          ].includes(dataKey)
                        ) {
                          return row?.text && row?.text.length < 24
                            ? '-'
                            : format(new Date(row.text), 'dd-MM-yyyy HH:mm')
                        }
                        if (dataKey === 'requested_delivery_date') {
                          return checkNullValue(row.text)
                            ? '-'
                            : format(new Date(row.text), 'dd-MM-yyyy')
                        }
                        if (dataKey !== 'override_status') {
                          return checkNullValue(row.text)
                            ? '-'
                            : removeKeywords(row.text)
                        }
                      }
                      return (
                        row.visibility && (
                          <div
                            key={`${row.text}${index}`}
                            className={`d-flex align-items-center filter-selection ${
                              row.checked ? 'item-checked' : ''
                            }`}
                          >
                            <FormControlLabel
                              key={`${row.text}${index}`}
                              value={isNull(row.text) ? '-null' : row.text.toString()}
                              onChange={onInputChange}
                              checked={row.checked}
                              disabled={row.disabled}
                              className="checkmark"
                              control={
                                <CustomCheckbox
                                  onClick={onInputChange}
                                  style={{
                                    height: '20px',
                                    width: '5px',
                                    marginLeft: '20px',
                                    marginTop: '10px',
                                  }}
                                  value={isNull(row.text) ? '-null' : row.text}
                                  checked={row.checked}
                                />
                              }
                              label={renderLabel()}
                            />
                          </div>
                        )
                      )
                    })
                  : ResultsMessage()}
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
              <p style={{ marginTop: '-10px' }} />
            </Fragment>
            <div style={{ height: '25px', marginTop: '20px' }}>
              {current.length > 0 && (
                <Fragment>
                  <CustomCheckbox
                    onClick={clickSelectAll}
                    style={{
                      height: '20px',
                      width: '5px',
                      marginLeft: '9px',
                      marginTop: '-1px',
                    }}
                    checked={current.every(e => e.disabled) ? false : checkAll}
                    disabled={current.every(e => e.disabled)}
                    selectAll
                  />
                  <label
                    style={{
                      color: '#008F8A',
                      fontFamily: 'Museo Sans',
                      margin: '3px auto auto 8px',
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
                disabled={!(visibilityCount && checkedCount)}
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

FilterDropdown.defaultProps = {
  handleClickApply: () => {},
  handleClickReset: () => {},
}

export default FilterDropdown
