import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Filter from "components/Common/FilterDropdown"
import { tableMapping } from "./tableMapping"
import {
  CustomInput,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import RemoveCircleOutlineOutlinedIcon from "@material-ui/icons/RemoveCircleOutlineOutlined"
import { IconButton } from "@material-ui/core"
import selectAllIcon from "assets/images/AWSM-Select-all-Checkbox.svg"
import selectAllIcon2 from "assets/images/AWSM-Checked-box.svg"
import searchIcon from "assets/images/AWSM-search.svg"
import { ReactSVG } from "react-svg"
import "./index.scss"
import EditIcon from "assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "assets/images/AWSM-Trash-Icon.svg"
import NoDataIcon from "assets/images/AWSM-No-Data-Available.svg"
import DeleteOrderBankConfirmation from "../deleteOrderBankModal"
import EditOrderBankModal from "../EditOrderBankModal/index"
import ConfirmDNStatusModal from "./confirmDNStatusModal"
import {
  deleteOrderBankDetail,
  sendDNStatusRequest,
  updateOrderBankTableData,
  viewOrderBankDetail,
  getRTSOrderBankTableData,
  dragOrderBankToGanttChart,
  onDragOrderToShipment,
} from "store/actions"
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd"
import InfiniteScroll from "react-infinite-scroll-component"
import AWSMAlert from "components/Common/AWSMAlert"
import { transformObjectToStringSentence } from "pages/DQM/Common/helper"
import { format } from "date-fns"

import CircularLoader from "components/Common/Loader/CircularLoader"

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

  getEditCancel = (type, val = "") => {
    this.setState({ isOpenEditModal: false })
    this.props.editAlert(type, val)
  }

  OnClickEditHandler = () => {
    this.setState({ isOpenEditModal: !this.state.isOpenEditModal })
    this.props.viewRecords(this.props.allData)
  }

  OnClickRemoveHandler = () => {
    this.setState({ isOpenDeleteModal: true })
  }

  onChangeCheckBox(e) {
    const { Onchange, index } = this.props
    Onchange(e.target.checked, index)
  }

  deleteOrder = async () => {
    this.setState({ isOpenDeleteModal: false })
    this.props.deleteRecords(this.props.allData)
  }

  render() {
    const { openDropDown } = this.state
    const { index, isChecked, editable = true } = this.props
    return (
      <>
        <DragIndicatorIcon style={{ color: "#D9D9D9", transform: "translateX(5px)" }} />
        {editable ? (
          <Dropdown isOpen={openDropDown} toggle={this.toggle}>
            <DropdownToggle data-toggle="dropdown" tag="div" aria-expanded={openDropDown}>
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
                <div className="event-content" onClick={() => this.OnClickRemoveHandler()}>
                  <ReactSVG className="mr-2" src={TrashIcon} />
                  Delete Order
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : null}
        <CustomInput
          type="checkbox"
          id={`customRadio${index}`}
          name={`customRadio${index}`}
          checked={isChecked}
          onChange={this.onChangeCheckBox.bind(this)}
        />
        {this.state.isOpenDeleteModal && (
          <DeleteOrderBankConfirmation
            isOpen={this.state.isOpenDeleteModal}
            allData={this.props.allData}
            onDelete={this.deleteOrder.bind(this)}
            onCancel={() => this.setState({ isOpenDeleteModal: false })}
          />
        )}
        {this.state.isOpenEditModal && (
          <EditOrderBankModal
            open={this.state.isOpenEditModal}
            onCancel={this.getEditCancel}
            viewData={this.props.viewData}
            region={this.props.orderregion}
            terminal={this.props.orderterminal}
          />
        )}
      </>
    )
  }
}

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixedHeaders: ["name"],
      filterData: {},
      selectedAllItem: false,
      expandSearch: false,
      dataSource: props.dataSource,
      searchText: "",
      DNStatus: {
        data: {},
        isOpenConfirmModal: false,
      },
      filterCondition: [],
      currentPage: 1,
      showEditAlert: false,
      showEditMsg: "",
      callDelete: false,
      showDeleteMsg: "",
      showDelete: false,
      fieldToSort: "retail_storage_relation.retail",
      fieldSortDirection: "desc",
      showLoader: false,
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({ showLoader: false })
      this.setState({ dataSource: nextProps.dataSource, filterData: nextProps.headerFilters })
    }
    console.log('reload::', nextProps.reloadData, this.props.reloadData)
    if (nextProps.reloadData !== this.props.reloadData) {
      this.setState({ showLoader: this.props.reloadData })
    }
  }

  onSearchTextChange(e) {
    this.setState({ searchText: e.target.value })
  }

  applyExpandSearchHandler = () => {
    let { searchText } = this.state
    const { dataSource } = this.props
    let newData = [...dataSource].filter(e => e.notes.includes(searchText))
    this.setState({ dataSource: newData })
  }

  onSorting(col) {
    const { fieldSortDirection, fieldToSort } = this.state
    const { fieldSortDirectionHandler, fieldToSortHandler } = this.props
    if (col === fieldToSort && fieldSortDirection === "asc") {
      fieldSortDirectionHandler("desc")
      this.setState({ fieldSortDirection: "desc" })
    } else if (col === fieldToSort && fieldSortDirection === "desc") {
      fieldSortDirectionHandler("asc")
      this.setState({ fieldSortDirection: "asc" })
    } else if (col !== fieldToSort) {
      fieldToSortHandler(col)
      this.setState({ fieldToSort: col })
    }
  }

  headerTableConfiguration = () => {
    const { filterData, expandSearch, searchText } = this.state
    return this.props.tableColumns.map(v => {
      return v != "notes" ? (
        <th>
          <span onClick={() => this.onSorting(v)}>{tableMapping[v]?.label.toUpperCase()}</span>
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
              {expandSearch ? <RemoveCircleOutlineOutlinedIcon /> : <AddCircleOutlineIcon />}
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
      return (
        <td>
          <table>
            <tbody>
              {dataSource.map(e => {
                return (
                  e.isChecked && (
                    <tr className="bg-white" style={{ zIndex: 99 }}>
                      {this.RenderTRComponent(e)}
                    </tr>
                  )
                )
              })}
            </tbody>
          </table>
        </td>
      )
    }
    return this.RenderTRComponent(data)
  }

  RenderTRComponent = data => {
    const { expandSearch } = this.state

    return this.props.tableColumns.map(v => {
      let typeOfColumn = tableMapping[v]?.type
      let result
      switch (typeOfColumn) {
        case "priority_type":
          result = (
            <td>
              {_.isArray(data[v]) &&
                data[v].map(e => {
                  return <span className={`circle ${e}`}>{e}</span>
                })}
            </td>
          )
          break
        case "dn_status":
          result = (
            <td>
              {
                <span
                  className={`status ${
                    data["dn_status"] === "Clean DN"
                      ? "clean"
                      : data["dn_status"] === "Blocked DN"
                      ? "blocked"
                      : data["dn_status"] === "Late Unblock"
                      ? "unblock"
                      : "send"
                  }`}
                  onClick={this.DNStatusOnClickHandler.bind(this, data, data[v])}
                >
                  {data["dn_no"] === "" || data["dn_no"] === null ? "Send for DN" : data[v]}
                </span>
              }
            </td>
          )
          break
        case "date":
          result = (
            <td>
              <div className="custom-td-overflow">
                {data[v] ? format(new Date(data[v].toString()), "dd-MM-yyyy HH:mm") : ""}
              </div>
            </td>
          )
          break
        default:
          result = (
            <td>
              <div className="custom-td-overflow">{data[v]}</div>
            </td>
          )
          break
      }
      return (v != "notes" || expandSearch) && result
    })
  }

  OnDeleteRecords = async allData => {
    this.setState({ showLoader: true })
    const { onGetDeleteOrderBankDetail } = this.props
    await onGetDeleteOrderBankDetail(allData.id)
    // setTimeout(function(){  this.setState( prevState => ({ callDelete: true })); }, 1000);
    await this.setState({ callDelete: true })
  }

  CallTable = async () => {
    const { getRTSOrderBankTableData, payloadFilter } = this.props
    const { fieldSortDirection, fieldToSort } = this.state
    if ((await this.props.deleteSuccess) !== undefined && this.state.callDelete === true) {
      if (this.props.deleteSuccess === true) {
        setTimeout(async function () {
          await getRTSOrderBankTableData({
            limit: 10,
            page: payloadFilter.currentPage,
            search_fields: "*",
            q: transformObjectToStringSentence(payloadFilter.filterQuery),
            sort_dir: fieldSortDirection,
            sort_field: fieldToSort,
            filter: payloadFilter.filterOrderBank,
          })
        }, 2000)
        await this.setState({ callDelete: false })
        await this.setState({
          showDeleteMsg: this.props.deleteSuccess === true ? "success" : "error",
        })
        await this.setState({ showDelete: true })
      }
    }
  }

  OnViewRecords = async allData => {
    const { onGetViewOrderBankDetail } = this.props
    await onGetViewOrderBankDetail(allData.id)
  }

  editAlert = async (type, val = "") => {
    type === "edit" && this.setState({ showEditAlert: true })
    val !== "" ? this.setState({ showEditMsg: val }) : this.setState({ showEditAlert: "" })
    if (type === "edit") {
      this.setState({ showLoader: true })
      const { getRTSOrderBankTableData, payloadFilter } = this.props
      const { fieldSortDirection, fieldToSort } = this.state

      setTimeout(async function () {
        await getRTSOrderBankTableData({
          limit: 10,
          page: payloadFilter.currentPage,
          search_fields: "*",
          q: transformObjectToStringSentence(payloadFilter.filterQuery),
          sort_dir: fieldSortDirection,
          sort_field: fieldToSort,
          filter: payloadFilter.filterOrderBank,
        })
      }, 2000)
    }
  }

  DataOfTableFixed = () => {
    const { dataSource } = this.state
    return dataSource.map((v, i) => {
      return (
        <tr key={i} className={v.isChecked ? "selected-row" : "bg-white"}>
          <th>
            <TableGroupEvent
              index={i}
              allData={v}
              isChecked={v.isChecked}
              Onchange={this.OnChangeCheckBoxHandler}
              deleteRecords={this.OnDeleteRecords}
              viewRecords={this.OnViewRecords}
              editAlert={this.editAlert}
              viewData={this.props.viewData}
              orderregion={this.props.orderregion}
              orderterminal={this.props.orderterminal}
            />
          </th>
        </tr>
      )
    })
  }

  ResetDataFilterHandler = key => {
    const { filterApplyHandler } = this.props
    filterApplyHandler(key, "remove")
  }

  ApplyFilterHandler = (data, key) => {
    const { filterApplyHandler } = this.props
    const tempObj = {}
    tempObj[key] = data
    filterApplyHandler(tempObj, "insert")
  }

  OnChangeCheckBoxHandler = (status, i) => {
    const { dataSource } = this.state
    const { updateOrderBankTableData } = this.props
    let data = [...dataSource]
    data[i].isChecked = status
    let temp = data.filter(v => v.isChecked)
    updateOrderBankTableData(data)
    this.setState({
      dataSource: data,
      selectedAllItem: temp.length == data.length ? true : false,
    })
    let checkedData = []
    data.map((item, index) => {
      if (item.isChecked === true) {
        checkedData.push(item)
      }
    })
    let deleteEnable = checkedData //checkedData.filter((v) => (v.scheduling_status === "Unscheduled"))

    let checkCross = checkedData.filter(v => v.order_type === "ASR" || v.order_type === "SMP")
    let unvalidCheckCross = checkedData.filter(v => v.order_type === "" || v.order_type === null)

    this.props.enabledCross(unvalidCheckCross.length > 0 ? 0 : checkCross.length)
    this.props.deleteEnable(deleteEnable)
  }

  OnSelectedAllItems = () => {
    const { selectedAllItem, dataSource } = this.state
    const { updateOrderBankTableData } = this.props
    // const { dataSource } = this.props
    let data = [...dataSource]
    data = data.map(v => {
      return { ...v, isChecked: selectedAllItem ? false : true }
    })
    this.setState({ selectedAllItem: !selectedAllItem, dataSource: data })
    updateOrderBankTableData(data)
  }

  DNStatusOnClickHandler(data, key) {
    if (data.dn_no === "" || data.dn_no === null) {
      this.setState({ DNStatus: { isOpenConfirmModal: true, data } })
    }
  }

  //DN-Status
  onSendRequestOnDNStatusHandler() {
    const { DNStatus } = this.state
    const { onSendDNStatusRequest } = this.props
    onSendDNStatusRequest(DNStatus.data)
    this.setState({ DNStatus: { isOpenConfirmModal: false } })
    // if(this.props.sendDn){
    this.setState({ showSendDN: true })
    // }
  }

  getStyle(style, snapshot) {
    if (!snapshot.isDropAnimating) {
      return style
    }
    return {
      ...style,
      // cannot be 0, but make it super tiny
      transitionDuration: `0.001s`,
    }
  }

  handleInfiniteScrolling() {
    const { currentPage, onChangeCurrentPage } = this.props
    onChangeCurrentPage()
  }

  onDragEnd() {
    const { dragOrderBankToGanttChart, payloadFilter, activeTab, dragOrderToShipment } = this.props
    if (activeTab === "1") {
      dragOrderBankToGanttChart({
        shift_date: payloadFilter?.filterOrderBank?.shift_date?.date_from,
      })
    } else {
      dragOrderToShipment()
    }
  }

  render() {
    this.props.deleteSuccess !== undefined && this.CallTable() //setTimeout(function(){  }, 1000);
    const { selectedAllItem, expandSearch, DNStatus } = this.state
    const { dataSource } = this.state
    const { totalRow } = this.props
    return (
      <div className="rts-table-container scroll" id="scrollableDiv">
        <InfiniteScroll
          next={this.handleInfiniteScrolling.bind(this)}
          hasMore={this.props.dataSource?.length < totalRow}
          loader={<h5>Loading...</h5>}
          dataLength={dataSource.length}
          height={430}
        >
          <div className="container-orderbank" style={{ display: "flex" }}>
            {dataSource.length && this.state.showLoader === false ? (
              <table className="fixed">
                <thead>
                  <tr style={{ zIndex: 2 }}>
                    <th>
                      <img
                        src={selectedAllItem ? selectAllIcon2 : selectAllIcon}
                        className={"header-select-icon"}
                        onClick={this.OnSelectedAllItems}
                        alt="icon"
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>{this.DataOfTableFixed()}</tbody>
              </table>
            ) : null}
            <div className="scroll">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="order-bank-table" isDropDisabled={true}>
                  {provided => (
                    <table
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`scrollable ${!dataSource.length ? "bd-left" : ""}`}
                    >
                      <thead>
                        <tr>{this.headerTableConfiguration()}</tr>
                      </thead>
                      <tbody>
                        {(this.state.showLoader === true) ? 
                       <tr>
                       <td colSpan={18} className={"rts-table-nodata"}>
                         <div>
                           <CircularLoader />
                         </div>
                       </td>
                     </tr>
                      : (dataSource && dataSource.length) ? (
                          dataSource.map((v, index) => {
                            return (
                              <Draggable
                                isDragDisabled={!v.isChecked}
                                key={v.id}
                                draggableId={index.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <>
                                    <tr
                                      className={`${
                                        v.isChecked && !snapshot.isDragging ? "selected-row" : ""
                                      } ${snapshot.isDragging ? "tr-dragging" : ""}`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={this.getStyle(provided.draggableProps.style, snapshot)}
                                    >
                                      {this.bodyTableConfiguration(v, snapshot.isDragging)}
                                    </tr>
                                    {snapshot.isDragging && (
                                      <tr
                                        className={`${v.isChecked ? "selected-row" : "bg-white"}`}
                                      >
                                        {this.bodyTableConfiguration(v)}
                                      </tr>
                                    )}
                                  </>
                                )}
                              </Draggable>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan={18} className={"rts-table-nodata"}>
                              <div>
                                <img src={NoDataIcon} alt="No Data" />
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </InfiniteScroll>
        {DNStatus.isOpenConfirmModal && (
          <ConfirmDNStatusModal
            isOpen={DNStatus.isOpenConfirmModal}
            onSend={this.onSendRequestOnDNStatusHandler.bind(this)}
            onCancel={() => this.setState({ DNStatus: { isOpenConfirmModal: false } })}
            headerContent={`Send for DN`}
            bodyContent={`Are you sure you want to send this order for DN Creation?`}
          />
        )}
        {this.state.showEditAlert && (
          <AWSMAlert
            status={this.state.showEditMsg}
            message={
              this.state.showEditMsg === "success"
                ? "Record successfully updated"
                : "Order update failed"
            }
            openAlert={this.state.showEditAlert}
            closeAlert={() => this.setState({ showEditAlert: false })}
          />
        )}
        {this.state.showSendDN && (
          <AWSMAlert
            status="success"
            message="An order has been successfully sent for DN Creation"
            openAlert={this.state.showSendDN}
            closeAlert={() => this.setState({ showSendDN: false })}
          />
        )}
        {this.state.showDelete && (
          <AWSMAlert
            status={this.state.showDeleteMsg}
            message={
              this.state.showDeleteMsg === "success"
                ? "An Order has been successfully deleted from Order Bank"
                : "An Order has not been deleted from Order Bank"
            }
            openAlert={this.state.showDelete}
            closeAlert={() => this.setState({ showDelete: false })}
          />
        )}
      </div>
    )
  }
}

index.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  filterApplyHandler: PropTypes.func.isRequired,
}
const mapDispatchToProp = dispatch => ({
  updateOrderBankTableData: payload => dispatch(updateOrderBankTableData(payload)),
  onGetDeleteOrderBankDetail: params => dispatch(deleteOrderBankDetail(params)),
  getRTSOrderBankTableData: params => dispatch(getRTSOrderBankTableData(params)),
  onSendDNStatusRequest: params => dispatch(sendDNStatusRequest(params)),
  onGetViewOrderBankDetail: params => dispatch(viewOrderBankDetail(params)),
  dragOrderBankToGanttChart: payload => dispatch(dragOrderBankToGanttChart(payload)),
  dragOrderToShipment: () => dispatch(onDragOrderToShipment()),
})
const mapStateToProps = ({ orderBank }) => ({
  totalRow: orderBank.totalRow,
  viewData: orderBank.viewData,
  deleteSuccess: orderBank.deleteSuccess,
  sendDn: orderBank.sendDn,
})
export default connect(mapStateToProps, mapDispatchToProp)(index)
