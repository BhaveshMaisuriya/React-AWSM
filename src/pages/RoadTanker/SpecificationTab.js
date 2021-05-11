import React, { PureComponent } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SpecificationTab extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
     <div className="specification">
         <div className="row">
            <div class="col-md-6 form-group">
              <label> PRODUCT TYPE IN SAP</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={"Lorem ipsum"}
                  disabled={true}
                />
            </div>
            <div class="col-md-6 form-group">
              <label> PUMP TYPE </label>
              <input
                  className="form-control"
                  type="text"
                  defaultValue={"Lorem ipsum"}
                  disabled={true}
                />
            </div>
          </div>
         <div className="row">
           <div className="col-md-6 form-group">
             <label>PRODUCT TYPE IN ASWM</label>
             <select className="form-control">
              <option selected>Multiproduct</option>
             </select>
           </div>
           <div className="col-md-6 form-group">
              <label>DATE</label>
            <DatePicker className="form-control"></DatePicker>
          </div>
         </div>

         <div className="row">
           <div className="col-md-6 form-group">
             <label>CHARTERING TYPE</label>
             <input className="form-control"
             disabled={true}
             defaultValue={'Lorem Ipsum'}></input>
           </div>
           <div className="col-md-6 form-group">
            <label>CUSTOMER TYPE</label>
              <select className="form-control">
                <option selected>Active</option>
              </select>
           </div>
         </div>
        
          <div className="row">
            <div className="col-md-6 form-group">
              <div>
                <label>RT RESTRICTION</label>
                <a className="extra-button">+ Add</a>
              </div>
              <select className="form-control">
                <option selected>Multiproduct, Long Haul, Pit Stop</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>RESTRICT CODE</label>
              <input className="form-control"
              disabled={true}
              defaultValue={"1001"}></input>
            </div>
          </div>
     </div>
    )
  }
}

export default SpecificationTab
