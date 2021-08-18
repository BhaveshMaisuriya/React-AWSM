import React, { Component } from "react"

import { Card, CardBody, CardTitle, Badge, Button, Modal } from "reactstrap"
import { Link } from "react-router-dom"
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

class SmallTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      currentItem: null,
      transactions: [
        {
          id: "customCheck2",
          orderId: "90014167",
          billingName: "1400",
          Date: "13600",
          total: this.props.petDataSource === 0 ? "U95" : "0",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "10,027" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90034754",
          billingName: "2330",
          Date: "5754",
          total: this.props.petDataSource === 0 ? "ADO" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "16,029" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90033383",
          billingName: "471",
          Date: "4234",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "19,882" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90033383",
          billingName: "250",
          Date: "7600",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "19,882" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "900337877",
          billingName: "1232",
          Date: "17736",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "19,882" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "900337877",
          billingName: "1232",
          Date: "17736",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "19,882" : "ACTIVE",
          methodIcon: "",
          paymentMethod: "Primax 97",
          link: "#",
        },
      ],
    }
  }

  toggleModal = (p) => {
    
    try {
      const currentItem = JSON.parse(p.target.value)
      this.setState(prevState => ({
        modal: !prevState.modal,
        currentItem
      }))
    }
    catch (e) {
      this.setState(prevState => ({
        modal: !prevState.modal,
      })) 
    }
  }

  render() {
    const headerItems = [
      {label: 'ID', field: 'id'},
      {label: this.props.petDataSource === 0 ? "Date" : "City", field: 'Date'},
      {label: this.props.petDataSource === 0 ? "Station" : "Data Module", field: 'billingName'},
      {label: this.props.petDataSource === 0 ? "Product" : "Current Data", field: 'total'},
    { label: this.props.petDataSource === 0 ? "Sales" : "Future Data", field: 'paymentStatus'},
    { label: this.props.petDataSource === 0 ? "Inventory" : "Remarks", field: 'paymentMethod'}
  ]
    return (
      <React.Fragment>
        {/* <EcommerceOrdersModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
        /> */}
              <Modal
                          isOpen={this.state.modal}
                          toggle={this.toggleModal}
                        >
                          <div className="modal-header">
                            <h5 className="modal-title mt-0" id="myModalLabel">
                              View Details
                            </h5>
                            <button
                              type="button"
                              onClick={() =>
                                this.setState({ modal: false })
                              }
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            {
                              headerItems.map((col, index) => {
                                return (
                                  <div key={index} className="form-group row">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-md-2 col-form-label"
                                    >
                                      {col.label}
                                    </label>
                                    <div className="col-md-10">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-md-2 col-form-label"
                                    >
                                      {this.state.currentItem ? this.state.currentItem[col.field] : ''}
                                    </label>
                                      {/* <input
                                        className="form-control awsm-input"
                                        type="text"
                                        defaultValue={this.state.currentItem ? this.state.currentItem[col.field] : ''}
                                      /> */}
                                    </div>
                                  </div>
                                )
                              })
                            }

                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              onClick={() => {
                                this.setState({
                                  modal: false
                                })
                              }}
                              className="btn btn-secondary waves-effect"
                              data-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary waves-effect waves-light"
                              onClick={() => {
                                this.setState({
                                  modal: false
                                })
                              }}
                            >
                              Save changes
                            </button>
                          </div>
                        </Modal>
   
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Sales Inventory Update</CardTitle>
            <div className="table-responsive">
              <table className="table table-centered table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: "20px" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </th>
                    <th>Station ID</th>
                    <th>Product</th>
                    <th>Cuurent Sale</th>
                    <th>Current Level</th>
                    <th>Reporting Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.transactions.map((transaction, key) => (
                    <tr key={"_tr_" + key}>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={transaction.id}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={transaction.id}
                          >
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="text-body font-weight-bold">
                          {" "}
                          {transaction.orderId}{" "}
                        </Link>{" "}
                      </td>
                      <td>
                        <i
                          className={"fab " + transaction.methodIcon + " mr-1"}
                        ></i>{" "}
                        {transaction.paymentMethod}
                      </td>
                      <td>{transaction.billingName}</td>
                      <td>{transaction.Date}</td>
                      
                      <td>
                       DONE
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default SmallTransaction
