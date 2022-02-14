import Checkbox from '@material-ui/core/Checkbox'
import selectAllIcon from 'assets/images/AWSM-Select-all-Checkbox.svg'
import selectAllIcon2 from 'assets/images/AWSM-Checked-box.svg'
import selectAllIcon3 from 'assets/images/AWSM-Checkbox.svg'

const CustomCheckbox = props => {
  const {
    checked = true,
    selectAll = false,
    onClick = () => {},
    style = {},
    disabled = false,
    value,
  } = props
  const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
  const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />
  const UndeterminateIcon = () => <img src={selectAllIcon} alt="icon" />
  const onClickHandler = event => {
    onClick(event)
  }
  return (
    <Checkbox
      checked={checked}
      value={value}
      icon={selectAll ? <UndeterminateIcon /> : <UntickIcon />}
      checkedIcon={<CheckedIcon />}
      onChange={onClickHandler}
      disabled={disabled}
      style={style}
    />
  )
}

export default CustomCheckbox
