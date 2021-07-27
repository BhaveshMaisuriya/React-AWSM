import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader } from "reactstrap"
import CloseButton from "../../../components/Common/CloseButton"
import { isScheduler } from "../../../helpers/auth_helper"
import {
  getProductDetail,
  resetProductDetail,
  updateProductDetail,
} from "../../../store/actions"
import AWSMDropdown from "../../../components/Common/Dropdown"
import "./ProductDetailModal.scss"

class ProductDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      updateDictionary: {},
      displayConfirmationBox: false,
    }
  }

  componentDidMount() {
    const { onGetProductDetail, data } = this.props
    onGetProductDetail(data.code)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateStatus) {
      this.ModalCloseHandler()
      this.props.refreshMainTable()
    }
  }

  async handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
      const { code } = this.props.data
      await this.props.onUpdateProductDetail({
        code,
        body: { ...this.props.currentProduct, ...this.state.updateDictionary },
      })
    } else this.props.onCancel()
  }

  handleClose() {
    if (Object.keys(this.state.updateDictionary).length > 0)
      this.setState({ displayConfirmationBox: true })
    else this.props.onCancel()
  }

  renderConfirmationDialog() {
    if (Object.keys(this.state.updateDictionary).length > 0) {
      return (
        <div className="Confirmation-box">
          <div>
            <h3>Exit Confirmation</h3>
            <p>
              Are you sure you want to exit without update? <br />
              You will lose all the changes made.
            </p>
            <button
              className="btn btn-outline-danger"
              onClick={() => this.setState({ displayConfirmationBox: false })}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={this.ModalCloseHandler}>
              Exit
            </button>
          </div>
        </div>
      )
    } else this.props.onCancel()
  }

  ModalCloseHandler = () => {
    const { onCancel, resetProductDetail } = this.props
    onCancel()
    resetProductDetail()
  }

  renderModalBody() {
    const { onCancel, currentProduct } = this.props
    const { updateDictionary } = this.state
    const isDisabledField = isScheduler()
    return (
      <>
        {currentProduct ? (
          <ModalBody>
            <div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT NAME</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.name}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>STATUS IN SAP</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.status_sap}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> STATUS IN AWSM </label>
                  <AWSMDropdown
                    value={
                      updateDictionary?.status_awsm
                        ? updateDictionary.status_awsm
                        : currentProduct.status_awsm
                    }
                    items={["ACTIVE", "INACTIVE"]}
                    onChange={ev => {
                      this.setState({
                        updateDictionary: {
                          ...this.state.updateDictionary,
                          ...{ status_awsm: ev },
                        },
                      })
                    }}
                    disabled={isDisabledField}
                    className="form-control"
                  />
                  {/* <select
                    className="form-control"
                    type="text"
                    disabled={isDisabledField}
                    defaultValue={updateDictionary.status_awsm}
                    onChange={ev => {
                      this.setState({
                        updateDictionary: {
                          ...this.state.updateDictionary,
                          ...{ status_awsm: ev.target.value },
                        },
                      })
                    }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select> */}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT DIVISION</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.division}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> MATERIAL GROUP</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.material_group}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> CATEGORY</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.category}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> SUB CATEGORY</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.sub_category}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT GROUP</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.product_group}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> UOM</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.uom}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT DENSITY</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={currentProduct.density}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 form-group">
                  <label> REMARKS</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={
                      updateDictionary?.remarks
                        ? updateDictionary.remarks
                        : currentProduct.remarks
                    }
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
          </ModalBody>
        ) : null}
        {!isDisabledField && currentProduct ? (
          <ModalFooter>
            <button
              className="btn-sec"
              onClick={() => this.setState({ displayConfirmationBox: true })}
            >
              Cancel
            </button>
            <Button onClick={this.handleUpdate.bind(this)} color="primary">
              Update
            </Button>
          </ModalFooter>
        ) : null}
      </>
    )
  }

  render() {
    const { visible, currentProduct } = this.props
    const externalCloseBtn = (
      <CloseButton handleClose={() => this.handleClose()} />
    )

    if (!currentProduct)
      return (
        <Modal isOpen={visible} className="commercial-customer-modal modal-lg">
          <ModalHeader close={externalCloseBtn}>
            <span className="modal-title">PRODUCT CODE</span>
          </ModalHeader>
        </Modal>
      )
    return (
      <Modal isOpen={visible} className="commercial-customer-modal modal-lg">
        <ModalHeader close={externalCloseBtn}>
          <span className="modal-title">
            Product Code: {currentProduct.code}
          </span>
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>

          {/* <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => this.setState({ displayConfirmationBox: true })}
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
        </ModalHeader>
        {this.state.displayConfirmationBox
          ? this.renderConfirmationDialog()
          : this.renderModalBody()}
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
  resetProductDetail: () => dispatch(resetProductDetail()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailModal)
