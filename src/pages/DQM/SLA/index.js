import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import {
  getSLAItems,
  getSLAAuditLog,
  updateSLAItem,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import Loader from "../../../components/Common/Loader"
import Header from "../../../components/Common/CustomPageHeader"
import downloadExcelIcon from "../../../assets/images/AWSM-Excel.svg"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  CardText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardHeader,
} from "reactstrap"
import classnames from "classnames"
import SLATab from "./SLATab"
import "./sla.scss"
import Attachments from "./attachments"

class SLA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rowsAudit: 6,
      currentAuditPage: 0,
      modal: false,
      activeTab: "0"
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    const {
      onGetSLAItems,
      onGetSLAAuditLog,
    } = this.props
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code"
    }
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "sla",
    }
    onGetSLAItems(params)
    onGetSLAAuditLog(payload)
  }

  /**
 * Handling the modal state when modal is click
 */
  modalHandler = () => {
    this.setState({
      modal: true,
    })
  }

  /**
   * Handling the modal state
   */
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  /**
   * Handling to close the modal and change state
   */
  closeHandler = () => {
    this.setState({
      modal: false,
    })
  }

  /**
   * Handling the change page in Audit Log
   */
  handleChangeAuditPage = (event, currentAuditPage) => {
    this.setState({ currentAuditPage })
  }

  handleOpenCustomizeTable = () => {
    this.setState(prevState => ({
      customizeModalOpen: !prevState.customizeModalOpen,
    }))
  }

  runAuditLogModal = () => {
    const { modal, rowsAudit, currentAuditPage } = this.state
    const audits = this.props.slaAuditLog
    const modalContent = modal ? (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        id="auditLog-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={this.toggle}>
          <h3>Audit Log</h3>
        </ModalHeader>
        <AuditLog
          rowsAudit={rowsAudit}
          currentAuditPage={currentAuditPage}
          data={audits.list}
          closeModal={this.closeHandler}
          handlePageChange={this.handleChangeAuditPage}
        />
      </Modal>
    ) : null
    return modalContent
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  render() {
    const {
      slaData
    } = this.props
    if (!slaData || !slaData.rbd) return (<Loader />)
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-10">
                <h4>Service Level Agreement (SLA)</h4>

              </div>
              <div
                className="col-2"
              >
                <div className="row">
                  <Link
                    to="#"
                    onClick={() => {
                      this.modalHandler()
                    }}
                  >
                    <img src={eyeIcon} alt="info" /> View Audit Log
                </Link>
                </div>
              </div>
            </div>
            {/*  */}
            <Col lg={12}>

              <Nav tabs className="nav-tabs-custom nav-sla">
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: this.state.activeTab === "0",
                    })}
                    onClick={() => {
                      this.toggleTabs("0")
                    }}
                  >
                    <h5 className="d-none d-sm-block">RETAIL BUSINESS DIVISION (RBD)</h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.toggleTabs("1")
                    }}
                  >
                    <h5 className="d-none d-sm-block">COMMERCIAL BUSINESS DIVISION (CBD)</h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.toggleTabs("2")
                    }}
                  >
                    <h5 className="d-none d-sm-block">INTERNAL</h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.toggleTabs("3")
                    }}
                  >
                    <h5 className="d-none d-sm-block">ATTACHMENTS</h5>
                  </NavLink>
                </NavItem>
              </Nav>
              <Card>
                <CardBody>
                  {this.state.activeTab === '3' &&
                    <TabContent activeTab="3" className="p-3 text-muted">
                      <TabPane tabId="3">
                        <Attachments />
                      </TabPane>
                    </TabContent>
                  }
                  {this.state.activeTab !== '3' &&
                    <TabContent activeTab={this.state.activeTab} className="p-3 text-muted">
                      <TabPane tabId="0">
                        <Header title="SLA on Customer Order Fulfilment (COF) between Retail Business Division (RBD), Supply & distribution (SSD),
Finance Division (FDN) & Customer Experience Department"></Header>
                        <Row>
                          <SLATab data={slaData.rbd} />
                        </Row>
                      </TabPane>
                      <TabPane tabId="1">
                        <Header title="SLA on Customer Order Fulfilment (COF) between Commercial Business Division (CBD), Supply & distribution (SSD),
Finance Division (FDN) & Customer Experience Department"></Header>
                        <Row>
                          <SLATab data={slaData.cbd} />
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Header title="Internal"></Header>
                        <Row>
                          <SLATab data={slaData.internal} />
                        </Row>
                      </TabPane>
                    </TabContent>
                  }
                </CardBody>
              </Card>

            </Col>
            {/*  */}
            {this.runAuditLogModal()}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ sla }) => ({
  slaData: sla.data,
  slaAuditLog: sla.slaAuditLog
})

const mapDispatchToProps = dispatch => ({
  onGetSLAItems: params => dispatch(getSLAItems(params)),
  onGetSLAAuditLog: payload => dispatch(getSLAAuditLog(payload)),
  onUpdateSLAItem: event => dispatch(updateSLAItem(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SLA)