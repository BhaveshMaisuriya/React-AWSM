import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
import Header from "../../../components/Common/CustomPageHeader"
import Table from "../../../components/Common/DataTable"
import SearchBar from "../../../components/Common/SearchBar"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import { withStyles } from "@material-ui/core/styles"
import ModalPagination from "../../../components/Common/AuditLog/auditModalPagination"
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
// import searchIcon from "../../../assets/images/search.svg"
import {
  getRetailCustomer,
  getRetailAuditLog,
  getRetailFilter,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"
import { tableColumns, tableMapping } from "./tableMapping"
import {
  transformArrayToString,
  transformObjectToStringSentence,
  filterObject,
} from "./helper"
import TableInformation from "../../../components/Common/TableInformation"
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
class RetailCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0,
      rowsPerPage: 10,
      searchTerm: "",
      sortField: "",
      sortDir: "",
      searchFields: tableColumns,
      q: {},
      rowsAudit: 6,
      currentAuditPage: 0,
      modal: false,
      modalTI: false,
    }
    this.toggle = this.toggle.bind(this)
    this.toggleTI = this.toggleTI.bind(this)
  }

  componentDidMount() {
    const {
      onGetRetailCustomer,
      onGetRetailAuditLog,
      onGetTableInformation,
      // onGetRetailFilter,
    } = this.props
    const { searchFields, q } = this.state
    // sessionStorage.setItem("q", {})
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "site_to_party",
      search_fields: transformArrayToString(searchFields),
    }

    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
    }
    onGetRetailCustomer(params)
    onGetRetailAuditLog(payload)
    onGetTableInformation()
  }

  getRetailCustomerData = () => {
    const { onGetRetailCustomer } = this.props
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
    onGetRetailCustomer(params)
  }

  getRetailFilterData = filterKey => {
    const { onGetRetailFilter } = this.props
    const { q } = this.state
    const params = {
      q: transformObjectToStringSentence(q),
      search_fields: tableMapping[filterKey].apiKey,
    }

    onGetRetailFilter(params)
  }

  handleChangePage = (event, currentPage) => {
    this.setState({ currentPage }, () => this.getRetailCustomerData())
  }

  handleSearchBox = searchedVal => {
    this.setState({ searchTerm: searchedVal })
  }

  handleHeaderSort = (sortField, sortDir) => {
    this.setState({ sortField, sortDir }, () => this.getRetailCustomerData())
  }

  handleQueryParameterChange = (qValue, type) => {
    const { q } = this.state
    let newQ = {}
    if (type === "insert") {
      newQ = { ...q, ...qValue }
    } else if (type === "remove") {
      newQ = { ...filterObject(q, qValue) }
    }
    this.setState({ q: newQ }, () => this.getRetailCustomerData())
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
  runModal = () => {
    const { modal, rowsAudit, currentAuditPage } = this.state
    const { audits } = this.props
    const modalContent = modal ? (
      <Modal isOpen={this.state.modal} contentClassName="modalContainer">
        <ModalHeader toggle={this.toggle}>
          <h3 style={{ paddingLeft: "30px", paddingTop: "15px" }}>Audit Log</h3>
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

  render() {
    const { retailCustomer, classes, filter } = this.props
    const { currentPage, rowsPerPage, modalTI } = this.state
    if (!retailCustomer || retailCustomer.length === 0) return ""
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <Header title="Retail Customer" />
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
                        {"Retail Customer List"}
                      </CardTitle>
                      <Divider />
                      <div>
                        <SearchBar
                          searchOnClickHandler={this.getRetailCustomerData}
                          searchOnChangeHandler={this.handleSearchBox}
                        />
                      </div>
                      <div className="enteriesText">{`${
                        currentPage * rowsPerPage + 1
                      } to ${
                        retailCustomer.totalRows -
                          (currentPage * rowsPerPage + rowsPerPage) <
                        0
                          ? retailCustomer.totalRows
                          : currentPage * rowsPerPage + rowsPerPage
                      } of ${retailCustomer.totalRows} enteries`}</div>

                      <Table
                        data={retailCustomer.list}
                        clickableCell={"ship_to_party"}
                        currentPage={currentPage}
                        headerSortHandler={this.handleHeaderSort}
                      />
                      {/* <FixedColumnTable
                        headers={tableColumns}
                        config={tableMapping}
                        tableData={retailCustomer.list}
                        frozen={1}
                        filterData={filter}
                        headerSortHandler={this.handleHeaderSort}
                        filterDropdownHandler={this.getRetailFilterData}
                        filterApplyHandler={this.handleQueryParameterChange}
                        modalPop={this.modalHandlerTI}
                      /> */}
                      <TablePagination
                        count={retailCustomer.totalRows}
                        rowsPerPage={rowsPerPage}
                        currentPage={currentPage}
                        onChangePage={this.handleChangePage}
                      />
                    </CardBody>
                  }
                </Card>
              </Col>
            </Row>
            {this.runModal()}
            {this.runTableInformation()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ retailCustomer }) => ({
  retailCustomer: retailCustomer.retailCustomers,
  audits: retailCustomer.audits,
  filter: retailCustomer.filter,
  address: retailCustomer.address,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
  onGetRetailAuditLog: payload => dispatch(getRetailAuditLog(payload)),
  onGetRetailFilter: payload => dispatch(getRetailFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RetailCustomer))
