import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
// import Divider from "@material-ui/core/Divider"
import { Link } from "react-router-dom"
// import HeaderDropdown from "./headerDropdown"
import HeaderColumns from "./HeaderConfig"
import { isEmpty } from "lodash"
import { Table, Input, Modal, ModalHeader } from "reactstrap"
import ColumnOrder from "./HeaderConfig"
import SimpleBar from "simplebar-react"
import "./datatable.scss"
import Filter from "./filter"
import { element } from "prop-types"
import {
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import TableInformation from "../../../components/Common/TableInformation"

class DataTable2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: "asc",
      orderBy: "ship_to_party",
      // page: 0,
      // rowsPerPage: 10,
      searchTerm: "",
      dataRows: this.props.data,
      modal: false,
      event: {},
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount = () => {
    const { onGetTableInformation } = this.props
    onGetTableInformation()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { event, modal } = this.state
    if (prevState.modal !== modal && !modal && !isEmpty(event)) {
      setTimeout(() => {
        this.setState({ event: {}, isEdit: false })
      }, 500)
    }
  }

  createSortHandler = property => event => {
    const { headerSortHandler } = this.props
    const orderBy = property
    let order = "desc"

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc"
    }
    this.setState({ order, orderBy })
    headerSortHandler(order, orderBy)
  }

  // desc(a, b, orderBy) {
  //   if (b[orderBy] < a[orderBy]) {
  //     return -1
  //   }
  //   if (b[orderBy] > a[orderBy]) {
  //     return 1
  //   }
  //   return 0
  // }

  // stableSort(array, cmp) {
  //   const stabilizedThis = array.map((el, index) => [el, index])
  //   stabilizedThis.sort((a, b) => {
  //     const order = cmp(a[0], b[0])
  //     if (order !== 0) return order
  //     return a[1] - b[1]
  //   })
  //   return stabilizedThis.map(el => el[0])
  // }

  // getSorting(order, orderBy) {
  //   return order === "desc"
  //     ? (a, b) => this.desc(a, b, orderBy)
  //     : (a, b) => -this.desc(a, b, orderBy)
  // }

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
   * Will run the table information modal
   */
  runTableInformation = () => {
    const { modal } = this.state
    const { address } = this.props
    // const { audits } = this.props
    const modalContent = modal ? (
      <Modal isOpen={this.state.modal} contentClassName="modalTIContainer">
        <ModalHeader toggle={this.toggle}>
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
            closeModal={this.closeHandler}
            data={address}
            dataList={address.list}
          />
        </div>
      </Modal>
    ) : null
    return modalContent
  }

  render() {
    const { clickableCell } = this.props
    const { order, orderBy, dataRows } = this.state
    // const columns = data[0] && Object.keys(data[0])
    const handleClickApply = (checkedFilter, dataKey) => {
      let data = []
      for (let i = 0; i < checkedFilter.length; i++) {
        let newDataRows = [...dataRows].filter(
          data => data[dataKey] === checkedFilter[i].text
        )
        data = [...data, ...newDataRows]
      }
      this.setState({ dataRows: data })
    }
    return (
      <React.Fragment>
        <div className="table-responsive">
          <SimpleBar style={{ height: "100%" }} autoHide={false}>
            <Table className="table">
              <thead className="tableHeader">
                <tr>
                  {HeaderColumns.map(heading => (
                    <th
                      key={heading.key}
                      aria-sort={orderBy === heading.key ? order : false}
                    >
                      <div className="tableHeaderCell">
                        <span
                          onClick={this.createSortHandler(heading.key)}
                          className="text"
                        >
                          {heading.label}
                        </span>
                        <Filter
                          dataFilter={dataRows.map(data => data[heading.key])}
                          dataKey={heading.key}
                          handleClickApply={handleClickApply}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* {this.stableSort(dataRows, this.getSorting(order, orderBy))
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  ) */}
                {dataRows.map((row, i) => (
                  <tr key={i} className="tableRow">
                    {ColumnOrder.map(column =>
                      column.key === clickableCell ? (
                        <td className="tableCell">
                          <Link
                            to="#"
                            onClick={() => {
                              this.modalHandler()
                            }}
                          >
                            <span className="text">{row[column.key]}</span>
                          </Link>
                        </td>
                      ) : (
                        <td className="tableCell">
                          <span className="text">{row[column.key]}</span>
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </SimpleBar>
          {this.runTableInformation()}
        </div>
      </React.Fragment>
    )
  }
}

DataTable2.propType = {
  data: PropTypes.array.isRequired,
  clickableCell: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  headerSortHandler: PropTypes.func,
  address: PropTypes.array,
  onGetTableInformation: PropTypes.func,
  onUpdateTableInformation: PropTypes.func,
}

DataTable2.defaultProps = {
  headerSortHandler: () => {},
}

const mapStateToProps = ({ retailCustomer }) => ({
  address: retailCustomer.address,
})

const mapDispatchToProps = dispatch => ({
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DataTable2)
