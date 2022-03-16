import React, { PureComponent } from 'react'
import DateRangePicker from 'components/Common/DateRangePicker'
import AWSMDropdown from 'components/Common/Dropdown'
import { CUSTOMER_TYPE_DROPDOWN_VALUE } from './constants'
import { MODE, PRODUCT_TYPE_IN_ASWM } from './constants'
import AutoCompleteSearchDropDown from './AutoCompleteSearchDropDown'

class SpecificationTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isRTRestrictionAdding: false,
      restrictionStr: '',
      idDeleteBtnShow: true,
      restrictionCharRemain: 20,
      restrictionVal: '',
      restrictionCode: 0,
    }
  }

  onChangeHandler = (value, key) => {
    if (key === 'restriction') {
      this.setState({ restrictionVal: value.description })
      this.setState({ restrictionCode: value.code })
      const { data, onChange } = this.props
      let newData = { ...data }
      newData['restriction_code'] = value.code
      onChange('specification', newData)
    } else {
      const { data, onChange } = this.props
      let newData = { ...data }
      newData[key] = value
      onChange('specification', newData)
    }
  }

  render() {
    const { mode, scheduler, data } = this.props

    const onAutoFillBtnClick = () => {
      const { restrictionStr } = this.state
      if (!restrictionStr || restrictionStr.length === 0) {
        this.setState({
          restrictionStr: 'New Restriction',
          restrictionCharRemain: 5,
        })
      }
    }

    const rtRestriction = disabled => {
      const { isRTRestrictionAdding, restrictionStr } = this.state
      let restriction_dropdown = data?.restriction_code_dropdown
      let restriction = data?.restriction_code

      restriction_value = data?.restriction_code_dropdown.find(val => {
        return val.code === restriction
      })?.description
      const rtRestriction =
        !isRTRestrictionAdding && restriction_dropdown ? (
          <AutoCompleteSearchDropDown
            value={this.state.restrictionCode || restriction}
            items={restriction_dropdown}
            key={restriction}
            searchIcon={true}
            onChange={e => this.onChangeHandler(e, 'restriction')}
            disabled={disabled}
            placeholder="Please select code"
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
                let rtRestriction = document.getElementById('restriction').value
                let length = rtRestriction.length
                this.setState({ restrictionCharRemain: 20 - length })
              }}
              placeholder={!disabled ? 'Select' : ''}
            />
            <div className="input-group-append">
              <a
                className={`form-control btn btn-auto-fill ${
                  disabled ? 'disable-link' : null
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
              defaultValue={data?.product_type_sap}
              onChange={e =>
                this.onChangeHandler(e.target.value, 'product_type_sap')
              }
              disabled={true}
            />
          </div>
          <div className="col-md-6 form-group">
            <label> PUMP TYPE </label>
            <input
              className="form-control awsm-input"
              type="text"
              defaultValue={data?.pump_type}
              onChange={e => this.onChangeHandler(e.target.value, 'pump_type')}
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
              onChange={e => this.onChangeHandler(e, 'product_type_awsm')}
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              className="form-control awsm-input"
              placeholder={!scheduler ? 'Select' : ''}
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
                this.onChangeHandler(v, 'temporary_product_date_range')
              }
              placeholder={!scheduler ? 'Select Date' : ''}
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
                this.onChangeHandler(e.target.value, 'chartering_type')
              }
            ></input>
          </div>
          <div className="col-md-6 form-group">
            <label>CUSTOMER TYPE</label>
            <AWSMDropdown
              value={data?.customer_type}
              items={CUSTOMER_TYPE_DROPDOWN_VALUE}
              onChange={e => this.onChangeHandler(e, 'customer_type')}
              disabled={
                (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
              }
              className="form-control awsm-input"
              placeholder={!scheduler ? 'Select' : ''}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>RESTRICT CODE</label>
            {rtRestriction(
              (mode === MODE.VIEW_AND_AMEND ? false : true) || scheduler
            )}
          </div>
        </div>

        <div className="row">
          <div className="form-group col-md-12 mb-6">
            <label>RT RESTRICTION</label>
            <input
              className="form-control awsm-input"
              disabled={true}
              value={this.state.restrictionVal || data?.restriction}
            ></input>
          </div>
          <div className="form-group col-md-12 mb-6">
            <br />
          </div>
        </div>
      </form>
    )
  }
}

export default SpecificationTab
