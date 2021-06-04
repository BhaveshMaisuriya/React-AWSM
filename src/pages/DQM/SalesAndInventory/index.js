import React, { Component, Fragment } from "react"
import { MDBDataTable } from "mdbreact"
import { connect } from "react-redux"
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
  ModalHeader,
} from "reactstrap"
import { withStyles } from "@material-ui/styles"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import Header from "../../../components/Common/CustomPageHeader"
import CustomizeTableModal from "../../../common/CustomizeTable"
import TankStatusModal from "./TankStatusModal/TankStatusModal"
import downloadExcelIcon from "../../../assets/images/AWSM-Excel.svg"
import { getSalesAuditLog, getDownloadSales } from "../../../store/actions"

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
        type: "string",
      },
      {
        label: "Restrict Code",
        field: "restrict",
        sort: "asc",
        width: 100,
        type: "string",
      },
      {
        label: "Vehicle Owner",
        field: "vehicle",
        sort: "asc",
        width: 100,
        type: "string",
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
import "../../Tables/datatables.scss"
import VarianceControl from "./VarianceControl"
import AWSMDropdown from "../../../components/Common/Dropdown"
import { Link } from "react-router-dom"
import DownloadExcel from "../../../components/Common/DownloadExcel"

const styles = {
  headerText: {
    marginLeft: "15px",
    marginBottom: "15px",
    paddingRight: "32px",
    textAlign: "right",
    fontSize: "14px",
    letterSpacing: "0",
    color: "#00A19C",
  },
  modalHeader: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
}
class SalesAndInventory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterOpen: false,
      modalOpen: false,
      currentItem: null,
      filters: [],
      customiseModalOpen: false,
      tankStatusModal: false,
      varianceControl: false,
      currentPage: 0,
      rowsPerPage: 10,
      searchTerm: "",
      sortField: "",
      sortDir: "",
      q: {},
      rowsAudit: 6,
      currentAuditPage: 0,
      modal: false,
      modalTI: false,
      loader: false,
      error_message: "",
      alert: false,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
  }

  componentDidMount() {
    const { onGetSalesAuditLog } = this.props
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "commercial_customer",
    }
    onGetSalesAuditLog(payload)
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

  /**
   * Handling the modal state when modal is click
   */
  modalHandler = () => {
    this.setState({
      modal: true,
    })
  }

  /**
   * Handling the modal state
   */
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  /**
   * Handling to close the modal and change state
   */
  closeHandler = () => {
    this.setState({
      modal: false,
    })
  }

  /**
   * Handling the change page in Audit Log
   */
  handleChangeAuditPage = (event, currentAuditPage) => {
    this.setState({ currentAuditPage })
  }

  /**
   * Will run the audit log modal
   */
  runAuditLogModal = () => {
    const { modal, rowsAudit, currentAuditPage } = this.state
    const { audits } = this.props
    const modalContent = modal ? (
      <Modal isOpen={this.state.modal} contentClassName="modalContainer">
        <ModalHeader toggle={this.toggle}>
          <h3>Audit Log</h3>
        </ModalHeader>
        <AuditLog
          rowsAudit={rowsAudit}
          currentAuditPage={currentAuditPage}
          data={audits.list}
          closeModal={this.closeHandler}
          handlePageChange={this.handleChangeAuditPage}
        />
      </Modal>
    ) : null
    return modalContent
  }

  /**
   * Handling the modal state when modal is click
   */
  modalHandlerTI = () => {
    this.setState({
      modalTI: true,
    })
  }

  /**
   * Handling the modal state
   */
  toggleTI() {
    this.setState(prevState => ({
      modalTI: !prevState.modalTI,
    }))
  }

  /**
   * Handling to close the modal and change state
   */
  closeHandlerTI = () => {
    this.setState({
      modalTI: false,
    })
  }

  /**
   * Will run the table information modal
   */
  runTableInformation = () => {
    const { modalTI } = this.state

    const { address } = this.props

    const modalContent = modalTI ? (
      <Modal isOpen={this.state.modalTI} contentClassName="modalTIContainer">
        <ModalHeader toggle={this.toggleTI}>
          <h3
            style={{
              paddingLeft: "15px",
              paddingTop: "8px",
              height: "26px",
              color: "#000000",
              fontFamily: "Museo Sans",
              fontSize: "24px",
              letterSpacing: "0",
              lineHeight: "26px",
            }}
          >
            Table Information
          </h3>
        </ModalHeader>
        <div>
          <TableInformation
            closeModal={this.closeHandlerTI}
            data={address}
            dataList={address.list}
          />
        </div>
      </Modal>
    ) : null
    return modalContent
  }

  downloadExcel = async () => {
    this.setState({ loader: true })
    if (
      !this.props.downloadtableData ||
      (this.props.downloadtableData &&
        this.props.downloadtableData.length === 0)
    ) {
      const { currentPage } = this.state
      const params = {
        limit: 10,
        page: currentPage,
        search_fields: '*',
      }
      const { onGetDownloadSales } = this.props
      await onGetDownloadSales(params)
    }
  }

  getLoader = () => {
    this.setState({ loader: false })
  }

  getAlert = () => {
    this.setState({ alert: true })
    this.setState({ error_message: "" })
  }

  render() {
    const locationPath = this.props.location.pathname
    const { classes } = this.props

    for (var i = 0; i < data[locationPath].rows.length; i++) {
      this.addEditBtn(i)
    }

    const onOpenCustomiseModal = () => {
      this.setState({
        customiseModalOpen: !this.state.customiseModalOpen,
      })
    }

    const { downloadtableData } = this.props

    return (
      <React.Fragment>
        {downloadtableData &&
          downloadtableData.length !== 0 &&
          this.state.loader && (
            <DownloadExcel
              tableData={downloadtableData}
              tableName='Sales And Inventory'
              getLoader={this.getLoader}
              getAlert={this.getAlert}
            />
          )}
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
            <div className={classes.modalHeader}>
              <Header title="Sales And Inventory" />
              <div
                className={`${classes.headerText} d-flex justify-content-between align-items-center`}
              >
                <div className="vertical-hr-right">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => this.downloadExcel()}
                  >
                    <img src={downloadExcelIcon} />
                    {this.state.loader === true ? (
                      <Fragment> Downloading ... </Fragment>
                    ) : (
                      <Fragment>Download Excel </Fragment>
                    )}
                  </button>
                </div>
                <Link
                  to="#"
                  onClick={() => {
                    this.modalHandler()
                  }}
                >
                  <img src={eyeIcon} alt="info" /> View Audit Log
                </Link>
              </div>
            </div>

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>
                      Sales List
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
                                        key: data[locationPath].columns[0]
                                          .field,
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
                                              key: data[locationPath].columns[0]
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
                              <AWSMDropdown
                                items={[
                                  "Northern",
                                  "Southern",
                                  "Central",
                                  "Eastern",
                                  "Sabah",
                                  "Sarawak",
                                ]}
                                value="Northern"
                              />
                            </div>
                            <div className="col-7 p-0 ml-2">
                              <AWSMDropdown items={["KVDT"]} value="KVDT" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        className="btn btn-outline-primary"
                        onClick={onOpenCustomiseModal}
                      >
                        Customise
                      </button>
                      <div
                        className="grey-text"
                        style={{
                          width: "1px",
                          backgroundColor: "gray",
                          margin: "0 12px",
                        }}
                      />
                      <div>
                        <button
                          onClick={() =>
                            this.setState({ varianceControl: true })
                          }
                          className="btn btn-outline-primary"
                        >
                          Sales and Inventory
                        </button>
                        <button
                          className="btn btn-outline-primary ml-2"
                          onClick={() =>
                            this.setState({ tankStatusModal: true })
                          }
                        >
                          Tank Status
                        </button>
                        <VarianceControl
                          open={this.state.varianceControl}
                          closeDialog={() =>
                            this.setState({ varianceControl: false })
                          }
                        />
                      </div>
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
              Edit Sales & Inventory
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
        <TankStatusModal
          open={this.state.tankStatusModal}
          handleClose={() => this.setState({ tankStatusModal: false })}
          modalTitle={`Tank Status`}
        />
        {this.runAuditLogModal()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ saleAndInventory }) => ({
  audits: saleAndInventory.auditsCom,
  downloadtableData: saleAndInventory.downloadtableData,
})

const mapDispatchToProps = dispatch => ({
  onGetSalesAuditLog: payload => dispatch(getSalesAuditLog(payload)),
  onGetDownloadSales: params => dispatch(getDownloadSales(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SalesAndInventory))