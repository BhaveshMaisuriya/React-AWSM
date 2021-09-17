import React, { Component } from "react"
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
import CustomizeTableModal from "../../../common/CustomizeTable"
import {
  transformArrayToString,
  transformObjectToStringSentence,
  filterObject,
} from "./helper"
import "./style.scss"
import { DownloadIcon } from "./icon"
import DownloadExcel from "../../../components/Common/DownloadExcel"
import AWSMAlert from "../../../components/Common/AWSMAlert"
import VarianceControl from "../SalesAndInventory/VarianceControl"
import TankStatusModal from "../SalesAndInventory/TankStatusModal/TankStatusModal"
import VarianceIcon from "../../../assets/images/AWSM-Variance-Control.svg"
import TankIcon from "../../../assets/images/AWSM-Tank-Status.svg"
import AWSMDropdown from "../../../components/Common/Dropdown"
import DatePicker from "../../../components/Common/DatePicker"
import REGION_TERMINAL from "../../../common/data/regionAndTerminal"
import CloseButton from "../../../components/Common/CloseButton"
import { format } from "date-fns"

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
  defaultRegion = REGION_TERMINAL.find((option)=> option.region === "Central")?.region
  defaultTerminal = REGION_TERMINAL
    .find((option)=> option.region === "Central")?.terminal?.find((term)=> term === "KVDT")
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
      region: this.defaultRegion ? this.defaultRegion : null,
      terminal: this.defaultTerminal ? this.defaultTerminal : null,
      sales_date: new Date()
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
    this.downloadExcel = this.downloadExcel.bind(this)
  }

  getCustomerData = async () => {
    const { onGetMainTable, /*salesDate*/ } = this.props
    const { currentPage, searchTerm, sortField } = this.state
    const { sortDir, searchFields, q } = this.state
    const pathName = window.location.pathname
    const params = {
      limit: 10,
      page: currentPage,
      search_term: searchTerm,
      search_fields: transformArrayToString(searchFields),
      q: transformObjectToStringSentence(q),
      sort_dir: sortDir,
      sort_field: sortField,
    }
    if (pathName === "/sales-inventory"){
        params.search_date = "2021-04-08"
       /* must be (format(salesDate,"YYYY-MM-DD")) // because data is only available
       for date 2021-04-08, not for today. so just a test */
    }
    if (params.q.length < 1) delete params.q
    window.scrollTo(0, 0)
    await onGetMainTable(params)
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
        <ModalHeader
          toggle={this.toggle}
          close={<CloseButton handleClose={this.toggle} />}
        >
          <h3>Audit Log</h3>
        </ModalHeader>
        {console.log("audits:::", audits)}
        <AuditLog
          rowsAudit={rowsAudit}
          currentAuditPage={currentAuditPage}
          data={audits?.data?.list}
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
    if (this.props.resetCurrentTerminalDetail) {
      this.props.resetCurrentTerminalDetail()
    }
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
    const pathName = window.location.pathname

    return (modalTI && ModalComponent) ||
      pathName === "/retail-customer" ||
      pathName === "/commercial-customer" ? (
      <ModalComponent
        data={
          this.props.tableData && this.props.tableData.list
            ? this.props.tableData.list[this.state.selectedItem]
            : null
        }
        visible={modalTI}
        onCancel={this.toggleTI}
        refreshMainTable={this.getCustomerData}
      />
    ) : null
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
  updateSalesDate = (newDate)=>{
    if(this.props.updateSalesDate){
      this.props.updateSalesDate(newDate);
    }
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
      frozenColNum,
      varianceControlData,
      overrideActionColumn,
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
          {typeof downloadtableData === 'string' &&
           <DownloadExcel
           tableData={tableData}
           tableName={tableName}
           getLoader={this.getLoader}
           getAlert={this.getAlert}
         />
          }
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
          initialMetric={searchFields}
          defaultMetric={this.props.defaultColumns}
        />
        <VarianceControl
          open={this.state.varianceControl}
          closeDialog={() => this.setState({ varianceControl: false })}
          selectedDate={format(locationPath === "/sales-inventory" ?
            this.props.salesDate : this.state.sales_date, "yyyy-MM-dd")}
        />
        <TankStatusModal
          open={this.state.tankStatusModal}
          handleClose={() => this.setState({ tankStatusModal: false })}
          modalTitle={`Tank Status`}
          selectedDate={format(locationPath === "/sales-inventory" ?
            this.props.salesDate : this.state.sales_date, "yyyy-MM-dd")}
        />
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <div className="page-header">{headerTitle} </div>
              <div
                className={`${classes.headerText} d-flex justify-content-between align-items-center`}
              >
                <div className="vertical-hr-right">
                  <button
                    className="btn btn-outline-primary excel-btn-container"
                    onClick={() => this.downloadExcel()}
                    // disabled={this.state.loader}
                  >
                    <div className="excel-download-btn">
                      <span className="download-icon">
                        <DownloadIcon />
                      </span>
                      {this.state.loader === true ? (
                        <span className="downloan-button-message">
                          Downloading ...
                        </span>
                      ) : (
                        <span className="download-button-message">
                          Download Excel
                        </span>
                      )}
                    </div>
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
                    <CardBody className="card-content">
                      <CardTitle className="table-header">
                        {cardTitle}
                      </CardTitle>
                      <Divider />
                      <div className="d-flex justify-content-between align-items-center">
                        <SearchBar
                          searchOnClickHandler={this.handleSearchButton}
                          searchOnChangeHandler={this.handleSearchBox}
                        />
                      </div>
                      <div className="table-top-bar row">
                        <div className={`top-page-number ${locationPath === "/sales-inventory" && 'sales-first col-lg-2 col-sm-12 col-xs-12'}`}>
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
                        {locationPath === "/sales-inventory" && (
                          <div className={`d-flex align-items-center w-100 ${locationPath === "/sales-inventory" && 'border-left col-lg-7 col-sm-12 col-xs-12' }`}>
                            <div className="col-4 p-0 d-flex align-items-center">
                              <label className="mb-0 pr-2">DATE</label>
                              <DatePicker
                                showButtons={true}
                                isTypeFor="sales"
                                value={this.props.salesDate}
                                onChange={this.updateSalesDate}
                              />
                            </div>
                            <div className="col-8 p-0 d-flex align-items-center">
                              <label className="mb-0 pr-2 w-50">REGION & TERMINAL</label>
                              <div className="d-flex w-100">
                                <div className="col-4 p-0">
                                  <AWSMDropdown
                                    placeholder=""
                                    items={REGION_TERMINAL
                                      .filter((option)=> option.region !== "Special Product")
                                      .map(e => e.region)}
                                    value={this.state.region}
                                    onChange={value =>
                                      this.setState({
                                        ...this.state,
                                        region: value,
                                        terminal: REGION_TERMINAL
                                          .find((option)=> option.region === value)?.terminal?.[0],
                                      })
                                    }
                                  />
                                </div>
                                <div className="col-6 p-0 ml-2">
                                  <AWSMDropdown
                                    placeholder=""
                                    items={
                                      REGION_TERMINAL.find(
                                        e => e.region === this.state.region
                                      )?.terminal
                                    }
                                    value={this.state.terminal}
                                    onChange={value =>
                                      this.setState({
                                        ...this.state,
                                        terminal: value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className={`d-flex align-items-center ${locationPath === "/sales-inventory" && 'sales-first  col-lg-3 col-sm-12 col-xs-12'}`}>
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
                                <ReactSVG src={TankIcon} />
                                Tank Status
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <FixedColumnTable
                        headers={searchFields}
                        config={tableMapping}
                        tableData={tableData.list ? tableData.list : tableData}
                        frozen={frozenColNum}
                        filterData={filter}
                        headerSortHandler={this.handleHeaderSort}
                        filterApplyHandler={this.handleQueryParameterChange}
                        modalPop={this.modalHandlerTI}
                        varianceControlData={varianceControlData}
                        overrideActionColumn={overrideActionColumn}
                      />
                      <TablePagination
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        onChangePage={this.handleChangePage}
                        totalPages={Math.ceil(
                          tableData.total_rows / rowsPerPage
                        )}
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
  onGetMainTable: PropTypes.func.isRequired,
  onGetAuditLog: PropTypes.func.isRequired,
  onGetTableInformation: PropTypes.func.isRequired,
  onUpdateTableInformation: PropTypes.func.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableMapping: PropTypes.object.isRequired,
  tableData: PropTypes.object.isRequired,
  audits: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  headerTitle: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  modalComponent: PropTypes.element,
  onGetDownloadCustomer: PropTypes.func.isRequired,
  frozenColNum: PropTypes.number,
  varianceControlData: PropTypes.object,
  overrideActionColumn: PropTypes.func,
}

Pages.defaultProps = {
  frozenColNum: 1,
}

export default withStyles(styles)(Pages)
