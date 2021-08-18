import React, { PureComponent, Fragment } from "react";
import {
  Button,
  Modal,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  ModalBody,
  ModalHeader
} from "reactstrap";
import AvailabilityTab from "./AvailabilityTab";
import SpecificationTab from "./SpecificationTab";
import TrailerTab from "./TrailerTab";
import "./InformationModal.scss";

class InformationModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
      displayConfirmationBox: false,
    }
  }

  render() {
    const { activeTab } = this.state;
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }
    const { onCancle, visible } = this.props;
    return (
      <Modal isOpen={visible} className="table-information modal-lg" toggle={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
        <ModalHeader toggle={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
          <h3>
            <span>Product Information
              <span className="last-updated-sub-title">
                Last Updated By: Nur Izzati on 3rd March 2021
              </span>
            </span>
          </h3>
        </ModalHeader>
        <ModalBody>
        <Fragment>
          {this.state.displayConfirmationBox ?
            <div className="Confirmation-box">
              <div>
                <h3>Exit Confirmation</h3>
                <p>Are you sure you want to exit without update? <br />You will lose all the changes made.</p>
                <button className="btn btn-dan" onClick={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>Cancel</button>
                <button className="btn btn-danger" onClick={() => onCancle()}>Exit</button>
              </div>
            </div>
            :
            <div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label> VEHICAL ID</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={"RYD0287"}
                    disabled={true}
                  />
              </div>
              <div className="col-md-6 form-group">
                <label> VEHICAL OWNER</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={"Eshah Filling Station"}
                    disabled={true}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label>STATUS IN SAP</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={"Operational"}
                    disabled={true}
                  />
              </div>
              <div className="col-md-6 form-group">
                <label>RT CAPACITY</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={"Operational"}
                    disabled={true}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 form-group">
                <label> REMARKS</label>
                  <input
                    className="form-control awsm-input"
                    type="text"
                    defaultValue={"Shaziman only"}
                  />
                </div>
            </div>
              <div>
                <Nav tabs>
                  <NavItem
                    className={activeTab === "1" ? "active" : null}
                    onClick={() => {
                      toggle("1")
                    }}
                  >
                    <NavLink>
                      <span>Availability</span>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={activeTab === "2" ? "active" : null}
                    onClick={() => {
                      toggle("2")
                    }}
                  >
                    <NavLink>
                      <span>Specification</span>
                    </NavLink>
                  </NavItem>
                  <NavItem
                    className={activeTab === "3" ? "active" : null}
                    onClick={() => {
                      toggle("3")
                    }}
                  >
                    <NavLink>
                      <span>Trailer</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                      <AvailabilityTab/>
                  </TabPane>
                  <TabPane tabId="2">
                    <SpecificationTab/>
                  </TabPane>
                  <TabPane tabId="3">
                    <TrailerTab/>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          }
        </Fragment>
        </ModalBody>
        <ModalFooter>
          <button className="btn-sec" onClick={() => this.setState({displayConfirmationBox: !this.state.displayConfirmationBox})}>
            Cancel
          </button>
          <Button color="primary">Update</Button>{" "}
        </ModalFooter>
      </Modal>
    )
  }
}

export default InformationModal;
