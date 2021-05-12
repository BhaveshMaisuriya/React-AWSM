import React, { Component } from "react"
import Header from "../../../components/Common/CustomPageHeader"
import SearchBar from "../../../components/Common/SearchBar"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
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
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"
// import { tableColumns, tableMapping } from "./tableMapping"
import CustomizeTableModal from "../../../common/CustomizeTable"
import {
  transformArrayToString,
  transformObjectToStringSentence,
  filterObject,
} from "./helper"
import "./style.scss"

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
      selectedItem: 0
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
  }

  getCustomerData = () => {
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
    onGetCustomer(params)
  }

  getRetailFilterData = filterKey => {
    const { onGetFilter, tableMapping } = this.props
    const { q } = this.state
    const params = {
      q: transformObjectToStringSentence(q),
      search_fields: tableMapping[filterKey].apiKey,
    }

    onGetFilter(params)
  }

  handleChangePage = (event, currentPage) => {
    this.setState({ currentPage }, () => this.getCustomerData())
  }

  handleSearchBox = searchedVal => {
    this.setState({ searchTerm: searchedVal })
  }

  handleHeaderSort = (sortField, sortDir) => {
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
      <Modal isOpen={this.state.modal} contentClassName="modalContainer">
        <ModalHeader toggle={this.toggle}>
          <h3 style={{ paddingLeft: "15px" }}>Audit Log</h3>
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
  modalHandlerTI = (e) => {
    const newState = {
      modalTI: true
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
    const modalContent = modalTI && ModalComponent ? (
    <ModalComponent 
      data={this.props.tableData.list[this.state.selectedItem]}
      visible={modalTI}
      onCancel={this.toggleTI} />
      ) : null
    return modalContent
  }

  render() {
    const { currentPage, rowsPerPage, searchFields } = this.state
    const {
      tableData,
      classes,
      filter,
      tableMapping,
      cardTitle,
      headerTitle,
    } = this.props
    if (!tableData || tableData.length === 0) return ""
    return (
      <React.Fragment>
        <CustomizeTableModal
          tableName={this.props.tableName}
          onChange={this.onTableColumnsChange}
          open={this.state.customizeModalOpen}
          closeDialog={this.handleOpenCustomizeTable}
          availableMetric={tableMapping}
          defaultMetric={searchFields}
        />
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <Header title={headerTitle} />
              <div className={classes.headerText}>
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
                      <div className="d-flex justify-content-between align-items-center">
                        <SearchBar
                          searchOnClickHandler={this.getCustomerData}
                          searchOnChangeHandler={this.handleSearchBox}
                        />
                        <button
                          className="btn btn-outline-primary"
                          onClick={this.handleOpenCustomizeTable}
                        >
                          Customize
                        </button>
                      </div>
                      <div className="enteriesText">{`${
                        currentPage * rowsPerPage + 1
                      } to ${
                        tableData.totalRows -
                          (currentPage * rowsPerPage + rowsPerPage) <
                        0
                          ? tableData.totalRows
                          : currentPage * rowsPerPage + rowsPerPage
                      } of ${tableData.totalRows} enteries`}</div>
                      <FixedColumnTable
                        headers={searchFields}
                        config={tableMapping}
                        tableData={tableData.list}
                        frozen={1}
                        filterData={filter}
                        headerSortHandler={this.handleHeaderSort}
                        filterDropdownHandler={this.getRetailFilterData}
                        filterApplyHandler={this.handleQueryParameterChange}
                        modalPop={this.modalHandlerTI}
                      />
                      <TablePagination
                        count={tableData.totalRows}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        onChangePage={this.handleChangePage}
                      />
                    </CardBody>
                  }
                </Card>
              </Col>
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
  onGetFilter: PropTypes.func.isRequired,
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
  modalComponent: PropTypes.element
}

export default withStyles(styles)(Pages)
