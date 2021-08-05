import React, { Component } from "react"
import PropTypes from "prop-types"
import ArrowLeft from "../../../assets/images/arrow-left.png"
import ArrowLeftG from "../../../assets/images/arrow-left-grey.png"
import ArrowRight from "../../../assets/images/arrow-right.png"
import ArrowRightG from "../../../assets/images/arrow-right-grey.png"
import { Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { Divider } from "@material-ui/core"
import "./tablePagination.scss"

class TablePaginationActions extends Component {
  handleBackButtonClick = event => {
    const { increment } = this.props
    const calcPage = this.props.currentPage - increment
    const newPage = calcPage > 0 ? calcPage : 0
    this.props.onChangePage(event, newPage)
  }

  handleNextButtonClick = event => {
    const { increment, totalPages } = this.props
    const calcPage = this.props.currentPage + increment
    const newPage = calcPage > 0 ? calcPage : totalPages
    this.props.onChangePage(event, newPage)
  }

  handlePageNumClick = event => {
    this.props.onChangePage(event, event.target.value - 1)
  }

  render() {
    const { classes, count, currentPage, rowsPerPage } = this.props
    let pageNumbers = []

    for (let i = 1; i <= Math.ceil(count / rowsPerPage); i++) {
      pageNumbers.push(i)
    }
    const newpageNumbers = pageNumbers.splice(currentPage, 20)
    return (
      <Pagination>
        <div className="Pagination-Container">
          <PaginationItem disabled={currentPage === 0}>
            <PaginationLink
              onClick={this.handleBackButtonClick}
              aria-label="Previous Page"
              className="Pagination-Button Pagination-First-Button"
            >
              <img
                src={currentPage === 0 ? ArrowLeftG : ArrowLeft}
                alt=""
                className="img-arrow"
              />
            </PaginationLink>
          </PaginationItem>
          <Divider
            orientation="vertical"
            flexItem
            light
            className="Pagination-Divider"
          />
          {newpageNumbers.map(number => (
            <PaginationItem
              active={number - 1 === currentPage}
              key={Math.random().toString(36).substr(2, 9)}
            >
              <PaginationLink
                className="Pagination-Button"
                value={number}
                onClick={() => this.props.onChangePage(event, number - 1)}
                onMouseDown={e => e.preventDefault()}
              >
                <span className="Pagination-Text">{number}</span>
              </PaginationLink>
            </PaginationItem>
          ))}
          <Divider
            orientation="vertical"
            flexItem
            light
            className="Pagination-Divider"
          />
          <PaginationItem
            disabled={currentPage >= Math.ceil(count / rowsPerPage) - 1}
          >
            <PaginationLink
              onClick={this.handleNextButtonClick}
              aria-label="Next Page"
              className="Pagination-Button"
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
  increment: PropTypes.number,
}

TablePaginationActions.defaultProps = {
  increment: 1,
}

export default TablePaginationActions
