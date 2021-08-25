import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import {
  getSLAAuditLog,
  getSLAItems,
  updateSLAItem,
} from "../../../store/actions"
import Loader from "../../../components/Common/Loader"
import { Link } from "react-router-dom"
import eyeIcon from "../../../assets/images/auditlog-eye.svg"
import AuditLog from "../../../components/Common/AuditLog"
import selectAllIcon2 from "../../../assets/images/AWSM-Checked-box.svg"
import selectAllIcon3 from "../../../assets/images/AWSM-Checkbox.svg"
import {
  Popover,
  PopoverBody,
  Card,
  CardBody,
  Col,
  Modal,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Label,
} from "reactstrap"
import classnames from "classnames"
import SLATab from "./SLATab"
import "./sla.scss"
import Attachments from "./attachments"
import SLATable from "./SLATable"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { FormControlLabel } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import MyDocument from "./MyDocument"
import { PDFDownloadLink } from "@react-pdf/renderer"
import { DownloadIcon } from "../Common/icon"
import { removeKeywords } from "../Common/helper"
import { isNull } from "lodash"

const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />

const Header = ({ title }) => {
 return <h4 className="sla-header">{title}</h4>
}

class SLA extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rowsAudit: 6,
      currentAuditPage: 0,
      modal: false,
      activeTab: "0",
      showDownloadOption: false,
      downloadCheck: [],
      isDownloadPdf: false,
      checkedValues: [],
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    const { onGetSLAItems, onGetSLAAuditLog } = this.props
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code",
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

  toggleDownload = () => {
    this.setState({ showDownloadOption: !this.state.showDownloadOption })
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
    return modal ? (
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
  }

  toggleTabs(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }

  getCheckedDownloadVal(index) {
    const temp = [...this.state.downloadCheck]
    temp[index].checked = !temp[index].checked;

    let temp1 = [];
    temp.map((item, index) => {
      if(item.checked === true){
        temp1.push(item);
      }
    })
   this.setState({checkedValues: temp1});
    this.setState({ downloadCheck: temp })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.slaData && nextProps.slaData.rbd) {
      let temp = []
      temp.push({ title: "All Section", checked: true, id: "0" })
      nextProps.slaData.rbd.map((item, index) => {
        temp.push({ ...item, checked: false })
      })
      this.setState({ downloadCheck: temp })
    }
  }

  DownloadPDF() {
    this.setState({ isDownloadPdf: true })
  }

  onInputChange(event) {
    const target = event.target
    let newData = [...this.state.downloadCheck]
    newData.map(item => {
      if (target.value === item.title) {
        item.checked = !item.checked
      }
    })

   this.setState({downloadCheck: newData});
  }

  render() {
    const { slaData } = this.props
    if (!slaData || !slaData.rbd) return <Loader />
    return (
      <Fragment>
        <div className="page-content">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between">
              <h4 className="sla-title">Service Level Agreement (SLA)</h4>
              <div className="d-flex align-items-end">
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
            <div>
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
                    <h5 className="d-none d-sm-block">
                      RETAIL BUSINESS DIVISION (RBD)
                    </h5>
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
                    <h5 className="d-none d-sm-block">
                      COMMERCIAL BUSINESS DIVISION (CBD)
                    </h5>
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
                  {this.state.activeTab === "3" && (
                    <TabContent activeTab="3" className="p-3 text-muted">
                      <TabPane tabId="3">
                        <Attachments />
                      </TabPane>
                    </TabContent>
                  )}
                  <TabContent
                    activeTab={this.state.activeTab}
                    className="p-3 text-muted"
                  >
                    <TabPane tabId="0">
                      <Row>
                        <Col lg={9}>
                          <Header title="SLA on Customer Order Fulfilment (COF) between Retail Business Division (RBD), Supply & distribution (SSD), Finance Division (FDN) & Customer Experience Department" />
                        </Col>
                        <Col lg={3}>
                          <button
                            id="Download"
                            className="btn btn-outline-primary excel-btn-container pdf-btn"
                          >
                            <div className="excel-download-btn">
                              <span className="download-icon">
                                <DownloadIcon />
                              </span>
                              <span className="download-button-message">
                                Download Excel
                                <ArrowDropDownIcon />
                              </span>
                            </div>
                          </button>
                          <Popover
                            target="Download"
                            placement="bottom"
                            isOpen={this.state.showDownloadOption}
                            trigger="legacy"
                            style={{ width: "auto" }}
                            toggle={this.toggleDownload}
                          >
                            <PopoverBody className="filter-container sla-rbd-download">
                              <>
                                {this.state.downloadCheck.length > 0 &&
                                  this.state.downloadCheck.map(
                                    (row, index) => {
                                      return (
                                        <div
                                        key={row.title}
                                        className={`d-flex align-items-center filter-selection ${
                                          row.checked ? "item-checked" : ""
                                        }`}
                                      >
                                        <FormControlLabel
                                          key={`${row.title}`}
                                          value={`${row.title}`}
                                          onChange={() => this.getCheckedDownloadVal(index)}
                                          checked={row.checked}
                                          className="checkmark"
                                          control={
                                            <Checkbox
                                              icon={<UntickIcon />}
                                              checkedIcon={<CheckedIcon />}
                                              style={{
                                                height: "20px",
                                                width: "5px",
                                                marginLeft: "16px",
                                                marginTop: "8px",
                                              }}
                                            />
                                          }
                                          label={
                                            isNull(row.title)
                                              ? "-"
                                              : removeKeywords(row.title)
                                          }
                                        />
                                      </div>
                                      )
                                    }
                                  )}
                                <div className="pdf-wid">
                                  {/* <button onClick={() => this.DownloadPDF()}>download</button> */}
                                  <PDFDownloadLink
                                    document={
                                      <MyDocument
                                        data={this.state.checkedValues.filter(val => val.title === 'All Section').length > 0 ? slaData.rbd : this.state.checkedValues}
                                      />
                                    }
                                    fileName="rbd.pdf"
                                    className="btn btn-primary excel-btn-container pdf-btn"
                                  >
                                    Download
                                  </PDFDownloadLink>
                                </div>
                              </>
                            </PopoverBody>
                          </Popover>
                        </Col>
                      </Row>

                      <Row>
                        <SLATab category="rbd" data={slaData.rbd} />
                      </Row>
                    </TabPane>
                    <TabPane tabId="1">
                      <Header title="SLA on Customer Order Fulfilment (COF) between Commercial Business Division (CBD), Supply & distribution (SSD), Finance Division (FDN) & Customer Experience Department" />
                      <Row>
                        <SLATab category="cbd" data={slaData.cbd} />
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Header title="Internal" />
                      <Row>
                        <SLATab category="internal" data={slaData.internal} />
                      </Row>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </div>
            {this.runAuditLogModal()}
          </div>
        </div>
        {this.state.isDownloadPdf && (
                  <MyDocument data={this.state.checkedValues.filter(val => val.title === 'All Section').length > 0 ? slaData.rbd : this.state.checkedValues} />
              )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ sla }) => ({
  slaData: sla.data,
  slaAuditLog: sla.slaAuditLog,
})

const mapDispatchToProps = dispatch => ({
  onGetSLAItems: params => dispatch(getSLAItems(params)),
  onGetSLAAuditLog: payload => dispatch(getSLAAuditLog(payload)),
  onUpdateSLAItem: event => dispatch(updateSLAItem(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SLA)
