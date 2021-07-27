import React, { Component, Fragment } from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap"
import "./index.scss"
import DetailsTab from "./detailsTab"
import SalesTab from "./salesTab"
import InventoryTab from "./inventoryTab"
import DeliveryTab from "./deliveryTab"
import {
  getDetailsSales,
} from "../../../../store/salesAndInventory/actions"
import { connect } from "react-redux"
import CloseButton from "../../../../components/Common/CloseButton"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation"

class SalesAndInventoryTableInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
      isConfirm: false,
      updateSuccess: false,
      data: props.currentSalesAndInventory,
    }

    this.handleEvent = this.handleEvent.bind(this)
  }
  onConfirmCancel = () => {
    this.setState({ isConfirm: false })
  }

  onConfirmExit = () => {
    this.setState({ isConfirm: false })
    if (this.props.onCancel()) {
      this.props.onCancel()
    }
  }

  componentDidMount() {
    const {
      onGetSalesAndInventoryDetail,
      currentSalesAndInventory,
    } = this.props
    if (onGetSalesAndInventoryDetail()) {
      this.setState({
        data: currentSalesAndInventory,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler()
    }
  }

  componentWillUnmount() { }

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() { }

  // Class Properties (Stage 3 Proposal)
  handler = () => {
    this.setState()
  }

  render() {
    const { onCancel, visible, onUpdateSalesAndInventoryModal } = this.props

    const { activeTab, data } = this.state

    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }

    const onFieldValueChange = (fieldName, value) => {
      const newData = { ...data }
      newData[fieldName] = value
      this.setState({ data: newData })
    }

    const handleUpdate = event => {
      e.preventDefault()
      onUpdateSalesAndInventoryDetail(data)
      this.onConfirmExit()
    }

    return (
      <>
        <Modal
          isOpen={visible}
          className="commercial-customer-modal modal-lg"
        >
          <ModalHeader close={<CloseButton
            handleClose={() => this.setState({ isConfirm: true })}
          />}
          >
            <span className="modal-title">Record ID: 123456789</span>
            <span className="date-sub-title">| Date: 12 Mar 2021</span>
            <span className="last-updated-sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
          </ModalHeader>

          <ModalBody>
            {this.state.isConfirm && (
              <ExitConfirmation
                onExit={this.onConfirmExit}
                onCancel={this.onConfirmCancel}
              />
            )}
            <Fragment>
              <div>
                <Nav pills justified>
                  <NavItem>
                    <NavLink className={activeTab === "1" ? "active" : null}
                      onClick={() => {
                        toggle("1")
                      }}>
                      <span>Details</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "2" ? "active" : null}
                      onClick={() => {
                        toggle("2")
                      }}>
                      <span>Sales</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "3" ? "active" : null}
                      onClick={() => {
                        toggle("3")
                      }}>
                      <span>Inventory</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className={activeTab === "4" ? "active" : null}
                      onClick={() => {
                        toggle("4")
                      }}>
                      <span>Delivery</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div className="simple-bar-sale">
                      <DetailsTab
                        data={data?.details}
                        onChange={onFieldValueChange}
                      />
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="simple-bar-sale">
                      <SalesTab
                        data={data?.sales}
                        onChange={onFieldValueChange}
                      />
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="simple-bar-sale">
                      <InventoryTab
                        data={data?.inventory}
                        onChange={onFieldValueChange}
                      />
                    </div>
                  </TabPane>
                  <TabPane tabId="4">
                    <div className="simple-bar-sale">
                      <DeliveryTab
                        data={data?.delivery}
                        onChange={onFieldValueChange}
                      />
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </Fragment>
          </ModalBody>
          <ModalFooter>
            <div className="d-flex align-items-center justify-content-end mt-4 mb-4 px-4">
              <button
                className="btn btn-outline-primary px-4"
                onClick={() => this.setState({ isConfirm: true })}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary ml-4 px-4"
                onClick={e => handleUpdate(e)}
              >
                Update
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ saleAndInventory }) => ({
  currentSalesAndInventory: saleAndInventory?.currentSalesAndInventory,
  isUpdateSuccess: saleAndInventory.currentSalesAndInventory?.isUpdateSuccess,
})

const mapDispatchToProps = dispatch => ({
  onGetSalesAndInventoryDetail: params => dispatch(getDetailsSales(params)),
  onUpdateSalesAndInventoryDetail: params =>
    dispatch(updateSalesAndInventoryDetail(params)),
  onResetSalesAndInventoryDetail: () =>
    dispatch(resetCurrentSalesAndInventoryData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesAndInventoryTableInformation)
