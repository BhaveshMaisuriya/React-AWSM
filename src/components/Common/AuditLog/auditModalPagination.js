import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { Divider } from "@material-ui/core"
import ArrowLeft from "../../../assets/images/arrow-left.png"
import ArrowLeftG from "../../../assets/images/arrow-left-grey.png"
import ArrowRight from "../../../assets/images/arrow-right.png"
import ArrowRightG from "../../../assets/images/arrow-right-grey.png"

const styles = {
  auditPagination: {
    //  display: "flex",
    //  paddingLeft: "30px",
    //  listStyle: "none",
    //  borderRadius: "0.25rem",
    //  paddingTop: "70px",
    //  paddingBottom: "20px",
    position: "inherit",
    flexDirection: "row",
    height: "36px",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 8%)",
    width: "fit-content",
    marginLeft: "40px",
    marginTop: "70px",
  },
  //paginationButton: {
  // marginRight: "20px",
  //},
  divider: {
    width: 1,
    height: 28,
    marginTop: 4,
    marginBottom: 4,
  },
}

class AuditPagination extends Component {
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.currentPage - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.currentPage + 1)
  }

  handlePageNumClick = event => {
    this.props.onChangePage(event, event.target.value - 1)
  }

  render() {
    const { classes, count, currentPage, rowsPerPage } = this.props
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(count / rowsPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <Pagination className={classes.auditPagination}>
        <PaginationItem disabled={currentPage === 0}>
          <PaginationLink
            onClick={this.handleBackButtonClick}
            aria-label="Previous Page"
          >
            {"<"}
          </PaginationLink>
        </PaginationItem>
        <Divider className={classes.divider} />
        {pageNumbers.map(number => (
          <PaginationItem
            active={number - 1 === currentPage}
            key={Math.random().toString(36).substr(2, 5)}
          >
            <PaginationLink
              value={number}
              onClick={() => this.props.onChangePage(event, number - 1)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <Divider className={classes.divider} />
        <PaginationItem
          disabled={currentPage >= Math.ceil(count / rowsPerPage) - 1}
        >
          <PaginationLink
            onClick={this.handleNextButtonClick}
            aria-label="Next Page"
          >
            {">"}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    )
  }
}

AuditPagination.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default withStyles(styles)(AuditPagination)
