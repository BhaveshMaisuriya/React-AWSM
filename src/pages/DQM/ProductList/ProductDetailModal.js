import React, { Fragment, PureComponent } from "react";
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
    onGetProductDetail(data.product_code)
  }

  handleUpdate(event) {
    if (Object.keys(this.state.updateDictionary).length > 0) {
        const { productCode } = this.props.data
        this.props.onUpdateProductDetail({
          productCode,
          body: this.state.updateDictionary
        })
    } else this.props.onCancel()
  }

  render() {
    const { activeTab } = this.state;
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }
    const { onCancel, visible, currentProduct } = this.props;
    const isDisabledField = isScheduler()
    return (
      <Modal isOpen={visible} className="table-information modal-lg" toggle={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
      <ModalHeader toggle={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
      <h3>
        <span>Product Information
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </span>
      </h3>
      </ModalHeader>
      <Fragment>
        {this.state.displayConfirmationBox ?
          <div class="Confirmation-box">
            <div>
              <h3>Exit Confirmation</h3>
              <p>Are you sure you want to exit without update? <br />You will lose all the changes made.</p>
              <button className="btn btn-outline-danger" onClick={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>Cancel</button>
              <button className="btn btn-danger" onClick={() => onCancel()}>Exit</button>
            </div>
          </div>
        : 
          <Fragment>
          {currentProduct ? (
          <ModalBody>
            <div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT CODE</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_code}
                      disabled={true}
                    />
                </div>
                <div className="col-md-6 form-group">
                  <label> PRODUCT NAME</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_name}
                      disabled={true}
                    />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>STATUS IN SAP</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_status_in_sap}
                      disabled={true}
                    />
                </div>
                <div className="col-md-6 form-group">
                <label> STATUS IN AWSM </label>
                <select
                  className="form-control"
                  type="text"
                  disabled={isDisabledField}
                  defaultValue={currentProduct.product_status_in_awsm}
                  onChange={(ev) => {
                    this.setState({ updateDictionary: {...this.state.updateDictionary, ...{ product_status_in_awsm: ev.target.value }} })
                  }}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DELETED">DELETED</option>
                </select>
              </div>
              </div>
            
              <div className="row">
                <div className="col-md-6 form-group">
                  <label> PRODUCT DIVISION</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_division}
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
                      defaultValue={currentProduct.product_category}
                      disabled={true}
                    />
                </div>
                <div className="col-md-6 form-group">
                  <label> SUB CATEGORY</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={currentProduct.product_sub_category}
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
                      defaultValue={currentProduct.product_density}
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
          </Fragment>
        }
      </Fragment>
      <ModalFooter>
        <button className="btn-sec" onClick={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
          Cancel
        </button>
      {!isDisabledField && currentProduct ? (
        <Button onClick={this.handleUpdate.bind(this)} color="primary">Update</Button>
      ) : null}
      </ModalFooter>
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