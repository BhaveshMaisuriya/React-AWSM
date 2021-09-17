import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { Button, Modal, ModalFooter, ModalBody, ModalHeader, Col, Row } from "reactstrap"
import CloseButton from "../../../components/Common/CloseButton"
import { isScheduler } from "../../../helpers/auth_helper"
import {
  getProductDetail,
  resetProductDetail,
  updateProductDetail,
} from "../../../store/actions"
import AWSMDropdown from "../../../components/Common/Dropdown"
import "./ProductDetailModal.scss"
import { isEqual } from "lodash"
import AWSMInput from "components/Common/Input"

class ProductDetailModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      updateDictionary: {},
      displayConfirmationBox: false,
    }
    this.onFieldValueChange = this.onFieldValueChange.bind(this)
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

  componentDidUpdate() {
    if (isEqual(this.state.updateDictionary, {})) {
      this.setState({ updateDictionary: this.props.currentProduct })
    }
  }

  async handleUpdate(event) {
    console.log("update::", this.state.updateDictionary)
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
    if (!isEqual(this.state.updateDictionary, this.props.currentProduct)) {
      return (
        <div className="Confirmation-box">
          <div>
            <h3>Exit Confirmation</h3>
            <p>
              Are you sure you want to exit without update? <br />
              You will lose all the changes made.
            </p>
            <button
              className="btn btn-dan"
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

  handleInputChange = event => {
    const newInput = {
      [event.target.name]: event.target.value,
    }
    this.setState({
      updateDictionary: {
        ...this.state.updateDictionary,
        ...{ remarks: event.target.value }
        // ...newInput,
      },
    })
    
  }

  onFieldValueChange(fieldName, value) {
    const newData = { ...this.state.updateDictionary }    
    newData[fieldName] = value
    this.setState({updateDictionary: newData})
  }



  renderModalBody() {
    const { currentProduct } = this.props
    const { updateDictionary } = this.state
    const isDisabledField = isScheduler()
    // const isDisabledField = false    
    return (
      <>
        {updateDictionary !== {} ? (
          <ModalBody>
            <div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT NAME</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.name}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>STATUS IN SAP</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.status_sap}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> STATUS IN AWSM </label>
                  <AWSMDropdown
                    value={updateDictionary.status_awsm}
                    name="status_awsm"
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
                    className="form-control awsm-input"
                    placeholder="Select status"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT DIVISION</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.division}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> MATERIAL GROUP</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.material_group}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> CATEGORY</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.category}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> SUB CATEGORY</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.sub_category}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT GROUP</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.product_group}
                    disabled={true}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label> UOM</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.uom}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT DENSITY</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={updateDictionary.density}
                    disabled={true}
                  />
                </div>
              </div>
               <div className="row">
                 <div className="col-md-12 form-group">
                   <label> REMARKS</label>
                   <input
                     className="form-control awsm-input"
                     type="text"
                     defaultValue={updateDictionary.remarks}
                     name="remarks"
                     disabled={isDisabledField}
                     onChange={(e) => this.onFieldValueChange("remarks", e.target.value)}
                     onBlur={(e) => this.onFieldValueChange("remarks", e.target.value)}
                     placeholder='Type something here ...'
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
    const { updateDictionary } = this.state
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
            Product Code: {updateDictionary.code}
          </span>
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
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