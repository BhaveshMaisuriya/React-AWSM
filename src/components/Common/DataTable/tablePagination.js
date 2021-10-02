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
  constructor(props) {
    super(props)
    this.state = {
      firstPage: 1,
    }
  }
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

  renderPage = pageNo => {
    if (!pageNo) return
    const { currentPage } = this.props
    return (
      <PaginationItem
        active={currentPage === pageNo - 1}
        key={Math.random().toString(36).substr(2, 9)}
      >
        <PaginationLink
          className="Pagination-Button Pagination-Text"
          value={pageNo}
          onClick={this.handlePageNumClick}
        >
          {pageNo}
        </PaginationLink>
      </PaginationItem>
    )
  }

  renderDivider = () => {
    return (
      <Divider
        orientation="vertical"
        flexItem
        light
        className="Pagination-Divider"
      />
    )
  }

  renderPageDots = () => {
    return (
      <PaginationItem disabled>
        <PaginationLink className="Pagination-Button Pagination-Text">
          {"..."}
        </PaginationLink>
      </PaginationItem>
    )
  }

  getPagenumbers = pageNumbers => {
    const { totalPages, currentPage, numShownPages } = this.props
    let newPageNumbers = 0
    if (currentPage < numShownPages - 1)
      newPageNumbers = pageNumbers.splice(0, numShownPages)
    else if (totalPages - currentPage <= numShownPages - 1)
      newPageNumbers = pageNumbers.splice(
        totalPages - numShownPages,
        numShownPages
      )
    else
      newPageNumbers = pageNumbers.splice(
        currentPage - Math.ceil(numShownPages / 3),
        numShownPages - 2
      )
    return newPageNumbers
  }

  render() {
    const { currentPage, totalPages, numShownPages } = this.props
    const { firstPage } = this.state
    let pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    // const newpageNumbers = pageNumbers.splice(currentPage, 20)
    const newpageNumbers = this.getPagenumbers(pageNumbers)
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
                className="img-arrow"
              />
            </PaginationLink>
          </PaginationItem>
          {this.renderDivider()}
          {currentPage >= numShownPages - 1 ? this.renderPage(firstPage) : ""}
          {currentPage >= numShownPages - 1 ? this.renderPageDots() : ""}
          {newpageNumbers.map(number => this.renderPage(number))}
          {totalPages - currentPage > numShownPages - 1 ? this.renderPageDots()
            : ""}
          {totalPages - currentPage > numShownPages - 1 
            ? this.renderPage(totalPages)
            : ""}
          {this.renderDivider()}
          <PaginationItem disabled={currentPage >= totalPages - 1}>
            <PaginationLink
              onClick={this.handleNextButtonClick}
              aria-label="Next Page"
              className="Pagination-Button"
            >
              <img
                src={currentPage >= totalPages - 1 ? ArrowRightG : ArrowRight}
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
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  increment: PropTypes.number,
  numShownPages: PropTypes.number,
}

TablePaginationActions.defaultProps = {
  increment: 1,
  numShownPages: 19,
}

export default TablePaginationActions
