import React, { Component } from "react"
import { MDBDataTable } from "mdbreact"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  Collapse,
  Button,
  Modal,
} from "reactstrap"
import CustomizeTableModal from "../../common/CustomizeTable"
import TankStatusModal  from "../DQM/SalesAndInventory/TankStatusModal/TankStatusModal"
const popTypes = [
  {
    field: "equal",
    label: "=",
  },
  {
    field: "nequal",
    label: "≠",
  },
  {
    field: "lte",
    label: "<=",
  },
  {
    field: "lt",
    label: "<",
  },
  {
    field: "gte",
    label: ">=",
  },
  {
    field: "gt",
    label: ">",
  },
  {
    field: "between",
    label: "Between",
  },
  {
    field: "exists",
    label: "Exists",
  },
  {
    field: "nexists",
    label: "Not Exists",
  },
  {
    field: "contains",
    label: "Contains",
  },
  {
    field: "ncontains",
    label: "Not Contains",
  },
  {
    field: "begins",
    label: "Begins With",
  },
]
const data = {
  "/sales-inventory": {
    columns: [
      {
        label: "Customer ID",
        field: "station",
        sort: "asc",
        width: 150,
        type: "string",
      },
      {
        label: "Product",
        field: "product",
        sort: "asc",
        width: 150,
        type: "string",
      },
      {
        label: "Current Sale",
        field: "sale",
        sort: "asc",
        width: 270,
        type: "string",
      },
      {
        label: "Current Level",
        field: "level",
        sort: "asc",
        width: 200,
        type: "string",
      },
      {
        label: "Expected Inventory",
        field: "inventory",
        sort: "asc",
        width: 200,
        type: "string",
      },
      {
        label: "Variance",
        field: "variance",
        sort: "asc",
        width: 200,
        type: "string",
      },
      {
        label: "Volume Difference",
        field: "volume",
        sort: "asc",
        width: 200,
        type: "string",
      },
      // {
      //   label: "Remarks",
      //   field: "remarks",
      //   sort: "asc",
      //   width: 100,
      //   type: "string"
      // },
      {
        label: "Override",
        field: "edit",
        sort: "asc",
        width: 100,
        type: "btn",
      },
      {
        label: "Keep",
        field: "edit1",
        sort: "asc",
        width: 100,
        type: "btn",
      },
    ],
    rows: [
      {
        station: "90048422",
        product: "PRIMAX 97",
        sale: "1,400",
        level: "13,600",
        inventory: "29,945",
        variance: "-1.6%",
        volume: "1,492",
      },
      {
        station: "90048492",
        product: "BIODIESEL B7",
        sale: "1,800",
        level: "3,600",
        inventory: "89,945",
        variance: "6.6%",
        volume: "1,412",
      },
    ],
  },
  "/retail-customer": {
    columns: [
      {
        label: "Customer ID",
        field: "account",
        sort: "asc",
        width: 150,
        type: "string",
      },
      {
        label: "Customer",
        field: "customer",
        sort: "asc",
        width: 150,
        type: "string",
      },
      {
        label: "City",
        field: "city",
        sort: "asc",
        width: 270,
        type: "string",
      },
      {
        label: "Region",
        field: "region",
        sort: "asc",
        width: 200,
        type: "string",
      },
      {
        label: "Tank Size",
        field: "size",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Today Forecast Sales",
        field: "today",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Latest Forecast Sales",
        field: "latest",
        sort: "asc",
        width: 100,
        type: "btn",
      },
      {
        label: "Todays Inventory",
        field: "inventory",
        sort: "asc",
        width: 100,
        type: "btn",
      },
      {
        label: "No of Trips",
        field: "trips",
        sort: "asc",
        width: 100,
        type: "btn",
      },
    ],
    rows: [
      {
        account: "90032500",
        customer: "ANJUNG ENOLLS",
        city: "Cheras",
        region: "CENTRAL",
        size: "54,000",
        today: "19,882",
        latest: "21,302",
        inventory: "40,104",
        trips: "2",
      },
      {
        account: "90031500",
        customer: "POTNAS ENTERPRISE",
        city: "Klang",
        region: "CENTRAL",
        size: "81,000",
        today: "3,552",
        latest: "7,302",
        inventory: "21,104",
        trips: "0",
      },
    ],
  },
  "/commercial-customer": {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Number",
        field: "number",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Region",
        field: "region",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "City",
        field: "city",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Actual Delivery",
        field: "delivery",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Today's Sales",
        field: "sales",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Coordinates",
        field: "coordinates",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Operating Hours",
        field: "operating",
        sort: "asc",
        width: 100,
        type: "string",
      },
    ],
    rows: [
      {
        name: "MOFA TULLEN ENTERPRISE",
        number: "+60123456789",
        email: "james@petronas.com",
        city: "KLANG",
        region: "CENTRAL",
        size: "1250 L",
        coordinates: "1.26356N, -105.54684E",
        operating: "0800-1600 Hours",
        delivery: "9",
        sales: "3,099",
      },
      {
        name: "MS PETRO TRADING",
        number: "+60123456789",
        email: "michael@petronas.com",
        city: "CHERAS",
        region: "CENTRAL",
        size: "1250 L",
        coordinates: "1.26356N, -105.54684E",
        operating: "0800-1600 Hours",
        delivery: "16",
        sales: "8,099",
      },
    ],
  },
  "/road-tanker": {
    columns: [
      {
        label: "RT Number",
        field: "name",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Terminal",
        field: "terminal",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Capacity",
        field: "capacity",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Shift",
        field: "shift",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Pump",
        field: "pump",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "RT",
        field: "rt",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Product",
        field: "product",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Weight",
        field: "weight",
        sort: "asc",
        width: 100,
        type: "string"
      },
      {
        label: "Restrict Code",
        field: "restrict",
        sort: "asc",
        width: 100,
        type: "string"
      },
      {
        label: "Vehicle Owner",
        field: "vehicle",
        sort: "asc",
        width: 100,
        type: "string"
      },
    ],
    rows: [
      {
        name: "NCS 5568",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Spot",
        rt: "RE",
        product: "MultiProduct",
        pump: "YES",
      },
      {
        name: "NCT 5521",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCU 5526",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCU 5527",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCU 5528",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCU 5529",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCW 5531",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NCX 1140",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
      {
        name: "NDA 5630",
        terminal: "KVDT",
        capacity: "43680",
        shift: "Double",
        status: "Term",
        rt: "CO",
        product: "MultiProduct",
        pump: "NO",
      },
    ],
  },
  "/sla-compliance": {
    columns: [
      {
        label: "Shipment Creation Time",
        field: "createdAt",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Delivery Date",
        field: "deliveryDate",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Delivery Type",
        field: "type",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Inventory Data Time",
        field: "inventory",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Delivery Notes",
        field: "notes",
        sort: "asc",
        width: 100,
        type: "string",
      },
    ],
    rows: [
      {
        createdAt: "15/2/21 1400",
        deliveryDate: "4/4/21",
        type: "555",
        inventory: "987",
        notes: "Pending Delivery",
      },
      {
        createdAt: "15/2/21 1800",
        deliveryDate: "4/4/21",
        type: "555",
        inventory: "987",
        notes: "Pending Delivery",
      },
    ],
  },
}

