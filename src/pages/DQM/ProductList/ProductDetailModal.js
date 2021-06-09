import React, { PureComponent } from "react";
import { connect } from "react-redux"
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader
} from "reactstrap";

import { isScheduler } from "../../../helpers/auth_helper"
import {
  getProductDetail,
  updateProductDetail
} from "../../../store/actions"
import "./ProductDetailModal.scss";

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

  handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
        const { code } = this.props.data
        this.props.onUpdateProductDetail({
          code,
          body: {...this.props.currentProduct, ...this.state.updateDictionary}
        })
        this.props.onCancel()
    } else this.props.onCancel()
  }

  renderConfirmationDialog() {
    const { onCancel } = this.props;
    return (
      <div className="Confirmation-box">
        <div>
          <h3>Exit Confirmation</h3>
          <p>Are you sure you want to exit without update? <br />You will lose all the changes made.</p>
          <button className="btn btn-outline-danger" onClick={() => this.setState({displayConfirmationBox: false})}>Cancel</button>
          <button className="btn btn-danger" onClick={onCancel}>Exit</button>
        </div>
      </div>
    )
  }

  renderModalBody() {
    const { onCancel, currentProduct } = this.props;
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
            <select
              className="form-control"
              type="text"
              disabled={isDisabledField}
              defaultValue={currentProduct.status_awsm}
              onChange={(ev) => {
                this.setState({ updateDictionary: {...this.state.updateDictionary, ...{ status_awsm: ev.target.value }} })
              }}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
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
                  defaultValue={currentProduct.remarks}
                  disabled={isDisabledField}
                  onChange={(ev) => {
                    this.setState({ updateDictionary: {...this.state.updateDictionary, ...{ remarks: ev.target.value }} })
                  }}
                />
              </div>
          </div>
          </div>
        </ModalBody>
        ) : null}
        <ModalFooter>
          <button className="btn-sec" onClick={() => this.setState({displayConfirmationBox: true})}>
            Cancel
          </button>
        {!isDisabledField && currentProduct ? (
          <Button onClick={this.handleUpdate.bind(this)} color="primary">Update</Button>
        ) : null}
        </ModalFooter>
      </>
     )       
  }

  render() {
    const { visible, currentProduct } = this.props;
    
    if (!currentProduct) return (
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
            PRODUCT CODE
          </span>
        </ModalHeader> 

      </Modal>
    ) 
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
            PRODUCT CODE: {currentProduct.code}
          </span>
          <span className="last-updated-sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>

            <button type="button" className="close" aria-label="Close" onClick={() => this.setState({displayConfirmationBox: true})}>
            <span aria-hidden="true">&times;</span>
          </button>
        </ModalHeader> 
        {this.state.displayConfirmationBox ?
            this.renderConfirmationDialog()
              : 
            this.renderModalBody()
          }
      </Modal>
    )
  }
}




const mapStateToProps = ({ products }) => ({
  currentProduct: products.currentProduct,
  error: products.error,
  updateStatus: products.updateStatus
})

const mapDispatchToProps = dispatch => ({
  onGetProductDetail: params => dispatch(getProductDetail(params)),
  onUpdateProductDetail: params => dispatch(updateProductDetail(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailModal)