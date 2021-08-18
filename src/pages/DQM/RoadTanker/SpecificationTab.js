import React, { PureComponent } from "react"
import DatePicker from "../../../components/Common/DatePicker"
import AWSMDropdown from "components/Common/Dropdown"
import { CUSTOMER_TYPE_DROPDOWN_VALUE } from "./constants"
import MultipleSelect from "./MultipleSelect"
import { MODE } from "./constants"
class SpecificationTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRTRestrictionAdding: false,
      restrictionStr: "",
      idDeleteBtnShow: true,
      restrictionCharRemain: 20
    }
  }

  componentDidMount() { }

  onChangeHandler = (value, key) => {
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
      let restriction_dropdown = this.props.data?.restriction_dropdown ? this.props.data?.restriction_dropdown : []

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

    const setClass = () => {
      const { restrictionStr: restriction } = this.state
      if (restriction && restriction.length > 0) {
        document.getElementById("done").classList.add("active-btn")
      }
      if (!restriction || restriction.length === 0) {
        document.getElementById("done").classList.remove("active-btn")
      }
    }

    const onAddBtnClick = () => {
      const { isRTRestrictionAdding } = this.state
      if (!isRTRestrictionAdding) {
        this.setState(
          {
            isRTRestrictionAdding: true,
            restriction: "",
          },
          () => {
            setClass()

            if (document.getElementById("done") != null) {
              document.getElementById("done").classList.add("active-btn")
            }
          }
        )
      }
    }

    const onDoneBtnClick = () => {
      if (document.getElementById("restriction") != null) {
        let rtRestriction = document.getElementById("restriction").value
        let { restriction_dropdown } = this.props.data

        if (rtRestriction.length > 0 && !restriction_dropdown.includes(rtRestriction)) {
          restriction_dropdown.push(rtRestriction)
        }

        if (restriction_dropdown?.length === 0 && restriction_dropdown) {
          this.onChangeHandler(rtRestriction, "restriction_dropdown")
        } else {
          this.onChangeHandler(restriction_dropdown, "restriction_dropdown")
        }
      }

      this.setState(
        {
          isRTRestrictionAdding: false,
        },
        () => {
          if (document.getElementById("add") != null) {
            document.getElementById("add").classList.remove("active-btn")
          }
        }
      )

      toggle()
    }

    const onAutoFillBtnClick = () => {
      const { restrictionStr } = this.state
      if (!restrictionStr || restrictionStr.length === 0) {
        this.setState({
          restrictionStr: "New Restriction",
          restrictionCharRemain: 5
        })
      }
    }

    const rtRestrictionBtn = disabled => {
      const { isRTRestrictionAdding } = this.state
      const rtRestrictionBtn = isRTRestrictionAdding ? (
        <a
          type="button"
          onClick={onDoneBtnClick}
          className={`extra-button ${disabled ? "disable-link" : null}`}
          id="done"
          disabled={disabled}
        >
          Done
        </a>
      ) : (
        !disabled && (
          <a
            type="button"
            onClick={onAddBtnClick}
            className={`extra-button ${disabled ? "disable-link" : null}`}
            id="add"
          >
            + Add
          </a>
        )
      )
      return rtRestrictionBtn
    }

    const rtRestriction = disabled => {

      const {
        isRTRestrictionAdding,
        isDeleteBtnShow,
        restrictionStr,
      } = this.state

      let restriction_dropdown = this.props.data?.restriction_dropdown ? this.props.data?.restriction_dropdown : []
      let restriction = this.props.data?.restriction ? this.props.data?.restriction : []

      const rtRestriction = !isRTRestrictionAdding ? (
        <MultipleSelect
          names={restriction_dropdown}
          rtRestrictionSelected={restriction}
          isDeleteBtnShow={isDeleteBtnShow}
          onDeleteBtnClick={onDeleteBtnClick}
          onConfirmClick={onConfirmClick}
          onNoClick={onNoClick}
          onChange={e => this.onChangeHandler(e, "restriction")}
          disabled={disabled}
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
          />
          <div className="input-group-append">
            <a
              className={`btn btn-auto-fill ${disabled ? "disable-link" : null
                }`}
              type="button"
              onClick={onAutoFillBtnClick}
            >
              +{this.state.restrictionCharRemain}
            </a>
          </div>
        </div>
      )
      return rtRestriction
    }

    return (
      <div className="specification">
        <form>
          <div className="row">
            <div className="col-md-6 form-group">
              <label> PRODUCT TYPE IN SAP</label>
              <input
                className="form-control awsm-input"
                type="text"
                placeholder="Typing something here..."
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
                placeholder="Typing something here..."
                defaultValue={data?.pump_type}
                onChange={e => this.onChangeHandler(e.target.value, "pump_type")}
                disabled={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 form-group">
              <label>PRODUCT TYPE IN ASWM</label>
              <AWSMDropdown
                value={data?.product_type_awsm}
                items={data?.product_type_awsm_dropdown}
                onChange={e => this.onChangeHandler(e, "product_type_awsm")}
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                className="form-control awsm-input"
                placeholder="Select"
              />
            </div>
            <div className="col-md-6 form-group">
              <label>DATE</label>
              <DatePicker
                className="form-control awsm-input"
                disabled={
                  (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
                }
                value={data?.temporary_product_date_range}
                onChange={v =>
                  this.onChangeHandler(v, "temporary_product_date_range")
                }
                showButtons={true}
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
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 form-group">
              <div>
                <label>RT RESTRICTION</label>
                {rtRestrictionBtn(scheduler)}
              </div>
              {rtRestriction(scheduler)}
            </div>
            <div className="form-group col-md-6">
              <label>RESTRICT CODE</label>
              <input
                className="form-control awsm-input"
                disabled={true}
                defaultValue={data?.restriction_code}
                onChange={e =>
                  this.onChangeHandler(e.target.value, "restriction_code")
                }
              ></input>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SpecificationTab
