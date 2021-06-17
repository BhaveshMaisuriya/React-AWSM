import React, { Component, Fragment } from "react"
import Header from "../../../components/Common/CustomPageHeader"
import SearchBar from "../../../components/Common/SearchBar"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import IconButton from "@material-ui/core/IconButton"
import { Divider } from "@material-ui/core"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
} from "reactstrap"
import { ReactSVG } from "react-svg"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import customiseTableIcon from "../../../assets/images/AWSM-Customise-Table.svg"
import AuditLog from "../../../components/Common/AuditLog"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"
// import { tableColumns, tableMapping } from "./tableMapping"
import CustomizeTableModal from "../../../common/CustomizeTable"
import InformationModal from "../RoadTanker/InformationModal"
import {
  transformArrayToString,
  transformObjectToStringSentence,
  filterObject,
} from "./helper"
import "./style.scss"
import SettingsIcon from "@material-ui/icons/Settings"
import downloadExcelIcon from "../../../assets/images/AWSM-Excel.svg"
import DownloadExcel from "../../../components/Common/DownloadExcel"
import AWSMAlert from "../../../components/Common/AWSMAlert"
import VarianceControl from "../SalesAndInventory/VarianceControl"
import TankStatusModal from "../SalesAndInventory/TankStatusModal/TankStatusModal"
import VarianceIcon from "../../../assets/images/AWSM-Variance-Control.svg"
import AWSMDropdown from "../../../components/Common/Dropdown"
import DatePicker from "../../../components/Common/DatePicker"

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
class Pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
      rowsPerPage: 10,
      searchTerm: "",
      sortField: "",
      sortDir: "",
      searchFields: this.props.tableColumns,
      q: {},
      rowsAudit: 6,
      currentAuditPage: 0,
      modal: false,
      customizeModalOpen: false,
      selectedItem: null,
      loader: false,
      error_message: "",
      alert: false,
      DownloadTableData: false,
      varianceControl: false,
      tankStatusModal: false,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
    this.downloadExcel = this.downloadExcel.bind(this)
  }

  getCustomerData = async () => {
    const { onGetCustomer } = this.props
    const { currentPage, searchTerm, sortField } = this.state
    const { sortDir, searchFields, q } = this.state
    const params = {
      limit: 10,
      page: currentPage,
      search_term: searchTerm,
      search_fields: transformArrayToString(searchFields),
      q: transformObjectToStringSentence(q),
      sort_dir: sortDir,
      sort_field: sortField,
    }
    if (params.q.length < 1) delete params.q
    await onGetCustomer(params)
  }

  resetPageNo = () => {
    this.setState({ currentPage: 0 })
  }

  handleChangePage = (event, currentPage) => {
    this.setState({ currentPage }, () => this.getCustomerData())
  }

  handleSearchBox = searchedVal => {
    this.setState({ searchTerm: searchedVal })
  }

  handleSearchButton = () => {
    this.setState({ currentPage: 0 }, () => this.getCustomerData())
  }

  handleHeaderSort = (sortDir, sortField) => {
    this.resetPageNo()
    this.setState({ sortField, sortDir }, () => this.getCustomerData())
  }

  handleQueryParameterChange = (qValue, type) => {
    const { q } = this.state
    let newQ = {}
    if (type === "insert") {
      newQ = { ...q, ...qValue }
    } else if (type === "remove") {
      newQ = { ...filterObject(q, qValue) }
    }
    this.resetPageNo()
    this.setState({ q: newQ }, () => this.getCustomerData())
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

  handleOpenCustomizeTable = () => {
    this.setState(prevState => ({
      customizeModalOpen: !prevState.customizeModalOpen,
    }))
  }

  onTableColumnsChange = columns => {
    this.setState({ searchFields: columns }, () => this.getCustomerData())
  }
  /**
   * Will run the audit log modal
   */
  runAuditLogModal = () => {
    const { modal, rowsAudit, currentAuditPage } = this.state
    const { audits } = this.props
    const modalContent = modal ? (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        id="auditLog-modal"
        contentClassName="modalContainer"
      >
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
  modalHandlerTI = e => {
    const newState = {
      modalTI: true,
    }
    if (e && e.target && e.target.getAttribute("data-index") != null) {
      newState.selectedItem = e.target.getAttribute("data-index")
    }
    this.setState(newState)
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
    const ModalComponent = this.props.modalComponent
    const { headerTitle } = this.props

    const modalContent =
      modalTI && ModalComponent ? (
        <ModalComponent
          data={this.props.tableData.list[this.state.selectedItem]}
          visible={modalTI}
          onCancel={this.toggleTI}
          // mode={0}
        />
      ) : null
    return modalContent
  }

  downloadExcel = async () => {
    this.setState({ loader: true })
    if (this.props.onGetDownloadCustomer) {
      if (
        !this.props.downloadtableData ||
        (this.props.downloadtableData &&
          this.props.downloadtableData.length === 0)
      ) {
        const { currentPage } = this.state
        const { onGetDownloadCustomer } = this.props
        await onGetDownloadCustomer(currentPage)
      }
    } else {
      this.setState({ alert: true })
      this.setState({ error_message: "Something went wrong.." })
      this.setState({ loader: false })
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
    const locationPath = window.location.pathname
    const { currentPage, rowsPerPage, searchFields } = this.state
    const {
      tableData,
      tableName,
      classes,
      filter,
      tableMapping,
      cardTitle,
      headerTitle,
      downloadtableData,
    } = this.props

    if (!tableData || tableData.length === 0) return ""
    return (
      <React.Fragment>
        {downloadtableData &&
          downloadtableData.length !== 0 &&
          this.state.loader && (
            <DownloadExcel
              tableData={downloadtableData}
              tableName={tableName}
              getLoader={this.getLoader}
              getAlert={this.getAlert}
            />
          )}
        {this.state.DownloadTableData === true && (
          <DownloadExcel
            tableData={tableData}
            tableName={tableName}
            getLoader={this.getLoader}
            getAlert={this.getAlert}
          />
        )}
        <CustomizeTableModal
          tableName={this.props.tableName}
          onChange={this.onTableColumnsChange}
          open={this.state.customizeModalOpen}
          closeDialog={this.handleOpenCustomizeTable}
          availableMetric={tableMapping}
          defaultMetric={searchFields}
        />
        <VarianceControl
          open={this.state.varianceControl}
          closeDialog={() => this.setState({ varianceControl: false })}
        />
        <TankStatusModal
          open={this.state.tankStatusModal}
          handleClose={() => this.setState({ tankStatusModal: false })}
          modalTitle={`Tank Status`}
        />
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <Header title={headerTitle} />
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
              <Col>
                <Card>
                  {
                    <CardBody>
                      <CardTitle className="table-header">
                        {cardTitle}
                      </CardTitle>
                      <Divider />
                      {locationPath === "/sales-inventory" && (
                        <div className="d-flex align-items-center w-100 mt-4 mb-2">
                          <div className="col-4 p-0">
                            <label>DATE</label>
                            <DatePicker showButtons={true} isTypeFor='sales' />
                          </div>
                          <div className="col-6 p-0 ml-4">
                            <label>REGION & TERMINAL</label>
                            <div className="d-flex">
                              <div className="col-4 p-0">
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
                              <div className="col-8 p-0 ml-2">
                                <AWSMDropdown items={["KVDT"]} value="KVDT" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <SearchBar
                          searchOnClickHandler={this.handleSearchButton}
                          searchOnChangeHandler={this.handleSearchBox}
                        />
                      </div>
                      <div className="table-top-bar">
                        <div className="top-page-number">
                          <div className="enteriesText">
                            {`${currentPage * rowsPerPage + 1} to ${
                              tableData.total_rows -
                                (currentPage * rowsPerPage + rowsPerPage) <
                              0
                                ? tableData.total_rows
                                : currentPage * rowsPerPage + rowsPerPage
                            } of ${tableData.total_rows} enteries`}
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <IconButton
                            aria-label="delete"
                            onClick={this.handleOpenCustomizeTable}
                          >
                            <img src={customiseTableIcon} />
                          </IconButton>
                          {locationPath === "/sales-inventory" && (
                            <>
                              <div className="separate" />
                              <button
                                onClick={() =>
                                  this.setState({ varianceControl: true })
                                }
                                className="btn btn-outline-primary modal-button"
                              >
                                Variance Control
                                <ReactSVG src={VarianceIcon} />
                              </button>
                              <button
                                className="btn btn-outline-primary ml-2 modal-button"
                                onClick={() =>
                                  this.setState({ tankStatusModal: true })
                                }
                              >
                                Tank Status
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <FixedColumnTable
                        headers={searchFields}
                        config={tableMapping}
                        tableData={tableData.list}
                        frozen={1}
                        filterData={filter}
                        headerSortHandler={this.handleHeaderSort}
                        // filterDropdownHandler={this.getRetailFilterData}
                        filterApplyHandler={this.handleQueryParameterChange}
                        modalPop={this.modalHandlerTI}
                      />
                      <TablePagination
                        count={tableData.total_rows}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        onChangePage={this.handleChangePage}
                      />
                    </CardBody>
                  }
                </Card>
              </Col>
              {this.state.loader === false &&
                this.state.error_message !== "" && (
                  <AWSMAlert
                    status="error"
                    message={this.state.error_message}
                    openAlert={this.state.alert}
                    closeAlert={() => this.setState({ alert: false })}
                  />
                )}
            </Row>
            {this.runAuditLogModal()}
            {this.runTableInformation()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Pages.propType = {
  onGetCustomer: PropTypes.func.isRequired,
  onGetAuditLog: PropTypes.func.isRequired,
  // onGetFilter: PropTypes.func.isRequired,
  onGetTableInformation: PropTypes.func.isRequired,
  onUpdateTableInformation: PropTypes.func.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableMapping: PropTypes.object.isRequired,
  tableData: PropTypes.object.isRequired,
  audits: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  address: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  modalComponent: PropTypes.element,
  onGetDownloadCustomer: PropTypes.func.isRequired,
}

export default withStyles(styles)(Pages)
