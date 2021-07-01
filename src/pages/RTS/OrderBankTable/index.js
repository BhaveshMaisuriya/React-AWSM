import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import Filter from "../../../components/Common/DataTable/filter"
import { tableColumns, tableMapping } from "./tableMapping"
import {
  CustomInput,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
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
import { isEqual } from "lodash"

class TableGroupEvent extends React.Component {
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

  deleteOrder = () => {
    this.setState({ isOpenDeleteModal: false })
  }

  render() {
    const { openDropDown } = this.state
    const { index, isChecked } = this.props
    return (
      <>
        <DragIndicatorIcon
          style={{ color: "#D9D9D9", transform: "translateX(5px)" }}
        />
        <Dropdown isOpen={openDropDown} toggle={this.toggle}>
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
                onClick={this.OnClickRemoveHandler}
              >
                <ReactSVG className="mr-2" src={TrashIcon} />
                Delete Order
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
            filterData:null,
            selectedAllItem:false,
            expandSearch:false,
            dataSource: props.dataSource,
        }
    }

    componentWillReceiveProps(nextProps){
        if(!isEqual(nextProps.dataSource,this.props.dataSource)){
          let data = {}
          const { dataSource } = nextProps
          tableColumns.forEach((v)=>{
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

    onSearchTextChange(e) {}

    headerTableConfiguration = () => {
        const { fixedHeaders, filterData, expandSearch } = this.state
        return tableColumns.map(v => {
          return v != "search" ? (
            <th>
              {tableMapping[v].label.toUpperCase()}
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
                    style={{
                      fontFamily: "Museo Sans",
                    }}
                  />
                  <img
                    className="position-absolute search-icon"
                    src={searchIcon}
                    alt="search"
                  />
                </div>
              </th>
            )
          )
        })
      }

    bodyTableConfiguration = (data) => {
        const { fixedHeaders, filterData, expandSearch } = this.state
        return tableColumns.map((v)=> {
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
                        return (<span className={`status ${e}`}>{e}</span>)})}
                            </td>
                             break
                default:
                    result =  <td>{data[v]}</td>;
                    break
            }
            return (v != "search" || expandSearch) && result
        })
    }

    DataOfTableFixed = () => {
        const { dataSource } = this.state
        return dataSource.map((v,i)=>{
            return <tr key={i}>
                <th>
                <TableGroupEvent index={i} isChecked={v.isChecked} Onchange={this.OnChangeCheckBoxHandler}/>
                </th>
           </tr>
        })
    }


    ResetDataFilterHandler = column => {
        console.log(`reset:${column}`)
    }

    OnChangeCheckBoxHandler = ( status, i) =>{
        const { dataSource } = this.state
        let data = [...dataSource]
        data[i].isChecked = status
        let temp = data.filter((v)=>v.isChecked)
        this.setState({ dataSource:data,selectedAllItem : temp.length == data.length ? true :false   })
    }

    OnSelectedAllItems = () =>{
        const { selectedAllItem, dataSource } = this.state
        // const { dataSource } = this.props
        let data = [...dataSource]
        data = data.map((v)=>{
            return { ...v,isChecked:selectedAllItem ? false : true }
        })
        this.setState({ selectedAllItem:!selectedAllItem, dataSource:data })
    }

    render() {
        const { selectedAllItem, expandSearch } = this.state
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
                      <table className={`scrollable ${!dataSource.length ? 'bd-left' : '' }`}>
                          <thead>
                          <tr>{this.headerTableConfiguration()}</tr>
                          </thead>
                          <tbody>
                          {
                            dataSource && dataSource.length ? dataSource.map((v) => {
                              return <tr>{this.bodyTableConfiguration(v)}</tr>
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
                  </div>
              </div>
          </div>
    )
  }
}

index.propTypes = {}

export default index
