import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default class MultipleSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      personName: ["Multiproduct", "Long Haul"],
      isDeleteBtnShow: true
    }
  }

  render() {
    const {names} = this.props
    const { 
      personName, 
      isDeleteBtnShow
    } = this.state;
    
    const handleChange = (event) => {
      this.setState({personName: event.target.value});
    };

    const onDeleteClick = () => {
      const {isDeleteBtnShow} = this.state
      this.setState({isDeleteBtnShow: !isDeleteBtnShow})
    }

    const showDeleteBtn = () => {
      const deleteBtn = isDeleteBtnShow ?
        <a
          onClick = {
            () => {
              onDeleteClick()
            }
          }
          type= "button"
          className = "delete-btn"
          id = "delete"
         > Delete
        </a> :
        <div>
          <div>
            <a type="button" className="delete-btn">Yes</a>
          </div>
          <div>
            <a type="button" className="delete-btn">No</a>
          </div>
        </div>

      return deleteBtn
    }

    return (
        <Select
          className="form-control popup"
          multiple
          value={ personName }
          onChange = { handleChange }
          renderValue={(selected) => selected.join(', ')}
        >
          {names.map((name) => (
              <MenuItem key={name} value={name}>
                <ListItemIcon>
                    <Checkbox
                      checked={personName.indexOf(name) !== -1}
                    />
                </ListItemIcon>
                <ListItemText id={name} primary={name}/>
              </MenuItem>
          ))}
          {
            showDeleteBtn()
          }       
        </Select>
  );
  }
}