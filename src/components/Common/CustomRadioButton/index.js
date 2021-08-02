import React from 'react'
import PropTypes from "prop-types"
import "./custom-radio-button.scss"

const CustomRadioButton = ({ size = 16, style, onChange, onClick, classes = "", checked, label, name, value }) => {
	const handleChange = onChange ? onChange : (event) => { }
	const handleClick = onClick ? onClick : (event) => { }

	const customButtonStyles = {
		fontSize: "0.8rem",
		fontWeight: 400,
		...style
	}

	const customCheckMarkStyles = {
		width: `${size}px`,
		height: `${size}px`,
	}

	return (
		<label className={`d-block custom-radio-button position-relative user-select-none rounded-circle ml-3 ${classes}`} style={customButtonStyles}>{label}
			<input type="radio" className="position-absolute" checked={checked} value={value} name={name} onClick={handleClick} onChange={handleChange} />
			<div className="check-mark position-absolute d-flex justify-content-center align-items-center rounded-circle" style={customCheckMarkStyles} />
		</label>
	)
}

export default CustomRadioButton
CustomRadioButton.propTypes = {
	size: PropTypes.number,
	style: PropTypes.object,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	classes: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
}