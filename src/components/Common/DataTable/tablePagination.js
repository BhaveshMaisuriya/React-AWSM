import React, { Component } from "react"
import PropTypes from "prop-types"
import ArrowLeft from "../../../assets/images/arrow-left.png"
import ArrowLeftG from "../../../assets/images/arrow-left-grey.png"
import ArrowRight from "../../../assets/images/arrow-right.png"
import ArrowRightG from "../../../assets/images/arrow-right-grey.png"
import { withStyles } from "@material-ui/core/styles"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { Divider } from "@material-ui/core"

const styles = {
  // root: {
  //   padding: '2px 4px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: 400,
  // },
  // input: {
  //   marginLeft: 8,
  //   flex: 1,
  // },
  // iconButton: {
  //   padding: 10,
  // },
  divider: {
    width: 1,
    height: 28,
    marginTop: 4,
    marginBottom: 4,
  },
}

class TablePaginationActions extends Component {
  // handleFirstPageButtonClick = event => {
  //   this.props.onChangePage(event, 0)
  // }

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.currentPage - 1)
  }

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.currentPage + 1)
  }

  // handleLastPageButtonClick = event => {
  //   this.props.onChangePage(
  //     event,
  //     Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
  //   )
  // }

  handlePageNumClick = event => {
    this.props.onChangePage(event, event.target.value - 1)
  }

  render() {
    const { classes, count, currentPage, rowsPerPage } = this.props
    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(count / rowsPerPage); i++) {
      pageNumbers.push(i)
    }
    const newpageNumbers = pageNumbers.splice(currentPage, 5)
    return (
      <Pagination>
        <div className="Pagination-Container">
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink
              onClick={this.handleBackButtonClick}
              aria-label="Previous Page"
            >
              <img
                src={currentPage === 0 ? ArrowLeftG : ArrowLeft}
                alt=""
                className="img-arrow"
              />
            </PaginationLink>
          </PaginationItem>
          <Divider className={classes.divider} />
          {newpageNumbers.map(number => (
            <PaginationItem
              active={number - 1 === currentPage}
              key={Math.random().toString(36).substr(2, 9)}
            >
              <PaginationLink
                className="Pagination-Button"
                value={number}
                onClick={() => this.props.onChangePage(event, number - 1)}
              >
                <span className="Pagination-Text">{number}</span>
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
              <img
                src={
                  currentPage >= Math.ceil(count / rowsPerPage) - 1
                    ? ArrowRightG
                    : ArrowRight
                }
                alt=""
                className="img-arrow"
              />
            </PaginationLink>
          </PaginationItem>
        </div>
      </Pagination>
    )
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

export default withStyles(styles)(TablePaginationActions)
