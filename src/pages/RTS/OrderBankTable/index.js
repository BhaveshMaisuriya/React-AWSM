import React, { Component } from "react"
import PropTypes from "prop-types"
import Filter from "../../../components/Common/DataTable/filter"
import { tableColumns, tableMapping, tempData } from "./tableMapping"
import {
  CustomInput,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DragIndicatorIcon from "@material-ui/icons/DragIndicator"
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox"
import { IconButton, Menu, MenuItem } from "@material-ui/core"
import "./index.scss"
import EditIcon from "../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../assets/images/AWSM-Trash-Icon.svg"
import DeleteNoteConfirmation from "../DeleteNoteConfirmation"
import EditOrderBankModal from "../EditOrderBankModal"

let orderBankSettings = [
  { value: "edit", label: "View/Edit Details", icon: EditIcon },
  { value: "delete", label: "Delete Order", icon: TrashIcon },
];

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixedHeaders: ["id"],
      filterData: {},
      dropdownOpen: [],
      isOpenDeleteModal: false,
      isOpenEditModal: false,
    }
  }

  componentDidMount = () => {
    let alldropdown = [...this.state.dropdownOpen];
    tempData.map((item, index)=>{
        alldropdown.push(false);
    })
    this.setState({ dropdownOpen: alldropdown });
  }

  headerTableConfiguration = () => {
    const { fixedHeaders, filterData } = this.state
    return tableColumns.map(v => {
      return (
        <th>
          {tableMapping[v].label.toUpperCase()}{" "}
          <Filter dataFilter={filterData} dataKey={fixedHeaders[0]} />
        </th>
      )
    })
  }

  toggle = (index) => {
    let alldropdown = [...this.state.dropdownOpen];
    alldropdown[index] = !alldropdown[index];
    this.setState({ dropdownOpen: alldropdown })
  }

  deleteOrder = () => {
    this.setState({isOpenDeleteModal: false})
  }

   onSettingClick = async(val, ) => {
      if(val === 'delete') {
        await this.setState({isOpenDeleteModal: true})
      } else {
        await this.setState({isOpenEditModal: true})
      }
  }

  bodyTableConfiguration = data => {
    return tableColumns.map(v => {
      let typeOfColumn = tableMapping[v].type
      switch (typeOfColumn) {
        case "priority_type":
          return (
            <td>
              {data[v] &&
                data[v].map(e => {
                  return <span className={`circle ${e}`}>{e}</span>
                })}
            </td>
          )
        case "dn_status":
          return (
            <td>
              {data[v] &&
                data[v].map(e => {
                  return <span className={`status ${e}`}>{e}</span>
                })}
            </td>
          )
        default:
          return <td>{data[v]}</td>
      }
    })
  }

  DataOfTableFixed = () => {
    return ["1", "2", "3", "4", "5", "6", "7"].map((v, index) => (
      <tr>
        <td style={{display: 'flex'}}>
          <DragIndicatorIcon style={{ color: "#D9D9D9" }} />
            <Dropdown
                isOpen={this.state.dropdownOpen[index]}
                toggle={() => this.toggle(index)}
            >
            <DropdownToggle
                data-toggle="dropdown"
                tag="div"
                aria-expanded={this.state.dropdownOpen[index]}
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
            <DropdownMenu
                left
                className="awsm-option-button-content"
            >
              {orderBankSettings.map((option, index) => (
                <div
                  className="d-flex align-items-center p-2 awsm-option-button-content-item order-setting-options  order-setting-options-left"
                  onClick={() => this.onSettingClick(option.value)}
                >
                  {option.icon && <img src={option.icon} />}
                  <div className="pl-2" key={index}>
                    {option.label}
                  </div>
                </div>
              ))}
            </DropdownMenu>
          </Dropdown>

          {
            <CustomInput
              type="checkbox"
              id={`customRadio${v}`}
              name={`customRadio${v}`}
            />
          }
        </td>
      </tr>
    ))
  }

  render() {
    return (
      <div className="rts-table-container">
        <div className="container-orderbank" style={{ maxWidth: "100%" }}>
          <table className="fixed">
            <thead>
              <tr>
                <th>
                  {" "}
                  <CustomInput
                    type="checkbox"
                    id="customRadio"
                    name="customRadio"
                  />
                </th>
              </tr>
            </thead>
            <tbody>{this.DataOfTableFixed()}</tbody>
          </table>
          <div className="scroll">
            <table className="scrollable">
              <thead>
                <tr>{this.headerTableConfiguration()}</tr>
              </thead>
              <tbody>
                {tempData.map(v => {
                  return <tr>{this.bodyTableConfiguration(v)}</tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.isOpenDeleteModal && 
            <DeleteNoteConfirmation
                isOpen={true}
                onDelete={this.deleteOrder.bind(this)}
                onCancel={() => this.setState({isOpenDeleteModal: false})}
            />
        }
        {this.state.isOpenEditModal && 
            <EditOrderBankModal
                open={true}
                onCancel={() => this.setState({isOpenEditModal: false})}
            />
        }
      </div>
    )
  }
}

index.propTypes = {}

export default index
