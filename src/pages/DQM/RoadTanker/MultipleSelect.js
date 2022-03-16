import React, { Component } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import './InformationModal.scss'
import AWSMCheckBox from 'common/CheckBox'
import { withStyles } from '@material-ui/styles'

const styles = () => ({
  'p-0': {
    padding: '0!important',
  },
})

class MultipleSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      RtRestrictionSelected: [],
    }
  }

  componentDidMount() {
    const { rtRestrictionSelected } = this.props
    this.setState({ RtRestrictionSelected: rtRestrictionSelected })
  }

  render() {
    const { names, disabled, classes } = this.props
    const { RtRestrictionSelected } = this.state

    const handleChange = event => {
      const { onChange } = this.props
      this.setState({ RtRestrictionSelected: event.target.value }, () =>
        onChange(this.state.RtRestrictionSelected)
      )
    }

    return (
      <Select
        className="form-control awsm-input"
        multiple
        value={RtRestrictionSelected}
        onChange={handleChange}
        renderValue={selected =>
          selected?.length > 0 && selected
            ? selected.join(', ')
            : !disabled && 'Select'
        }
        disabled={disabled}
        displayEmpty={true}
      >
        {names?.map(name => (
          <MenuItem
            key={name}
            value={name}
            className={classes['p-0']}
            disableRipple={true}
            disableGutters={true}
          >
            <ListItemIcon>
              <AWSMCheckBox
                checked={RtRestrictionSelected.indexOf(name) !== -1}
              />
            </ListItemIcon>
            <ListItemText id={name} primary={name} />
          </MenuItem>
        ))}
      </Select>
    )
  }
}

export default withStyles(styles)(MultipleSelect)
