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
  Popover,
  PopoverBody,
} from "reactstrap"
import { ReactSVG } from "react-svg"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import customiseTableIcon from "../../../assets/images/AWSM-Customise-Table.svg"
import AuditLog from "../../../components/Common/AuditLog"
import Loader from "../../../components/Common/Loader"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"
import CustomizeTableModal from "../../../common/CustomizeTable"
import {
  transformArrayToString,
  transformObjectToStringSentence,
  filterObject,
} from "./helper"
import "./style.scss"
import DownloadExcelButton from "./../../../components/Common/DownloadExcelS3"
import AWSMAlert from "../../../components/Common/AWSMAlert"
import VarianceControl from "../SalesAndInventory/VarianceControl"
import TankStatusModal from "../SalesAndInventory/TankStatusModal/TankStatusModal"
import VarianceIcon from "../../../assets/images/AWSM-Variance-Control.svg"
import TankIcon from "../../../assets/images/AWSM-Tank-Status.svg"
import AWSMDropdown from "../../../components/Common/Dropdown"
import DatePicker from "../../../components/Common/DatePicker"
import REGION_TERMINAL from "../../../common/data/regionAndTerminal"
import { format, subDays } from "date-fns"
import { CustomCSVIcon } from "./icon"
import CsvFileUpload from "./CsvFileUpload"
import { TERMINAL_CODE_MAPPING } from "../../../common/data/regionAndTerminal"
import { isEqual } from "lodash"

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
      modal: false,
      customizeModalOpen: false,
      selectedItem: null,
      loader: false,
      error_message: "",
      alert: false,
      varianceControl: false,
      tankStatusModal: false,
      region: this.defaultRegion ? this.defaultRegion : null,
      terminal: this.defaultTerminal ? this.defaultTerminal : null,
      salesDate: new Date(),
      openCsvModal: false,
      showDownloadOption: false,
      downloadCsv: false,
      csvMessage: null,
      csvStatus: null,
      csvAlert: false,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleCsvModal = this.toggleCsvModal.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
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
        params.search_date = format(this.state.salesDate,"yyyy-MM-dd")
        params.terminal = TERMINAL_CODE_MAPPING[this.state.terminal]
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
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  toggleCsvModal() {
    this.setState(prevState => ({
      openCsvModal: !prevState.openCsvModal,
    }))
  }

  getListCall() {
    this.getCustomerData()
  }

  /**
   * Handling to close the modal and change state
   */
  closeHandler = () => {
    this.setState({
      modal: false,
    })
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
    const { modal } = this.state
    const { subModule } = this.props
    const modalContent = modal ? (
        <AuditLog
          rowsAudit={6}
          subModule={subModule}
          isOpen={this.state.modal}
          toggle={this.toggle}
        />
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
  toggleTI = () => {
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
        salesDate = {this.state.salesDate}
        visible={modalTI}
        onCancel={this.toggleTI}
        refreshMainTable={this.getCustomerData}
      />
    ) : null
  }

  uploadCSV = () => {
    this.setState({ openCsvModal : true });
  }

  downloadCSV = () => {
    this.setState({ downloadCsv : true });
  }

  csvAlertShow = (msg, status) => {
    this.setState({ csvMessage : msg });
    this.setState({ csvStatus : status });
    this.setState({ csvAlert : true });
  }

  onRegionChange = value => {
    this.setState({
      ...this.state,
      region: value,
      terminal: REGION_TERMINAL
        .find((option) => option.region === value)?.terminal?.[0],
    }, this.onDateAndTerminalChange)
  }

  onTerminalChange = value => {
    this.setState({
      ...this.state,
      terminal: value,
    }, this.onDateAndTerminalChange)
  }

  onSalesDateChange = value => {
    const { updateSalesDate } = this.props
    if (updateSalesDate) {
      updateSalesDate(value)
    }
    this.setState({
      salesDate: value
    }, this.onDateAndTerminalChange)
  }

  onDateAndTerminalChange = () => {
    const { searchFields, salesDate, terminal } = this.state
    const { onGetMainTable } = this.props
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "",
      sort_field: "",
      search_term: "",
      search_fields: transformArrayToString(searchFields),
      search_date: format(salesDate, "yyyy-MM-dd"),
      terminal: TERMINAL_CODE_MAPPING[terminal],
    }
    this.setState({
      currentPage: 0,
    })
    if (onGetMainTable) {
      onGetMainTable(params)
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isUpdateSuccess && !isEqual(this.props.isUpdateSuccess, prevProps.isUpdateSuccess)) {
      this.getCustomerData()
    }
  }

  render() {
    const locationPath = window.location.pathname
    const { currentPage, rowsPerPage, searchFields } = this.state
    const {
      tableData,
      classes,
      filter,
      tableMapping,
      cardTitle,
      headerTitle,
      frozenColNum,
      varianceControlData,
      overrideActionColumn,
      subModule,
    } = this.props
    if (!tableData || tableData.length === 0) return ""
    return (
      <React.Fragment>
        {this.state.downloadCsv === true && <Loader />}
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
          selectedDate={format(this.state.salesDate, "yyyy-MM-dd")}
        />
        <TankStatusModal
          open={this.state.tankStatusModal}
          handleClose={() => this.setState({ tankStatusModal: false })}
          modalTitle={`Tank Status`}
          selectedDate={format(this.state.salesDate, "yyyy-MM-dd")}
        />
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <div className="page-header">{headerTitle} </div>
              <div
                className={`${classes.headerText} d-flex justify-content-between align-items-center`}
              >
                <div className="vertical-hr-right">
                {(locationPath === "/retail-customer" || locationPath === "/commercial-customer") &&
                    <>
                    <button
                      className="btn btn-outline-primary excel-btn-container"
                      id='CsvUploadDownload'
                      // disabled={this.state.loader}
                    >
                      <div className="excel-download-btn">
                        <span className="download-icon-csv">
                          <CustomCSVIcon />
                        </span>
                          <span className="download-button-message-csv">
                            CSV File
                          </span>
                          <div className="arrow-down" />
                      </div>
                    </button>
                    <Popover
                            target="CsvUploadDownload"
                            placement="bottom"
                            isOpen={this.state.showDownloadOption}
                            trigger="legacy"
                            style={{ width: "150px", textAlign: 'left', boxShadow: '#ccc 2px 1px 10px' }}
                            toggle={() => this.setState({showDownloadOption: !this.state.showDownloadOption})}
                          >
                            <PopoverBody className='mainCsv'>
                              <div className="csvDropdown">
                                <p onClick={() => this.downloadCSV()}>Download CSV</p>
                                <p onClick={() => this.uploadCSV()}>Upload CSV</p>
                              </div>
                            </PopoverBody>
                          </Popover>
                    </>
                  }
                  <DownloadExcelButton subModule={subModule} />
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
                      <div className={`table-top-bar`}>
                        <div className={`top-page-number ${locationPath === "/sales-inventory" && 'sales-first'}`}>
                          <div className="enteriesText">
                            {`${currentPage * rowsPerPage + 1} to ${
                              tableData.total_rows -
                                (currentPage * rowsPerPage + rowsPerPage) <
                              0
                                ? tableData.total_rows
                                : currentPage * rowsPerPage + rowsPerPage
                            } of ${tableData.total_rows} entries${locationPath === "/sales-inventory" ? ", 78 record exceeds variance threshold": ""}`}
                          </div>
                        </div>
                        {locationPath === "/sales-inventory" && (
                          <div className={`d-flex align-items-center w-100 ${locationPath === "/sales-inventory" && 'border-left flex-50' }`}>
                            <div className="col-4 p-0 d-flex align-items-center">
                              <label className="mb-0 pr-2">DATE</label>
                              <DatePicker
                                value={this.state.salesDate}
                                onChange={this.onSalesDateChange}
                                endDate={new Date()}
                                startDate={subDays(new Date(), 30)}
                              />
                            </div>
                            <div className="col-8 p-0 d-flex align-items-center">
                              <label className="mb-0 pr-2 w-min">REGION & TERMINAL</label>
                              <div className="d-flex w-100">
                                <div className="col-4 p-0">
                                  <AWSMDropdown
                                    placeholder=""
                                    items={REGION_TERMINAL
                                      .filter((option)=> option.region !== "Special Product")
                                      .map(e => e.region)}
                                    value={this.state.region}
                                    onChange={this.onRegionChange}
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
                                    onChange={this.onTerminalChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {locationPath === "/sales-inventory" && <div className='flex-20'></div>}
                        <div className={`d-flex align-items-center ${locationPath === "/sales-inventory" && 'sales-first'}`}>
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
                 <AWSMAlert
                    status={this.state.csvStatus}
                    message={this.state.csvMessage}
                    openAlert={this.state.csvAlert}
                    closeAlert={() => this.setState({ csvAlert: false })}
                  />
            </Row>
            {(this.state.openCsvModal === true || this.state.downloadCsv === true) &&
              <CsvFileUpload
                currentPage = {locationPath}
                isOpen={this.state.openCsvModal}
                toggle={this.toggleCsvModal}
                getListCall={() => this.getCustomerData()}
                callDownloadCsv={this.state.downloadCsv}
                toggleDownloadCsv={() => this.setState({downloadCsv: false})}
                alertShow={this.csvAlertShow}
              />
            }
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
  onGetTableInformation: PropTypes.func.isRequired,
  onUpdateTableInformation: PropTypes.func.isRequired,
  tableColumns: PropTypes.array.isRequired,
  tableMapping: PropTypes.object.isRequired,
  tableData: PropTypes.object.isRequired,
  filter: PropTypes.array.isRequired,
  headerTitle: PropTypes.string.isRequired,
  cardTitle: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  modalComponent: PropTypes.element,
  onGetDownloadCustomer: PropTypes.func.isRequired,
  frozenColNum: PropTypes.number,
  varianceControlData: PropTypes.object,
  overrideActionColumn: PropTypes.func,
  subModule: PropTypes.string.isRequired,
}

Pages.defaultProps = {
  frozenColNum: 1,
}

export default withStyles(styles)(Pages)