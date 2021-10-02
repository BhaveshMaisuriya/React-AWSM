import React, { Component, Fragment } from "react"
import { format } from "date-fns"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane
} from "reactstrap"
import "./index.scss"
import DetailsTab from "./detailsTab"
import SalesTab from "./salesTab"
import InventoryTab from "./inventoryTab"
import DeliveryTab from "./deliveryTab"
import {
  getDetailsSales,
  updateSalesAndInventoryDetail
} from "../../../../store/salesAndInventory/actions"
import { connect } from "react-redux"
import { isScheduler } from "../../../../helpers/auth_helper"
import CloseButton from "../../../../components/Common/CloseButton"
import ExitConfirmation from "../../../../components/Common/ExitConfirmation"

class SalesAndInventoryTableInformation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
      isDataModified: false,
      isConfirm: false,
      updateSuccess: false,
      data: props.currentSalesAndInventory
    }

    // this.handleEvent = this.handleEvent.bind(this)
  }

  onConfirmCancel = () => {
    this.setState({ isConfirm: false })
  }

  onConfirmExit = () => {
    this.setState({ isConfirm: false, isDataModified: false })
    if (this.props.onCancel()) {
      this.props.onCancel()
    }
  }

  componentDidMount() {
    const { onGetSalesAndInventoryDetail, data: { trans_id: recordId } } = this.props
    /*
      dispatch action to run saga for calling api for getting detail of record.
     */
    if (recordId) {
      onGetSalesAndInventoryDetail(recordId)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentSalesAndInventory } = this.props
    const { currentSalesAndInventory: previousSalesAndInventory } = prevProps

    if (prevState.name !== this.state.name) {
      this.handler()
    }
    if (JSON.stringify(currentSalesAndInventory) !== JSON.stringify(previousSalesAndInventory)) {
      this.setState({
        data: currentSalesAndInventory
      })
    }
  }

  // Class Properties (Stage 3 Proposal)
  handler = () => {
    this.setState()
  }

  render() {
    const scheduler = isScheduler()
    const {
      visible,
      onUpdateSalesAndInventoryDetail,
      data: { trans_id: recordId },
      currentSalesAndInventory
    } = this.props
    const { activeTab, data, isConfirm } = this.state
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }

    const onFieldValueChange = (fieldName, value) => {
      const newData = { ...data }
      newData[fieldName] = value
      this.setState({ data: newData, isDataModified: true })
    }

    const handleUpdate = event => {
      event.preventDefault()
      if (data && currentSalesAndInventory && recordId) {
        const {
          updated_at: prev_updated_at,
          updated_by: prev_updated_by,
          ...preValue
        } = currentSalesAndInventory
        const { updated_at, updated_by, ...updateValue } = data
        const uploadData = {
          updateValue,
          preValue
        }
        onUpdateSalesAndInventoryDetail(recordId, uploadData)
      }
      this.onConfirmExit()
    }

    const handleExitConfirmation = () => {
      return this.state.isDataModified ? (
        <ExitConfirmation
          onExit={this.onConfirmExit}
          onCancel={this.onConfirmCancel}
        />
      ) : (
        this.onConfirmExit()
      )
    }

    return (
      <>
        <Modal isOpen={visible} className="commercial-customer-modal modal-lg">
          <ModalHeader
            close={
              <CloseButton
                handleClose={() => this.setState({ isConfirm: true })}
              />
            }
          >
            <span className="modal-title">Record ID: {`${recordId}`}</span>
            <span className="date-sub-title">| Date: 12 Mar 2021</span>
            <span className="last-updated-sub-title">
            {`Last Updated By: ${currentSalesAndInventory.updated_by?.split("@")[0] || "Unknown"} on ${currentSalesAndInventory.updated_at && format(new Date(currentSalesAndInventory.updated_at), "do LLL yyyy") || ""}`}
            </span>
          </ModalHeader>

          <ModalBody>
            {this.state.isConfirm && handleExitConfirmation()}
            <Fragment>
              <div>
                <Nav pills justified>
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : null}
                      onClick={() => {
                        toggle("1")
                      }}
                    >
                      <span>Details</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : null}
                      onClick={() => {
                        toggle("2")
                      }}
                    >
                      <span>Sales</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "3" ? "active" : null}
                      onClick={() => {
                        toggle("3")
                      }}
                    >
                      <span>Inventory</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "4" ? "active" : null}
                      onClick={() => {
                        toggle("4")
                      }}
                    >
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
          {!scheduler && !isConfirm && (
            <ModalFooter>
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
            </ModalFooter>
          )}
        </Modal>
      </>
    )
  }
}

const mapStateToProps = ({ saleAndInventory }) => ({
  currentSalesAndInventory: saleAndInventory?.currentSalesAndInventory,
  isUpdateSuccess: saleAndInventory.currentSalesAndInventory?.isUpdateSuccess
})

const mapDispatchToProps = dispatch => ({
  onGetSalesAndInventoryDetail: recordId => dispatch(getDetailsSales(recordId)),
  onUpdateSalesAndInventoryDetail: (recordId, data) =>
    dispatch(updateSalesAndInventoryDetail(recordId, data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesAndInventoryTableInformation)
