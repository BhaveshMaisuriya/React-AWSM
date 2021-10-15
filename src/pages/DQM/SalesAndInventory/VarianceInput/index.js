import { ReactSVG } from "react-svg"
import AWSMEditIcon from "../../../../assets/images/AWSM-Edit-Icon.svg"
import React, { useState, useEffect, useRef } from "react"
import "./VarianceInput.scss"

const VarianceInput = ({ value, disabled = false, onChange }) => {
    const inputRef = useRef(null)
    const [isFocus, setIsFocus] = useState(false)
    useEffect(() => {
        if (isFocus) {
            inputRef.current.focus()
        }
    }, [isFocus])

    const onEditButtonClick = () => {
        setIsFocus(true)
    }

    const onFocus = () => {
        if(inputRef.current && !isFocus){
            inputRef.current.blur()
        }
    }

    const onBlur = () => {
        if (isFocus) {
            setIsFocus(false)
        }
    }

    const onValueChange = event => {
        if (onChange) {
            onChange(event.target.value)
        }
    }

    const onPress = event => {
        if (event.key === 'Enter') {
            inputRef.current.blur();
        }
        const theEvent = event || window.event
        let key = theEvent.keyCode || theEvent.which
        key = String.fromCharCode(key)
        const regex = /[0-9]|\./
        if (!regex.test(key)) {
            theEvent.returnValue = false
            if (theEvent.preventDefault) theEvent.preventDefault()
        }
    }

    return (
        <div className={`variance-input ${isFocus ? "focus" : ""} ${disabled ? "disabled" : ""} input-group`}>
            <input
                className="form-control awsm-input"
                value={value}
                disabled={disabled}
                type="number"
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onValueChange}
                onKeyPress={onPress}
            />

            {!disabled ?
              <div className="input-group-append">
                  <button
                    className="form-control button-edit"
                    disabled={disabled}
                    onClick={onEditButtonClick}
                    type="button"
                    style={{ display: `${isFocus ? "none" : ""}` }}>
                      <ReactSVG src={AWSMEditIcon} />
                  </button>
              </div> : ""
            }

        </div>
    )
}

export default VarianceInput