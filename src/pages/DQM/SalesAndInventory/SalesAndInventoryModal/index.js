import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import './index.scss';
import DetailsTab from "./detailsTab"
import SalesTab from "./salesTab"
import InventoryTab from "./inventoryTab"
import DeliveryTab from "./deliveryTab"
export default class SalesAndInventoryTableInformation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "1"
        }

        this.handleEvent = this.handleEvent.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) { if (prevState.name !== this.state.name) { this.handler() } }

    componentWillUnmount() {

    }

    // Prototype methods, Bind in Constructor (ES2015)
    handleEvent() { }

    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
        const { onCancel, visible } = this.props
        const { activeTab } = this.state
        const toggle = tab => {
            if (activeTab !== tab) {
                this.setState({ activeTab: tab })
            }
        }
        return (
            <>
                <Modal isOpen={visible}
                    className="table-information modal-lg"
                    contentClassName="modalTIContainer">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            RECORD ID: 123456789
                            <span className="sub-title">
                                Date: 12 Mar 2021
                            </span>
                            <span className="sub-title">
                                Last Updated By: Nur Izzati on 3rd March 2021
                            </span>
                        </h5>

                        <button type="button" onClick={onCancel} className="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div>
                            <Nav tabs>
                                <NavItem
                                    className={activeTab === "1" ? "active" : null}
                                    onClick={() => {
                                        toggle("1")
                                    }}
                                >
                                    <NavLink>
                                        <span>Details</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem
                                    className={activeTab === "2" ? "active" : null}
                                    onClick={() => {
                                        toggle("2")
                                    }}
                                >
                                    <NavLink>
                                        <span>Sales</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem
                                    className={activeTab === "3" ? "active" : null}
                                    onClick={() => {
                                        toggle("3")
                                    }}
                                >
                                    <NavLink>
                                        <span>Inventory</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem
                                    className={activeTab === "4" ? "active" : null}
                                    onClick={() => {
                                        toggle("4")
                                    }}
                                >
                                    <NavLink>
                                        <span>Delivery</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <div className="simple-bar">
                                        <DetailsTab />
                                    </div>
                                </TabPane>
                                <TabPane tabId="2">
                                    <div className="simple-bar">
                                        <SalesTab />
                                    </div>
                                </TabPane>
                                <TabPane tabId="3">
                                    <div className="simple-bar">
                                        <InventoryTab />
                                    </div>
                                </TabPane>
                                <TabPane tabId="4">
                                    <div className="simple-bar">
                                        <DeliveryTab />
                                    </div>
                                </TabPane>
                            </TabContent>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="d-flex align-items-center justify-content-end mt-4 mb-4 px-4">
                            <button className="btn btn-outline-primary px-4">Cancel</button>
                            <button className="btn btn-primary ml-4 px-4">Update</button>
                        </div>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