for (var i = 0; i < Object.keys(data).length; i++) {
  const pathNameKey = Object.keys(data)[i]
  const firstRow = data[pathNameKey].rows[0]
  for (var j = 0; j < 30; j++) {
    data[pathNameKey].rows.push(firstRow)
  }
}

import Breadcrumbs from "../../components/Common/Breadcrumb"
import "./datatables.scss"
import VarianceControl from "../DQM/SalesAndInventory/VarianceControl"
import AWSMDropdown from "../../components/Common/Dropdown"
class DatatableTables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterOpen: false,
      modalOpen: false,
      currentItem: null,
      filters: [],
      customiseModalOpen: false,
      tankStatusModal:false,
      varianceControl: false,
    }
  }

  onEditClicked(i) {
    this.setState({
      currentItem: data[this.props.location.pathname].rows[i],
      modalOpen: true,
    })
  }

  addEditBtn(index) {
    data[this.props.location.pathname].rows[index].edit = (
      <button
        color="primary"
        className="mr-1 waves-effect waves-light"
        style={{ border: "none", background: "transparent", color: "#008F8A" }}
        onClick={() => {
          this.onEditClicked(index)
        }}
      >
        Override
      </button>
    )

    data[this.props.location.pathname].rows[index].edit1 = (
      <button
        color="primary"
        className="mr-1 waves-effect waves-light"
        style={{ border: "none", background: "transparent", color: "#008F8A" }}
        onClick={() => {
          this.onEditClicked(index)
        }}
      >
        Keep
      </button>
    )
  }

  render() {
    const locationPath = this.props.location.pathname
    let title,
      subtitle = ""
    switch (locationPath) {
      case "/retail-customer":
        title = "Retail Customer"
        subtitle = "Retail Customer List"
        break
      case "/sales-inventory":
        title = "Sales & Inventory"
        subtitle = "Sales List"
        break
      case "/commercial-customer":
        title = "Commercial Customer"
        subtitle = "Customer List"
        break
      case "/road-tanker":
        title = "Road Tanker"
        subtitle = "Tanker List"
        break
      case "/road-tanker":
        title = "Road Tanker"
        subtitle = "Tanker List"
        break
      case "/sla":
        title = "SLA"
        subtitle = "SLA List"
        break
      default:
        title = "Table"
        subtitle = "List"
        break
    }

    for (var i = 0; i < data[locationPath].rows.length; i++) {
      this.addEditBtn(i)
    }

    const onOpenCustomiseModal = () => {
      this.setState({
        customiseModalOpen: !this.state.customiseModalOpen
      })
    }
    return (
      <React.Fragment>
        <CustomizeTableModal
          tableName="road-tanker-table"
          open={this.state.customiseModalOpen}
          closeDialog={onOpenCustomiseModal}
          availableMetric={data["/road-tanker"].columns}
          metricArray
          metricKey="field"
        />
        <div className="page-content">
          <div className="container-fluid">
            <Breadcrumbs title="DQM" breadcrumbItem={title} />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>
                      {subtitle}
                      <i
                        style={{ float: "right", fontSize: "24px" }}
                        className="bx bx-export"
                      />
                      <i
                        style={{
                          float: "right",
                          fontSize: "24px",
                          paddingRight: "8px",
                          marginTop: "2px",
                        }}
                        className="bx bx-history"
                      />
                    </CardTitle>
                    <div id="accordion">
                      <Card className="mb-1">
                        <CardHeader className="p-3" id="headingOne">
                          <h6 className="m-0 font-14">
                            <span
                              onClick={() => {
                                if (this.state.filters.length == 0) {
                                  this.setState({
                                    filters: [
                                      {
                                        key:
                                          data[locationPath].columns[0].field,
                                        filter: popTypes[0].field,
                                        value: "",
                                      },
                                    ],
                                    filterOpen: !this.state.filterOpen,
                                  })
                                } else {
                                  this.setState({
                                    filterOpen: !this.state.filterOpen,
                                  })
                                }
                              }}
                              style={{ cursor: "pointer" }}
                              className="text-dark"
                            >
                              Filters
                            </span>
                          </h6>
                        </CardHeader>

                        <Collapse isOpen={this.state.filterOpen}>
                          <Card>
                            <CardBody>
                              {this.state.filters.map((filter, index) => {
                                return (
                                  <Row className="pt-3" key={index}>
                                    <Col sm={2}>
                                      <div className="">
                                        <select className="form-control">
                                          {data[locationPath].columns.map(
                                            (popType, lIndex) => {
                                              if (popType.type === "btn")
                                                return null
                                              return (
                                                <option key={lIndex}>
                                                  {popType.label}
                                                </option>
                                              )
                                            }
                                          )}
                                        </select>
                                      </div>
                                    </Col>
                                    <Col sm={2}>
                                      <div className="">
                                        <select className="form-control">
                                          {popTypes.map((popType, lIndex) => {
                                            return (
                                              <option key={lIndex}>
                                                {popType.label}
                                              </option>
                                            )
                                          })}
                                        </select>
                                      </div>
                                    </Col>
                                    <Col sm={4}>
                                      <div className="">
                                        <input
                                          className="form-control"
                                          type="text"
                                        />
                                      </div>
                                    </Col>
                                    <Col sm={2}>
                                      <div className="">
                                        <Button
                                          color="primary"
                                          className="mr-1 waves-effect waves-light"
                                          onClick={() => {
                                            var filters = this.state.filters
                                            filters.splice(index, 1)
                                            this.setState({ filters })
                                          }}
                                        >
                                          Delete
                                        </Button>
                                        <Button
                                          color="primary"
                                          className="mr-1 waves-effect waves-light"
                                          onClick={() => {
                                            var filters = this.state.filters
                                            filters.push({
                                              key:
                                                data[locationPath].columns[0]
                                                  .field,
                                              filter: popTypes[0].field,
                                              value: "",
                                            })
                                            this.setState({
                                              filters,
                                            })
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </Col>
                                  </Row>
                                )
                              })}
                            </CardBody>
                          </Card>
                        </Collapse>
                      </Card>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-5"></div>
                        <div className="col-5">
                          <label>REGION & TERMINAL</label>
                          <div className="d-flex">
                            <div className="col-5 p-0">
                              <AWSMDropdown items={["Northern", "Southern", "Central", "Eastern", "Sabah", "Sarawak"]} value="Northern"/>
                            </div>
                            <div className="col-7 p-0 ml-2">
                              <AWSMDropdown items={["KVDT"]} value="KVDT"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button className="btn btn-outline-primary" onClick={onOpenCustomiseModal}>Customise</button>
                      <div className="grey-text" style={{ width: "1px", backgroundColor: "gray", margin: "0 12px" }}/>
                      {locationPath === "/sales-inventory" && <div>
                        <button onClick={() => this.setState({varianceControl: true})} className="btn btn-outline-primary">
                          Sales and Inventory
                        </button>
                        <button className="btn btn-outline-primary ml-2" onClick={()=> this.setState({tankStatusModal:true})}>Tank Status</button>
                        <VarianceControl open={this.state.varianceControl} closeDialog={() => this.setState({varianceControl: false})}/>
                      </div>}
                    </div>
                    <MDBDataTable
                      responsive
                      striped
                      bordered
                      data={data[locationPath]}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalOpen}
          // toggle={this.tog_standard}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Edit {title}
            </h5>
            <button
              type="button"
              onClick={() => this.setState({ modalOpen: false })}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {data[locationPath].columns.map((col, index) => {
              if (col.type === "btn") return null
              return (
                <div key={index} className="form-group row">
                  <label
                    htmlFor="example-text-input"
                    className="col-md-2 col-form-label"
                  >
                    {col.label}
                  </label>
                  <div className="col-md-10">
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={
                        this.state.currentItem
                          ? this.state.currentItem[col.field]
                          : ""
                      }
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                this.setState({
                  modalOpen: false,
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
                  modalOpen: false,
                })
              }}
            >
              Save changes
            </button>
          </div>
        </Modal>
        <TankStatusModal open={this.state.tankStatusModal} handleClose={()=>this.setState({tankStatusModal:false})} modalTitle={`Tank Status`}/>
      </React.Fragment>
    )
  }
}

export default DatatableTables
