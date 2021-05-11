import React, { Component } from "react"
import { connect } from "react-redux"
// import PropTypes from "prop-types"
import Header from "../../../components/Common/CustomPageHeader"
// import Table from "../../../components/Common/DataTable"
import SearchBar from "../../../components/Common/SearchBar"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import { withStyles } from "@material-ui/core/styles"
// import ModalPagination from "../../../components/Common/AuditLog/auditModalPagination"
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
  getCommercialAuditLog,
} from "../../../store/actions"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"
import { tableColumns, tableMapping } from "./tableMapping"
import CustomizeTableModal from "../../../common/CustomizeTable"
import {
  transformArrayToString,
  transformObjectToStringSentence,
} from "./helper"
import "./style.scss"

// Dummy

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
class CommercialCustomer extends Component {
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
      customizeModalOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    const { onGetRetailCustomer, onGetCommercialAuditLog } = this.props
    const { searchFields } = this.state
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
      q: "commercial_customer",
    }
    onGetRetailCustomer(params)
    onGetCommercialAuditLog(payload)
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

  handleChangePage = (event, currentPage) => {
    this.setState({ currentPage }, () => this.getRetailCustomerData())
  }

  handleSearchBox = searchedVal => {
    this.setState({ searchTerm: searchedVal })
  }

  handleHeaderSort = (sortField, sortDir) => {
    this.setState({ sortField, sortDir }, () => this.getRetailCustomerData())
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
    this.setState((prevState) => ({
      customizeModalOpen: !prevState.customizeModalOpen
    }))
  }

  onTableColumnsChange = (columns) => {
    console.log({ columns })
  }
  /**
   * Will run the audit log modal
   */
  runModal = () => {
    const { modal, rowsAudit, currentAuditPage } = this.state
    const { auditsCom } = this.props
    const modalContent = modal ? (
      <Modal isOpen={this.state.modal} contentClassName="modalContainer">
        <ModalHeader toggle={this.toggle}>
          <h3 style={{ paddingLeft: "30px", paddingTop: "15px" }}>Audit Log</h3>
        </ModalHeader>
        <AuditLog
          rowsAudit={rowsAudit}
          currentAuditPage={currentAuditPage}
          data={auditsCom.list}
          closeModal={this.closeHandler}
          handlePageChange={this.handleChangeAuditPage}
        />
      </Modal>
    ) : null
    return modalContent
  }

  render() {
    const { currentPage, rowsPerPage } = this.state
    const { retailCustomer, classes } = this.props
    if (!retailCustomer || retailCustomer.length === 0) return ""
    return (
      <React.Fragment>
        <CustomizeTableModal tableName="commercial-table"
                             onChange={this.onTableColumnsChange}
                             open={this.state.customizeModalOpen}
                             closeDialog={this.handleOpenCustomizeTable}
                             availableMetric={tableMapping}
                             defaultMetric={tableColumns} />
        <div className="page-content">
          <div className="container-fluid">
            <div className={classes.modalHeader}>
              <Header title="Commercial Customer" />
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
                        {"Commercial Customer List"}
                      </CardTitle>
                      <Divider />
                      <div className="d-flex justify-content-between align-items-center">
                        <SearchBar
                          searchOnClickHandler={this.getRetailCustomerData}
                          searchOnChangeHandler={this.handleSearchBox}
                        />
                        <button className="btn btn-outline-primary" onClick={this.handleOpenCustomizeTable}>Customize</button>
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
                      {/* <FixedColumnTable
                        headers={tableColumns}
                        config={tableMapping}
                        data={retailCustomer.list}
                        frozen={1}
                        headerSortHandler={this.handleHeaderSort}
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
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ commercialCustomer }) => ({
  retailCustomer: commercialCustomer.retailCustomers,
  auditsCom: commercialCustomer.auditsCom,
})

const mapDispatchToProps = dispatch => ({
  onGetRetailCustomer: params => dispatch(getRetailCustomer(params)),
  onGetCommercialAuditLog: payload => dispatch(getCommercialAuditLog(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommercialCustomer))
