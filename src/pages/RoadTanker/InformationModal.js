import React, { PureComponent } from "react";
import {
  Button,
  Modal,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ModalFooter,
  ModalBody
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
      <Modal isOpen={visible} className="table-information modal-lg">
          <div className="modal-header">
            <h5 className="modal-title">
              Table Information
            </h5>
            <span className="sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
            <button
              type="button"
              onClick={() => onCancle()}
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <ModalBody>
          <div>
            <div className="row">
              <div class="col-md-6 form-group">
                <label> VEHICAL ID</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={"RYD0287"}
                    disabled={true}
                  />
              </div>
              <div class="col-md-6 form-group">
                <label> VEHICAL OWNER</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={"Eshah Filling Station"}
                    disabled={true}
                  />
              </div>
            </div>
            <div className="row">
              <div class="col-md-6 form-group">
                <label>STATUS IN SAP</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={"Operational"}
                    disabled={true}
                  />
              </div>
              <div class="col-md-6 form-group">
                <label>RT CAPACITY</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={"Operational"}
                    disabled={true}
                  />
              </div>
            </div>
            <div className="row">
              <div class="col-md-12 form-group">
                <label> REMARKS</label>
                  <input
                    className="form-control"
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
          </ModalBody>
          <ModalFooter>
            <button className="btn-sec" onClick={() => onCancle()}>
              Cancel
            </button>
            <Button color="primary">Update</Button>{" "}
          </ModalFooter>
      </Modal>
    )
  }
}

export default InformationModal;
