import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from 'assets/images/AWSM-search.svg'
import { isEqual } from 'lodash'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    height: '40px',
    width: '376px',
    border: '1px solid #D9D9D9',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    // marginTop: "20px",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    fontSize: '13px',
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
      searchBoxTextValue: '',
      searchedTerm: '',
    }
  }

  handleSearchOnClick = () => {
    const { searchOnClickHandler } = this.props
    const { searchBoxTextValue, searchedTerm } = this.state
    if (!isEqual(searchBoxTextValue, searchedTerm))
      this.setState({ searchedTerm: searchBoxTextValue }, () =>
        searchOnClickHandler()
      )
  }

  getEnterClick = e => {
    if (e.key === 'Enter') {
      this.handleSearchOnClick()
    }
  }

  handleSearchOnChange = searchBoxTextValue => {
    const { searchOnChangeHandler } = this.props
    this.setState({ searchBoxTextValue }, () =>
      searchOnChangeHandler(searchBoxTextValue)
    )
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
          onKeyDown={e => this.getEnterClick(e)}
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
