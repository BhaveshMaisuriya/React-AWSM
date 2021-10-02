import React, { Component, useState } from 'react';
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import Filter from "../../../components/Common/DataTable/filter"
import { tableMapping } from "./tableMapping"
import {
  CustomInput,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
} from "reactstrap"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import selectAllIcon from "../../../assets/images/AWSM-Select-all-Checkbox.svg"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import searchIcon from "../../../assets/images/AWSM-search.svg"
import { ReactSVG } from "react-svg"
import { isArray } from "lodash"
import "./index.scss"
import EditIcon from "../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../assets/images/AWSM-Trash-Icon.svg"
import NoDataIcon from "../../../assets/images/AWSM-No-Data-Available.svg"
import DeleteOrderBankConfirmation from "../deleteOrderBankModal"
import EditOrderBankModal from "../editOrderBankModal"
import ConfirmDNStatusModal from "./confirmDNStatusModal"
import { isEqual } from "lodash"
import { updateOrderBankTableData, deleteOrderBankDetail, sendDNStatusRequest } from "../../../store/actions"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"


export class TableGroupEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDropDown: false,
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    }
  }

  toggle = () => {
    this.setState({ openDropDown: !this.state.openDropDown })
  }

  OnClickEditHandler = () => {
    this.setState({ isOpenEditModal: true })
  }

  OnClickRemoveHandler = () => {
    this.setState({ isOpenDeleteModal: true })
  }

  onChangeCheckBox(e) {
    const { Onchange, index } = this.props
    Onchange(e.target.checked, index)
  }

  deleteOrder = async() => {
    this.setState({ isOpenDeleteModal: false })
    this.props.deleteRecords(this.props.allData)
  }

  render() {
    const { openDropDown } = this.state
    const { index, isChecked, editable = true } = this.props
    return (
      <>
        <DragIndicatorIcon
          style={{ color: "#D9D9D9", transform: "translateX(5px)" }}
        />
        {
          editable ? ( <Dropdown isOpen={openDropDown} toggle={this.toggle}>
            <DropdownToggle
              data-toggle="dropdown"
              tag="div"
              aria-expanded={openDropDown}
            >
              <IconButton
                color="primary"
                aria-label="Setting"
                component="span"
                className="setting_icon"
                fontSize="large"
                style={{ color: "rgba(0,0,0,0.5)" }}
                aria-haspopup="true"
              >
                <MoreVertIcon />
              </IconButton>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <div className="event-content" onClick={this.OnClickEditHandler}>
                  <ReactSVG className="mr-2" src={EditIcon} />
                  View/Edit Details
                </div>
              </DropdownItem>
              <DropdownItem>
                <div
                  className="event-content"
                  onClick={() => this.OnClickRemoveHandler()}
                >
                  <ReactSVG className="mr-2" src={TrashIcon} />
                  Delete Order
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>) : null
        }
        <CustomInput
          type="checkbox"
          id={`customRadio${index}`}
          name={`customRadio${index}`}
          checked={isChecked}
          onChange={this.onChangeCheckBox.bind(this)}
        />
        {this.state.isOpenDeleteModal && (
          <DeleteOrderBankConfirmation
            isOpen={true}
            onDelete={this.deleteOrder.bind(this)}
            onCancel={() => this.setState({ isOpenDeleteModal: false })}
          />
        )}
        {this.state.isOpenEditModal && (
          <EditOrderBankModal
            open={true}
            onCancel={() => this.setState({ isOpenEditModal: false })}
          />
        )}
      </>
    )
  }
}
class index extends Component {
    constructor(props) {
        super(props);
        this.state={
            fixedHeaders:['name'],
            filterData: {},
            selectedAllItem:false,
            expandSearch:false,
            dataSource: props.dataSource,
            searchText:"",
            DNStatus: {
              data:{},
              isOpenConfirmModal:false
            },
            filterCondition: [],
            currentSort: {
              key: null,
              asc: false,
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(!isEqual(nextProps.dataSource,this.props.dataSource)){
          let data = {}
          const { dataSource } = nextProps
          nextProps.tableColumns.forEach((v)=>{
              data[v] = []
              dataSource.forEach((a)=>{
                  if(isArray(a[v])){
                      data[v] = [ ...data[v],...a[v]]
                  }
                  else{
                      data[v].push(a[v])
                  }
              })
              data[v] = [...new Set(data[v])]
          })
          this.setState({ dataSource: nextProps.dataSource,filterData:data })
        }
    }

    onSearchTextChange(e) {
      this.setState({searchText:e.target.value})
    }

    applyExpandSearchHandler = () =>{
      let { searchText } = this.state
      const { dataSource } = this.props
      let newData = [...dataSource].filter((e)=>e.notes.includes(searchText))
      this.setState({ dataSource : newData })

    }

    onSorting(col) {
      let newDataSource = [...this.state.dataSource]
      let newSort = { ...this.state.currentSort }
      if (newSort.key === col) {
        newSort.asc = !newSort.asc
      } else {
        newSort = { key: col, asc: true }
      }
      newDataSource = newDataSource.sort((a, b) => {
        if (a[col] < b[col]) {
          return newSort.asc ? -1 : 1;
        }
        if (a[col] > b[col]) {
          return newSort.asc ? 1 : -1;
        }
        return 0;
      })
      this.setState({ dataSource: newDataSource, currentSort: newSort })
    }

    headerTableConfiguration = () => {
        const { fixedHeaders, filterData, expandSearch, searchText  } = this.state
        return this.props.tableColumns.map(v => {
          return v != "notes" ? (
            <th>
              <span onClick={() => this.onSorting(v)}>
                {tableMapping[v].label.toUpperCase()}
              </span>
              <Filter
                dataFilter={filterData}
                dataKey={v}
                handleClickReset={this.ResetDataFilterHandler}
                handleClickApply={this.ApplyFilterHandler}
              />
              {v === "priority" ? (
                <span
                  className="header-expand"
                  onClick={() => this.setState({ expandSearch: !expandSearch })}
                >
                  {expandSearch ? (
                    <RemoveCircleOutlineOutlinedIcon />
                  ) : (
                    <AddCircleOutlineIcon />
                  )}
                </span>
              ) : null}
            </th>
          ) : (
            expandSearch && (
              <th>
                <div className="position-relative rts-search">
                  <Input
                    placeholder="Search"
                    onChange={this.onSearchTextChange.bind(this)}
                    defaultValue={searchText}
                    style={{
                      fontFamily: "Museo Sans",
                    }}
                  />
                  <img
                    className="position-absolute search-icon"
                    src={searchIcon}
                    alt="search"
                    onClick={this.applyExpandSearchHandler}
                  />
                </div>
              </th>
            )
          )
        })
      }

    bodyTableConfiguration = (data, isDragging = false) => {
        const { dataSource } = this.state
        if (isDragging) {
          return <td>
            <table>
              <tbody>
              {dataSource.map(e => {
                return  e.isChecked && <tr className="bg-white" style={{zIndex: 99}}>
                  {this.RenderTRComponent(e)}
                </tr>
              })}
              </tbody>
            </table>
          </td>
        }
        return this.RenderTRComponent(data)
    }
    RenderTRComponent = (data) => {
      const { expandSearch } = this.state
      return this.props.tableColumns.map((v)=> {
        let typeOfColumn = tableMapping[v].type
        let result;
        switch (typeOfColumn) {
          case "priority_type":
            result = <td>{data[v] && data[v].map((e)=>{
              return (<span className={`circle ${e}`}>{e}</span>)})}
            </td>
            break
          case "dn_status":
            result = <td>{data[v] && data[v].map((e)=>{
              return (<span className={`status ${e}`} onClick={this.DNStatusOnClickHandler.bind(this,data,e)}>{e}</span>)})}
            </td>
            break
          default:
            result =  <td>{data[v]}</td>;
            break
        }
        return (v != "notes" || expandSearch) && result
      })
    }

    OnDeleteRecords = async(allData) => {
      const { onGetDeleteOrderBankDetail } = this.props
      await onGetDeleteOrderBankDetail(allData.name)
    }

    DataOfTableFixed = () => {
        const { dataSource } = this.state
        return dataSource.map((v,i)=>{
            return <tr key={i} className={v.isChecked ? "selected-row" : "bg-white"}>
                <th>
                  <TableGroupEvent index={i} allData={v} isChecked={v.isChecked} Onchange={this.OnChangeCheckBoxHandler} deleteRecords={this.OnDeleteRecords} />
                </th>
           </tr>
        })
    }

    ChangeFilterCondition = (newFilterCondition) => {
      const { dataSource } = this.props
      const newData = dataSource.filter(item =>
        newFilterCondition.every(condition => {
          if (condition.key === "dn_status" ||  condition.key === "priority") {
            return isArray(item[condition.key]) && item[condition.key].some(e => condition.data.includes(e))
          } else if (condition.key === "remarks") {
            // TODO update remarks logic when filter component updated
            return true
          } else {
            return condition.data.includes(item[condition.key])
          }
        })
      )
      this.setState({ dataSource: newData, filterCondition: newFilterCondition })
    }

    ResetDataFilterHandler = (key) => {
      const { filterCondition } = this.state
      const index = filterCondition.findIndex(e => e.key === key)
      let newFilterCondition = [...filterCondition]
      if (index >= 0) {
        newFilterCondition.splice(index, 1)
      }
      this.ChangeFilterCondition(newFilterCondition)
    }


    ApplyFilterHandler = (data, key) => {
      const { dataSource } = this.props
      if (!dataSource) {
        return
      }
      const newFilterCondition = [...this.state.filterCondition]
      const index = newFilterCondition.findIndex(e => e.key === key)
      if (index >= 0) {
        newFilterCondition[index] = { key, data }
      } else {
        newFilterCondition.push({ key, data })
      }
      this.ChangeFilterCondition(newFilterCondition)
    }

    OnChangeCheckBoxHandler = ( status, i) =>{
        const { dataSource } = this.state
        const { updateOrderBankTableData } = this.props
        let data = [...dataSource]
        data[i].isChecked = status
        let temp = data.filter((v)=>v.isChecked)
        updateOrderBankTableData(data)
        this.setState({ dataSource:data,selectedAllItem : temp.length == data.length ? true :false   })
        let checkedData = [];
        data.map((item, index)=>{
          if(item.isChecked === true){
            checkedData.push(item);
          }
        })
        let checkCross = checkedData.filter((v)=>(v.product_category === "ASR" || v.product_category === "SMP"))
        this.props.enabledCross(checkCross.length);
    }

    OnSelectedAllItems = () =>{
        const { selectedAllItem, dataSource } = this.state
        const { updateOrderBankTableData } = this.props
        // const { dataSource } = this.props
        let data = [...dataSource]
        data = data.map((v)=>{
            return { ...v,isChecked:selectedAllItem ? false : true }
        })
        this.setState({ selectedAllItem:!selectedAllItem, dataSource:data })
        updateOrderBankTableData(data)
    }

    DNStatusOnClickHandler( data, key ){
      if(key === 'Send For DN'){
        this.setState({ DNStatus: { isOpenConfirmModal:true,data }})
      }
    }

    //DN-Status
    onSendRequestOnDNStatusHandler(){
      const { DNStatus } = this.state
      const { onSendDNStatusRequest } = this.props
      onSendDNStatusRequest(DNStatus.data)
      this.setState({DNStatus: { isOpenConfirmModal:false }})
    }

    getStyle(style, snapshot) {
      if (!snapshot.isDropAnimating) {
        return style;
      }
      return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.001s`,
      };
    }

    render() {
        const { selectedAllItem, expandSearch, DNStatus } = this.state
        const { dataSource } = this.state
        return (
          <div className="rts-table-container scroll" id="scrollableDiv">
              <div className="container-orderbank" style={{ maxWidth: "100%" }}>
                  {dataSource.length ? (<table className="fixed">
                      <thead>
                      <tr>
                          <th>
                              <img src={selectedAllItem ? selectAllIcon2 : selectAllIcon}
                                   className={"header-select-icon"} onClick={this.OnSelectedAllItems} alt="icon" />
                          </th>
                      </tr>
                      </thead>
                      <tbody>
                      {this.DataOfTableFixed()}
                      </tbody>
                  </table>):null}
                  <div className="scroll">
                    {/* <DragDropContext onDragEnd={(r) => console.log(r)}> */}
                      <Droppable droppableId="order-bank-table" isDropDisabled={true}>
                        {provided => (
                            <table {...provided.droppableProps} ref={provided.innerRef} className={`scrollable ${!dataSource.length ? 'bd-left' : '' }`}>
                              <thead>
                              <tr>{this.headerTableConfiguration()}</tr>
                              </thead>
                              <tbody>
                              {
                                dataSource && dataSource.length ? dataSource.map((v, index) => {
                                    return (
                                      <Draggable isDragDisabled={!v.isChecked} key={v.id} draggableId={index.toString()} index={index}>
                                        {(provided, snapshot) => (
                                          <>
                                            <tr
                                              className={`${v.isChecked && !snapshot.isDragging ? "selected-row" : ""} ${snapshot.isDragging ? "tr-dragging" : ""}`}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={this.getStyle(provided.draggableProps.style, snapshot)}
                                            >
                                              {this.bodyTableConfiguration(v, snapshot.isDragging)}
                                            </tr>
                                            {snapshot.isDragging && (
                                              <tr className={`${v.isChecked ? "selected-row" : "bg-white"}`}>
                                                {this.bodyTableConfiguration(v)}
                                              </tr>
                                            )}
                                          </>
                                        )
                                        }
                                      </Draggable>
                                    )
                                  }) :
                                  (<tr><td colSpan={18} className={'rts-table-nodata'}>
                                    <div>
                                      <img
                                        src={NoDataIcon}
                                        alt="No Data"
                                      />
                                    </div>
                                  </td></tr>)
                              }
                              </tbody>
                            </table>
                          )
                        }
                      </Droppable>
                    {/* </DragDropContext> */}
                  </div>
              </div>
              { DNStatus.isOpenConfirmModal && (
                <ConfirmDNStatusModal
                isOpen={DNStatus.isOpenConfirmModal}
                onSend={this.onSendRequestOnDNStatusHandler.bind(this)}
                onCancel={() => this.setState({ DNStatus: { isOpenConfirmModal:false }} )}
                headerContent = {`Send for DN`}
                bodyContent = {`Are you sure you want to send this order for DN Creation?`}
                />
                )
              }
          </div>
    )
  }
}

index.propTypes = {
  tableColumns:PropTypes.array.isRequired,
}
const mapDispatchToProp = dispatch => ({
  updateOrderBankTableData: payload => dispatch(updateOrderBankTableData(payload)),
  onGetDeleteOrderBankDetail: params => dispatch(deleteOrderBankDetail(params)),
  onSendDNStatusRequest: params => dispatch(sendDNStatusRequest(params)),
})
export default connect(null, mapDispatchToProp)(index)
