import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "../../../assets/images/AWSM-search.svg"

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: "40px",
    width: "376px",
    border: "1px solid #D9D9D9",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
    marginTop: "20px",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: "13px",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: "",
    }
  }

  handleSearchOnClick = () => {
    const { searchOnClickHandler } = this.props
    const { searchTerm } = this.state
    if (searchTerm !== "") searchOnClickHandler()
  }

  handleSearchOnChange = searchTerm => {
    const { searchOnChangeHandler } = this.props
    this.setState({ searchTerm }, () => searchOnChangeHandler(searchTerm))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search"
          onChange={inputValue =>
            this.handleSearchOnChange(inputValue.target.value)
          }
        />
        <IconButton
          className={classes.iconButton}
          aria-label="Search"
          onClick={this.handleSearchOnClick}
        >
          <img src={SearchIcon} alt="" className="rounded-circle" />
        </IconButton>
      </div>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  searchOnClickHandler: PropTypes.func,
  searchOnChangeHandler: PropTypes.func,
}

SearchBar.defaultProps = {
  searchOnClickHandler: () => {},
  searchOnChangeHandler: () => {},
}

export default withStyles(styles)(SearchBar)
