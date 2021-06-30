import React, { PureComponent } from "react"
import PopOverCalendar from "../../../components/Common/TableInformation/components/PopOverCalendar"
import MultipleSelect from "./MultipleSelect"
import { MODE } from "./constants"
class SpecificationTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRTRestrictionAdding: false,
      field: [],
      restriction: "",
      names: [
        "Multiproduct",
        "Long Haul",
        "Long Hose",
        "Pit Stop",
        "Highland Road",
        "Mild Steel Tank",
        "New Restriction",
      ],
      idDeleteBtnShow: true
    }
  }

  render() {
    const { mode, scheduler, data, toggle, onChange } = this.props

    function arrayRemove(arr, value) {

      return arr.filter(function (ele) {
        return ele != value;
      });
    }

    const onConfirmClick = () => {
      const { names, isDeleteBtnShow } = this.state
      const name = names[names.length - 1]
      let personNames = arrayRemove(names, name);
      this.setState({
        names: personNames,
        isDeleteBtnShow: !isDeleteBtnShow
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
      const { restriction } = this.state
      if (restriction && restriction.length > 0) {
        document.getElementById("done").classList.add("active-btn")
      }
      if (!restriction || restriction.length === 0) {
        document.getElementById("done").classList.remove("active-btn")
      }
    }

    const onAddBtnClick = () => {
      const { isRTRestrictionAdding } = this.state
      if (isRTRestrictionAdding) {
        this.setState(
          {
            isRTRestrictionAdding: false,
          },
          () => {
            setClass()
          }
        )
      }
    }

    const onDoneBtnClick = () => {
      const { names } = this.state
      if (document.getElementById("restriction") != null) {
        let rtRestriction = document.getElementById("restriction").value
        this.setState({ names: [...names, rtRestriction] })
        onChange("rt_restriction", names)
      }

      this.setState(
        {
          isRTRestrictionAdding: true,
        },
        () => {
          if (document.getElementById("add") != null) {
            document.getElementById("add").classList.remove("active-btn")
          }
        }
      )

      toggle()
    }

    const onValueChange = event => {
      let newData = {...data}
      newData['rt_restriction'] = event.target.value
      this.setState({ restriction: event.target.value }, () => {
        setClass();
        onChange('specification',newData)
      })
    }

    const onAutoFillBtnClick = () => {
      const { restriction } = this.state
      if (!restriction) {
        this.setState({ restriction: "New Restriction" })
      }
    }

    const rtRestrictionBtn = disabled => {
      const { isRTRestrictionAdding } = this.state
      const rtRestrictionBtn = isRTRestrictionAdding ? (
        <a
          type="button"
          onClick={onAddBtnClick}
          className={`extra-button ${disabled ? "disable-link" : null}`}
          id="add"
        >
          + Add
        </a>
      ) : (
        <a
          type="button"
          onClick={onDoneBtnClick}
          className={`extra-button ${disabled ? "disable-link" : null}`}
          id="done"
          disabled={disabled}
        >
          Done
        </a>
      )
      return rtRestrictionBtn
    }

    const rtRestriction = disabled => {
      const { isRTRestrictionAdding, names, isDeleteBtnShow } = this.state

      const rtRestriction = isRTRestrictionAdding ? (
        <MultipleSelect
          names={names}
          isDeleteBtnShow={isDeleteBtnShow}
          onDeleteBtnClick={onDeleteBtnClick}
          onConfirmClick={onConfirmClick}
          onNoClick={onNoClick} />
      ) : (
        <div className="input-group add-restriction">
          <input
            className="form-control"
            id="restriction"
            type="text"
            defaultValue={data?.rt_restriction}
            onChange={onValueChange}
            disabled={disabled}
          />
          <div className="input-group-append">
            <a
              className={`btn btn-auto-fill ${disabled ? "disable-link" : null
                }`}
              type="button"
              onClick={onAutoFillBtnClick}
            >
              +20
            </a>
          </div>
        </div>
      )
      return rtRestriction
    }
    return (
      <div className="specification">
        <div className="row">
          <div className="col-md-6 form-group">
            <label> PRODUCT TYPE IN SAP</label>
            <input
              className="form-control"
              type="text"
              defaultValue={data?.product_type_sap}
              disabled={true}
            />
          </div>
          <div className="col-md-6 form-group">
            <label> PUMP TYPE </label>
            <input
              className="form-control"
              type="text"
              defaultValue={data?.pump_type}
              disabled={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 form-group">
            <label>PRODUCT TYPE IN ASWM</label>
            <select
              className="form-control"
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              defaultValue={data?.product_type_awsm}
              onChange={e => {
                onChange("product_type_in_ASWM", e.target.value)
              }}
            >
              {data?.product_type_awsm_dropdown?.map((value, indev) => {

              })}
            </select>
          </div>
          <div className="col-md-6 form-group">
            <label>DATE</label>
            <PopOverCalendar
              className="form-control"
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              selected={data?.temporary_product_date_range}
            ></PopOverCalendar>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>CHARTERING TYPE</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data?.chartering_type}
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label>CUSTOMER TYPE</label>
            <select
              className="form-control"
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              value={data?.customer_type}
            >

              {data?.customer_type_dropdown}
              <option value="active">Active</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <div>
              <label>RT RESTRICTION</label>
              {rtRestrictionBtn(
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              )}
            </div>
            {rtRestriction(
              (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
            )}
          </div>
          <div className="form-group col-md-6">
            <label>RESTRICT CODE</label>
            <input
              className="form-control"
              disabled={true}
              defaultValue={data?.restriction_code}
            ></input>
          </div>
        </div>
      </div>
    )
  }
}

export default SpecificationTab
