import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap"

import { isScheduler } from "../../../helpers/auth_helper"
import { getProductDetail, updateProductDetail } from "../../../store/actions"
import AddressTab from "./AddressTab"
import ContactTab from "./ContactTab"
import StatusTab from "./StatusTab"
import StorageTab from "./StorageTab"
import "./TerminalDetailModal.scss"
import classnames from "classnames"
import SimpleBar from "simplebar-react"

import {
  Col,
  Field,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"

class TerminalDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      modal: true,
      event: {},
      updateDictionary: {},
    }
  }

  componentDidMount() {
    const { onGetProductDetail, data } = this.props
    onGetProductDetail(data.product_code)
  }

  handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
      console.log(this.state.updateDictionary)
      const { productCode } = this.props.data
      this.props.onUpdateProductDetail({
        productCode,
        body: this.state.updateDictionary,
      })
    } else this.props.onCancel()
  }
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    const { activeTab } = this.state
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }
    const { onCancel, visible, currentProduct } = this.props
    const isDisabledField = isScheduler()
    return (
      <Modal isOpen={visible} className="table-information modal-lg">
        <ModalHeader toggle={this.toggleTI}>
          <span
            style={{
              height: "26px",
              color: "#000000",
              fontFamily: "Museo Sans",
              letterSpacing: "0",
              lineHeight: "26px",
            }}
          >
            Product Information
          </span>
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </ModalHeader>
        <>
          {currentProduct ? (
            <ModalBody>
              <div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label>TERMINAL CODE</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_code}
                      disabled={true}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label>TERMINAL NAME</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_name}
                      disabled={true}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group">
                    <label> REMARKS</label>
                    <input
                      placeholder="Type something here..."
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.remarks}
                      disabled={isDisabledField}
                      onChange={ev => {
                        this.setState({
                          updateDictionary: {
                            ...this.state.updateDictionary,
                            ...{ remarks: ev.target.value },
                          },
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
              <Nav pills justified>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggleTab("1")
                    }}
                  >
                    {/* <i className="bx bx-chat font-size-20 d-sm-none" /> */}
                    <span className="d-none d-sm-block">Address</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggleTab("2")
                    }}
                  >
                    {/* <i className="bx bx-group font-size-20 d-sm-none" /> */}
                    <span className="d-none d-sm-block">Storage</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggleTab("3")
                    }}
                  >
                    {/* <i className="bx bx-book-content font-size-20 d-sm-none" /> */}
                    <span className="d-none d-sm-block">Status</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "4",
                    })}
                    onClick={() => {
                      this.toggleTab("4")
                    }}
                  >
                    {/* <i className="bx bx-chat font-size-20 d-sm-none" /> */}
                    <span className="d-none d-sm-block">Contact</span>
                  </NavLink>
                </NavItem>
                <NavItem />
                <NavItem />
                <NavItem />
                <NavItem />
              </Nav>

              {/* tab content */}
              <TabContent activeTab={this.state.activeTab} className="py-4">
                <TabPane tabId="1">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <AddressTab />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="2">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <StorageTab />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="3">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <StatusTab />
                  </SimpleBar>
                </TabPane>
                <TabPane tabId="4">
                  <SimpleBar
                    style={{
                      height: "350px",
                      width: "100%",
                      overflowX: "hidden",
                    }}
                  >
                    <ContactTab />
                  </SimpleBar>
                </TabPane>
              </TabContent>
            </ModalBody>
          ) : null}
          <ModalFooter>
            <button className="btn-sec" onClick={() => onCancel()}>
              Cancel
            </button>
            {!isDisabledField && currentProduct ? (
              <Button onClick={this.handleUpdate.bind(this)} color="primary">
                Update
              </Button>
            ) : null}
          </ModalFooter>
        </>
      </Modal>
    )
  }
}

const mapStateToProps = ({ products }) => ({
  currentProduct: products.currentProduct,
  error: products.error,
  updateStatus: products.updateStatus,
})

const mapDispatchToProps = dispatch => ({
  onGetProductDetail: params => dispatch(getProductDetail(params)),
  onUpdateProductDetail: params => dispatch(updateProductDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TerminalDetailModal)
