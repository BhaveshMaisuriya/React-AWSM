import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/styles"
import InputBase from "@material-ui/core/InputBase"

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: "40px",
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "#FFFFFF",
  },
  input: {
    marginLeft: 8,
    flex: 1,
    border: `none !important`,
    caretColor: "#00A19C",
  },
}
class InputWithSuffix extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onActive: false,
    }
    this.inputElement = React.createRef()
  }

  handleEditOnClick = () => {
    this.setState({ onActive: true }, () => this.inputElement.click())
  }

  handleOnchangeValue = value => {
    const { index, fieldName, TextOnChangeValue } = this.props
    TextOnChangeValue(value, index, fieldName)
  }

  handleHiddenBorder = () => {
    this.setState({ onActive: false })
  }

  handleEnterKeyPress = event => {
    if (event.key === "Enter") {
      this.handleHiddenBorder()
    }
  }

  render() {
    const { onActive } = this.state
    const { classes, inputType, value, isEdit, disable } = this.props

    return (
      <div
        className={`${classes.root} tank_status ${disable ? "disabled" : ""}`}
        style={{
          border:
            onActive || inputType == "baseInput"
              ? `1px solid ${onActive ? "#00A19C" : "#D9D9D9"}`
              : "none",
          background: `${onActive ? "#F0F9F9" : "none"}`,
        }}
      >
        {!onActive ? (
          <span className={`readonly-field`}>{value || "-"}</span>
        ) : (
          <InputBase
            onBlur={this.handleHiddenBorder}
            ref={input => (this.inputElement = input)}
            className={classes.input}
            placeholder="value"
            onChange={e => this.handleOnchangeValue(e.target.value)}
            value={value}
            onKeyPress={this.handleEnterKeyPress}
          />
        )}
        {!onActive && (value || value === "") && isEdit && (
          <button
            className="button-edit"
            onClick={() => this.handleEditOnClick()}
          >
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="Page-1"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="AWSM-Calendar"
                  transform="translate(-3.000000, -3.000000)"
                  fill="#999999"
                  fillRule="nonzero"
                >
                  <g id="edit" transform="translate(3.000000, 3.000000)">
                    <path
                      d="M5.80501568,0.801722837 C6.03603996,0.801722837 6.22327743,0.988960305 6.22327743,1.21998459 C6.22327743,1.42533948 6.07533672,1.59609744 5.88020526,1.6315084 L5.80501568,1.63824635 L2.09130878,1.63824635 C1.44185937,1.6390122 0.908006974,2.13232188 0.843139225,2.76478774 L0.836523512,2.89303162 L0.836523512,13.7925081 C0.837289362,14.4418044 1.33059904,14.9757908 1.9630649,15.0406759 L2.09130878,15.0472934 L13.8273089,15.0472934 C14.4767583,15.0465276 15.0106106,14.5530743 15.0754784,13.9207251 L15.0820941,13.7925081 L15.0820941,10.0786379 C15.0820941,9.84761359 15.2693316,9.66037612 15.5003559,9.66037612 C15.7057108,9.66037612 15.8764687,9.80844592 15.9118797,10.0036061 L15.9186176,10.0788012 L15.9186176,13.7925081 C15.9173674,14.8967817 15.0613614,15.8007452 13.9765912,15.8784072 L13.8273089,15.8838169 L2.09130878,15.8838169 C0.987035252,15.8825667 0.0830717083,15.0265607 0.00540977049,13.9417905 L3.90798505e-14,13.7925081 L3.90798505e-14,2.89303162 C0.00125023894,1.78875805 0.857256248,0.884794542 1.94202641,0.807132607 L2.09130878,0.801722837 L5.80501568,0.801722837 Z M6.14665058,8.24890606 L7.72036044,9.82261592 L5.54376549,10.425501 L6.14665058,8.24890606 Z M12.6473532,1.35216183 L14.6169413,3.32174992 L8.5098295,9.42902508 L6.54024146,7.459437 L12.6473532,1.35216183 Z M13.6827144,0.316963987 C14.0913366,-0.090677852 14.7528764,-0.090677852 15.1614985,0.316963987 L15.1614985,0.316963987 L15.6523025,0.807768016 C16.0601077,1.21639013 16.0601077,1.87792995 15.6523025,2.28655207 L15.6523025,2.28655207 L15.2087163,2.73013828 L13.2391283,0.760550195 Z"
                      id="Combined-Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        )}
      </div>
    )
  }
}

InputWithSuffix.propTypes = {
  classes: PropTypes.object.isRequired,
  TextOnChangeValue: PropTypes.func,
  value: PropTypes.any,
  placeHolder: PropTypes.string,
  inputType: PropTypes.string,
  index: PropTypes.number,
  fieldName: PropTypes.string,
  isEdit: PropTypes.bool,
  disable: PropTypes.bool,
}

InputWithSuffix.defaultProps = {
  TextOnChangeValue: () => {},
}

export default withStyles(styles)(InputWithSuffix)
