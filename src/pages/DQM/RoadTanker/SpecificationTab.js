import React, { PureComponent } from "react"
import DateRangePicker from "../../../components/Common/DateRangePicker"
import AWSMDropdown from "components/Common/Dropdown"
import { CUSTOMER_TYPE_DROPDOWN_VALUE } from "./constants"
import MultipleSelect from "./MultipleSelect"
import { MODE, PRODUCT_TYPE_IN_ASWM } from "./constants"
import AutoCompleteSearchDropDown from "./AutoCompleteSearchDropDown"

class SpecificationTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRTRestrictionAdding: false,
      restrictionStr: "",
      idDeleteBtnShow: true,
      restrictionCharRemain: 20,
      restrictionVal: '',
      restrictionCode: -1,
    }
  }

  componentDidMount() { }

  onChangeHandler = (value, key) => {
    if(key === 'restriction') {
      this.setState({restrictionVal: value.description});
      this.setState({restrictionCode: value.code});
    }
    const { data, onChange } = this.props
    let newData = { ...data }
    newData[key] = value
    onChange("specification", newData)
  }

  render() {
    const { mode, scheduler, data, toggle } = this.props

    function arrayRemove(arr, value) {
      return arr.filter(function (ele) {
        return ele != value
      })
    }

    const onConfirmClick = () => {
      const { isDeleteBtnShow } = this.state
      let restriction_dropdown = this.props.data?.restriction_dropdown
        ? this.props.data?.restriction_dropdown
        : []

      const name = restriction_dropdown[restriction_dropdown.length - 1]

      let personNames = arrayRemove(restriction_dropdown, name)

      this.onChangeHandler(personNames, "restriction_dropdown")

      this.setState({
        isDeleteBtnShow: !isDeleteBtnShow,
      })
    }

    const onDeleteBtnClick = () => {
      const { isDeleteBtnShow } = this.state
      this.setState({ isDeleteBtnShow: !isDeleteBtnShow })
    }

    const onNoClick = () => {
      const { isDeleteBtnShow } = this.state
      this.setState({ isDeleteBtnShow: !isDeleteBtnShow })
    }

    const onAutoFillBtnClick = () => {
      const { restrictionStr } = this.state
      if (!restrictionStr || restrictionStr.length === 0) {
        this.setState({
          restrictionStr: "New Restriction",
          restrictionCharRemain: 5,
        })
      }
    }

    const rtRestriction = disabled => {
      const {
        isRTRestrictionAdding,
        isDeleteBtnShow,
        restrictionStr,
      } = this.state
      let restriction_dropdown = data?.restriction_code_dropdown
      let restriction = data?.restriction

      const rtRestriction =
        !isRTRestrictionAdding && restriction_dropdown && restriction ? (
          // <MultipleSelect
          //   names={restriction_dropdown}
          //   rtRestrictionSelected={restriction}
          //   isDeleteBtnShow={isDeleteBtnShow}
          //   onDeleteBtnClick={onDeleteBtnClick}
          //   onConfirmClick={onConfirmClick}
          //   onNoClick={onNoClick}
          //   onChange={e => this.onChangeHandler(e, "restriction")}
          //   disabled={disabled}
          // />

          <AutoCompleteSearchDropDown
            value={this.state.restrictionCode}
            items={restriction_dropdown}
            key={this.state.restrictionCode}
            searchIcon={true}
            onChange={e => this.onChangeHandler(e, "restriction")}
            disabled={disabled}
            placeholder='Please select code'
            // error={error_code !== "" && value.code === null}
          />
        ) : (
          <div className="input-group add-restriction">
            <input
              className="form-control awsm-input"
              id="restriction"
              maxLength="20"
              type="text"
              defaultValue={restrictionStr}
              disabled={disabled}
              onChange={() => {
                let rtRestriction = document.getElementById("restriction").value
                let length = rtRestriction.length
                this.setState({ restrictionCharRemain: 20 - length })
              }}
              placeholder={!disabled ? "Select" : ""}
            />
            <div className="input-group-append">
              <a
                className={`form-control btn btn-auto-fill ${disabled ? "disable-link" : null
                  }`}
                type="button"
                onClick={onAutoFillBtnClick}
                disabled={disabled}
              >
                +{this.state.restrictionCharRemain}
              </a>
            </div>
          </div>
        )

      return rtRestriction
    }

    return (

        <form>
          <div className="row">
            <div className="col-md-6 form-group">
              <label> PRODUCT TYPE IN SAP</label>
              <input
                className="form-control awsm-input"
                type="text"
                // placeholder="Typing something here..."
                defaultValue={data?.product_type_sap}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "product_type_sap")
                }
                disabled={true}
              />
            </div>
            <div className="col-md-6 form-group">
              <label> PUMP TYPE </label>
              <input
                className="form-control awsm-input"
                type="text"
                // placeholder="Typing something here..."
                defaultValue={data?.pump_type}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "pump_type")
                }
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>PRODUCT TYPE IN ASWM</label>
              <AWSMDropdown
                value={data?.product_type_awsm}
                items={PRODUCT_TYPE_IN_ASWM}
                onChange={e => this.onChangeHandler(e, "product_type_awsm")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>DATE RANGE</label>
              <DateRangePicker
                className="form-control"
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                defaultValue={data?.temporary_product_date_range}
                onChange={v =>
                  this.onChangeHandler(v, "temporary_product_date_range")
                }
                placeholder={!scheduler ? "Select Date" : ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <label>CHARTERING TYPE</label>
              <input
                className="form-control awsm-input"
                disabled={true}
                defaultValue={data?.chartering_type}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "chartering_type")
                }
              ></input>
            </div>
            <div className="col-md-6 form-group">
              <label>CUSTOMER TYPE</label>
              <AWSMDropdown
                value={data?.customer_type}
                items={CUSTOMER_TYPE_DROPDOWN_VALUE}
                onChange={e => this.onChangeHandler(e, "customer_type")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder={!scheduler ? "Select" : ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <div>
                <label>RESTRICT CODE</label>
              </div>
              {rtRestriction(
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              )}
            </div>
            <div className="form-group col-md-12">
              <label>RT RESTRICTION</label>
              <input
                className="form-control awsm-input"
                disabled={true}
                value={this.state.restrictionVal}
              ></input>
            </div>
          </div>
        </form>

    )
  }
}

export default SpecificationTab