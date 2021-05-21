import React, { useState, Fragment, useEffect } from "react"
import { Button, Popover, PopoverBody, Input } from "reactstrap"
import searchIcon from "../../../assets/images/AWSM-search.svg"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import "./datatable.scss"
import { IconButton  } from "@material-ui/core"
import Checkbox from '@material-ui/core/Checkbox'
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const Example = React.memo(props => {
  const {
    dataFilter,
    dataKey,
    handleClickApply,
    filterDropdownHandler,
    handleClickReset,
  } = props
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [checkAll, setCheckAll] = useState(true)
  const [data, setData] = useState([])
  const [checkedList, setCheckedList] = useState([])
  const [checkedCount, setCheckedCount] = useState(0)
  const toggle = () => {
    setPopoverOpen(!popoverOpen)
    if (popoverOpen === false) filterDropdownHandler(dataKey)
  }

  /**
   * dataFilter should never be zero unless api fails or db has no data
   */
  useEffect(() => {
    if (Object.prototype.hasOwnProperty.call(dataFilter, dataKey)) {
      setData(
        dataFilter[dataKey].map(item => ({
          text: item,
          checked: checkedList.length > 0 ? checkedList.includes(item) : true,
          visibility: true,
        }))
      )
      checkedList.length === 0
        ? updateCheckedCount("all")
        : updateCheckedCount("current")
    }
  }, [dataFilter])

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
    for (let i = 0; i < newData.length; i++) {
      newData[i].visibility = newData[i].text
        .toString()
        .toLowerCase()
        .includes(event.target.value)
    }
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
    handleClickApply(checkedFilter, dataKey)
    setPopoverOpen(!popoverOpen)
  }
  function clickReset(e) {
    handleClickReset(dataKey)
    updateCheckedCount("all")
    setPopoverOpen(!popoverOpen)
  }
  function selectAll(e) {
    let newData = [...data]
    newData = newData.map(item => ({...item, checked: true}))
    setData(newData)
    setCheckAll(!checkAll);
    
    handleClickReset(dataKey)
    updateCheckedCount("all")
  }
  const CustomIcon = () => {
    // untick checkbox icon
    return <img src={selectAllIcon3} alt="icon"/>
  }
  const CustomIcon2 = () => {
    // ticked checkbox icon
    return <img src={selectAllIcon2} alt="icon"/>
  }
  const CustomIcon3 = () => {
    // indeterminate icon
    return <img src={selectAllIcon} alt="icon"/>
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
      >
        <PopoverBody className="filter-container">
          <div className="position-relative">
            <Input placeholder="Search" onChange={onSearchTextChange} 
            style={{
              fontFamily: "Museo Sans"
              }} />
            <img
              className="position-absolute search-icon"
              src={searchIcon}
              alt="search"
            />
          </div>
          <form
            className="pt-2"
            onSubmit={e => {
              e.preventDefault()
              clickApply(e)
            }}
          >
            {data.length > 0 && data !== undefined
              ? data.map((row, index) => {
                  return (
                    row.visibility && (
                      <div
                        key={row.text}
                        className={`d-flex align-items-center ${
                          row.checked || checkAll ? "item-checked" : ""
                        }`}
                      >
                        <FormControlLabel
                          onChange={() => onInputChange(index)}                                      
                          checked={checkAll || row.checked} 
                          className={"checkmark"}
                          control={<Checkbox icon={<CustomIcon/>} checkedIcon={<CustomIcon2/>} 
                          style={{
                            height:"20px", 
                            width:"5px", 
                            marginLeft:"15px", 
                            marginTop:"5px"
                          }}/>}
                        />
                        <div className="ml-100">{row.text}</div>
                      </div>
                    )
                  )
                })
              : ""}
            <p style={{marginTop: "-10px"}}></p>
            
            <Checkbox 
          
            checked={checkAll} onChange = {() => setCheckAll(!checkAll)}
            icon={<CustomIcon3/>} checkedIcon={<CustomIcon2/>} 
            onClick={selectAll}
            style={{
              height:"20px", 
              width:"5px", 
              marginLeft:"5px", 
              marginTop:"5px"
            }}
            />
            <label
              style={{
                color: "#008F8A",
                marginLeft: "12px",
                fontFamily: "Museo Sans"
              }}
            >
              Select All
            </label>
            <IconButton></IconButton>
            <Button
              type="submit"
              style={{
                borderRadius: "12px",
                padding: "2px 12px",
                fontSize: "12px",
                backgroundColor: "#008F8A",
                float: "right",
                fontFamily: "Museo Sans"
              }}
              onClick={clickApply}
              disabled={checkedCount === 0 ? true : false}
            >
              Apply
            </Button>
            <Button
              type="button"
              outline
              color="#008F8A"
              style={{
                borderRadius: "12px",
                padding: "2px 12px",
                fontSize: "12px",
                backgroundColor: "white",
                float: "right",
                border: "2px solid #e0f4f3",
                color: "#008F8A",
                marginRight: "5px",
                fontFamily: "Museo Sans"
              }}
              onClick={clickReset}
            >
              Reset
            </Button>
          </form>
        </PopoverBody>
      </Popover>
    </Fragment>
  )
})

Example.defaultProps = {
  filterDropdownHandler: () => {},
  handleClickApply: () => {},
  handleClickReset: () => {},
}

export default Example
