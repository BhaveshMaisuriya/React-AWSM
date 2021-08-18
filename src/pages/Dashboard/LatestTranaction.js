import React, { Component } from "react"

import { Card, CardBody, CardTitle, Badge, Button, Modal } from "reactstrap"
import { Link } from "react-router-dom"
// import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal"

class LatestTranaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      currentItem: null,
      transactions: [
        {
          id: "customCheck2",
          orderId: "90014167",
          billingName: this.props.petDataSource === 0 ? "STESEN SERVIS USMAJAYA" : "A.SAMAH SERVICE STATION",
          Date: this.props.petDataSource === 0 ? "Shah Alam" : "0",
          total: this.props.petDataSource === 0 ? "U95" : "0",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "10,027" : "ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "54,000" : "2/02/2021",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90034754",
          billingName: this.props.petDataSource === 0 ? "WAWASAN KD ENTERPRISE" : "ABADAN DUA ENTERPRISE",
          Date: this.props.petDataSource === 0 ? "BANTING" : "0",
          total: this.props.petDataSource === 0 ? "ADO" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "16,029" : "ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "54,000" : "4/02/2021",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90033383",
          billingName: this.props.petDataSource === 0 ? "ANJUNG ENOLILS" : "ABADAN ENTERPRISE ",
          Date: this.props.petDataSource === 0 ? "CHERAS" : "1",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "19,882" : "ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "54,000" : "4/02/2021",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90031173",
          billingName: this.props.petDataSource === 0 ? "NST MESRA KIOSK" : "ACTGREEN SERVICE STATION",
          Date: this.props.petDataSource === 0 ? "RAWANG" : "1",
          total: this.props.petDataSource === 0 ? "U95" : "0",
          badgeClass: "success",
          paymentStatus: this.props.petDataSource === 0 ? "18,120" : "ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "54,000" : "5/02/2021",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90039450",
          billingName: this.props.petDataSource === 0 ? "SATRIA SINAR ENTERPRISE" : "AIRIYA JAYA",
          Date: this.props.petDataSource === 0 ? "SEMENYIH" : "1",
          total: this.props.petDataSource === 0 ? "U95" : "1",
          badgeClass: "danger",
          paymentStatus: this.props.petDataSource === 0 ? "29,207" : "NOT ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "81,000" : "6/02/2021",
          link: "#",
        },
        {
          id: "customCheck2",
          orderId: "90034594",
          billingName: this.props.petDataSource === 0 ? "JML DAMAI SERVICES" : "AL QADR ENTERPRISE",
          Date: this.props.petDataSource === 0 ? "KLANG" : "1",
          total: this.props.petDataSource === 0 ? "ADO" : "1",
          badgeClass: "danger",
          paymentStatus: this.props.petDataSource === 0 ? "32,513" : "NOT ACTIVE",
          methodIcon: "",
          paymentMethod: this.props.petDataSource === 0 ? "108,000" : "8/02/2021",
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
                                        className="form-control"
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
            <CardTitle className="mb-4">{this.props.petDataSource === 0 ? "Station Data Error Summary" : "Master Data Upcoming Changes"}</CardTitle>
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
                    <th>ID</th>
                    <th>{this.props.petDataSource === 0 ? "Customer" : "Name"}</th>
                    <th>{this.props.petDataSource === 0 ? "City" : "Old Data"}</th>
                    <th>{this.props.petDataSource === 0 ? "Product" : "New Data"}</th>
                    <th>{this.props.petDataSource === 0 ? "Stock Indicator" : "Active"}</th>
                    <th>{this.props.petDataSource === 0 ? "Tank Size" : "Effective Dates"}</th>
                    {this.props.petDataSource === 1 ? (<th>Field</th>) : null}
                    {/* <th>View Details</th> */}
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
                      <button style={{border: 'none', background: 'transparent'}} className="text-body font-weight-bold" value={JSON.stringify(transaction)}
                          onClick={this.toggleModal}>
                        {/* <Link to="#" className="text-body font-weight-bold"> */}
                          {" "}
                          {transaction.orderId}{" "}
                        {/* </Link>{" "} */}
                        </button>
                      </td>
                      <td>{transaction.billingName}</td>
                      <td>{transaction.Date}</td>
                      <td>{transaction.total}</td>
                      <td>
                        <Badge
                          className={
                            "font-size-12 badge-soft-" + transaction.badgeClass
                          }
                          color={transaction.badgeClass}
                          pill
                        >
                          {transaction.paymentStatus}
                        </Badge>
                      </td>
                      <td>
                        <i
                          className={"fab " + transaction.methodIcon + " mr-1"}
                        ></i>{" "}
                        {transaction.paymentMethod}
                      </td>
                      <td>
                      {/* <Link
                                to=""
                                className="waves-effect waves-light"
                              >
                                View More <i className="mdi mdi-arrow-right ml-1"></i>
                              </Link> */}
                        {/* <Button
                          type="button"
                          color="primary"
                          size="sm"
                          className="btn-rounded waves-effect waves-light"
                          // onClick={this.togglemodal}
                          value={JSON.stringify(transaction)}
                          onClick={this.toggleModal}
                        >
                          View Details
                        </Button> */}
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

export default LatestTranaction
