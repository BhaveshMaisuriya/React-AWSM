import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default class MultipleSelect extends Component {
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
    const {
      names,
      isDeleteBtnShow,
      onConfirmClick,
      onDeleteBtnClick,
      onNoClick,
    } = this.props;
    const {
      RtRestrictionSelected,
    } = this.state;

    const handleChange = (event) => {
      const { onChange } = this.props;
      this.setState({ RtRestrictionSelected: event.target.value },
        () => onChange(this.state.RtRestrictionSelected));
    };

    const showDeleteBtn = (_name) => {
      const deleteBtn = isDeleteBtnShow ?
        (
          <div>
            <a
              type="button"
              onClick={() => onDeleteBtnClick()}
              className="delete-btn"
              id="delete"
              role="button"
            > Delete
            </a>
          </div>) :
        (<div className="yes-noBtn">
          <a
            type="button"
            onClick={() => {
              onConfirmClick()
            }
            }
            className="confirm">
            Confirm |
          </a>
          <a
            type="button"
            onClick={() => onNoClick()}
            className="No">
            No
          </a>
        </div>)

      return deleteBtn
    }

    return (
      <Select
        className="form-control popup"
        multiple
        value={RtRestrictionSelected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
      >
        {names?.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemIcon>
              <Checkbox
                checked={RtRestrictionSelected.indexOf(name) !== -1}
              />
            </ListItemIcon>
            <ListItemText id={name} primary={name} />
            {
              name === names[names.length - 1] ?
                showDeleteBtn(name)
                : null
            }
          </MenuItem>
        ))}
      </Select>
    );
  }
}