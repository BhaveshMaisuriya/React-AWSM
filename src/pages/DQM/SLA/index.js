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
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import { FormControlLabel } from "@material-ui/core"
import Checkbox from "@material-ui/core/Checkbox"
import MyDocument from "./Download-pdf/MyDocument"
import { DownloadIcon } from "../Common/icon"
import { removeKeywords } from "../Common/helper"
import { isNull } from "lodash"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import AWSMAlert from "components/Common/AWSMAlert"

const UntickIcon = () => <img src={selectAllIcon3} alt="icon" />
const CheckedIcon = () => <img src={selectAllIcon2} alt="icon" />

const Header = ({ title }) => {
  return <h4 className="sla-header">{title}</h4>
}


class SLA extends Component {
  constructor(props) {
    // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
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
      downloading: false,
      showSnackAlert: false,
    }
    this.toggle = this.toggle.bind(this)
    this.generatePdf = this.generatePdf.bind(this)
  }

  componentDidMount() {
    const { onGetSLAItems } = this.props
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "code",
    }
    onGetSLAItems(params)
  }

  /**
   * Handling the modal state when modal is click
   */
  modalHandler = () => {
    const { onGetSLAAuditLog } = this.props;
    const payload = {
      limit: 6,
      page: 1,
      module: "sla",
    }
    onGetSLAAuditLog(payload)
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
    if(audits !== undefined && audits !== null){
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
            data={audits.data.list}
            closeModal={this.closeHandler}
            handlePageChange={this.handleChangeAuditPage}
          />
        </Modal>
      ) : null
    }
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
    temp[index].checked = !temp[index].checked

    if (temp[index].checked === true) {
      if(temp.filter(val => val.checked === true).length === temp.length - 1 || temp[index].id === "0") {
      temp.map((item, index) => {
        item.checked = true
      })
    }
    } else if (temp[index].id === "0" && temp[index].checked === false) {
        temp.map((item, index) => {
          item.checked = false
        })
    }
    else {
      temp[temp.length - 1].checked = false
    }

    let temp1 = []
    temp.map((item, index) => {
      if (item.checked === true) {
        temp1.push(item)
      }
    })
    this.setState({ checkedValues: temp1 })
    this.setState({ downloadCheck: temp })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.slaData && nextProps.slaData.rbd) {
      let temp = [];      
      nextProps.slaData.rbd.map((item, index) => {
        temp.push({ ...item, checked: true })
      })
      temp.push({ title: "Select All", checked: true, id: "0" })
      this.setState({ downloadCheck: temp })
      this.setState({ checkedValues: temp })

     
    }
  }


  async generatePdf() {
    this.setState({ downloading: true });
    this.setState({ showDownloadOption: !this.state.showDownloadOption })

    const showDiv = document.getElementById("showPDf")
    showDiv.style.display = "block"
    const input = document.getElementById("sla_pdf")   

    html2canvas(input).then(async canvas => {
      const imgData = canvas.toDataURL("image/png")

      var imgWidth = 210
      var pageHeight = 295
      var imgHeight = (canvas.height * imgWidth) / canvas.width
      var heightLeft = imgHeight + 50;

      var doc = new jsPDF("p", "mm")
      var position = 0

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight+30)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        doc.addPage()
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight+30)
        heightLeft -= pageHeight
      }
      let all = [];
       this.state.checkedValues.map(item => {
        all.push(item.title);
      })
      var pdfName = this.state.checkedValues.filter(val => val.id === "0").length > 0 ? 'SLA_RBD_All' : `SLA_RBD_${all.join('_')}`;

      await doc.save(`${pdfName}.pdf`);

      showDiv.style.display = "none"
      this.setState({ downloading: false })
      this.setState({ showSnackAlert: true })
    })
  }

  onInputChange(event) {
    const target = event.target
    let newData = [...this.state.downloadCheck]
    newData.map(item => {
      if (target.value === item.title) {
        item.checked = !item.checked
      }
    })

    this.setState({ downloadCheck: newData })
  }
  pxToMm = px => {
    return Math.floor(px / document.getElementById("myMm").offsetHeight)
  }

  mmToPx = mm => {
    return document.getElementById("myMm").offsetHeight * mm
  }

  range = (start, end) => {
    return Array(end - start)
      .join(0)
      .split(0)
      .map(function (val, id) {
        return id + start
      })
  }

  render() {
    const { slaData } = this.props
    if (!slaData || !slaData.rbd) return <Loader />
    
    return (
      <Fragment>
        {this.state.downloading === true && <Loader />}
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
                        <Attachments activeAttachTab={() => this.setState({activeTab: '3'})} />
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
                            <PopoverBody className="sla-rbd-download">
                              <>
                                {this.state.downloadCheck.length > 0 &&
                                  this.state.downloadCheck.map((row, index) => {
                                    return (
                                      <div
                                        key={row.title}
                                        className={`d-flex align-items-center ${
                                          row.checked ? "item-checked" : ""
                                        }`}
                                      >
                                        <FormControlLabel
                                          key={`${row.title}`}
                                          value={`${row.title}`}
                                          onChange={() =>
                                            this.getCheckedDownloadVal(index)
                                          }
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
                                  })}
                                <div id="myMm" style={{ height: "1mm" }} />
                                <div className="pdf-wid">
                                  <button
                                    disabled={this.state.downloading}
                                    className="btn btn-primary excel-btn-container pdf-btn"
                                    onClick={this.generatePdf}
                                  >
                                    {this.state.downloading
                                      ? "Downloading..."
                                      : "Download"}
                                  </button>
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
        <div id="showPDf" style={{display: 'none'}}>
          <MyDocument
            data={
              this.state.checkedValues.filter(
                val => val.id === "0"
              ).length > 0
                ? slaData.rbd
                : this.state.checkedValues
            }
          />
        </div>
        {this.state.showSnackAlert && (
              <AWSMAlert
                status='success'
                message='PDF generated successfully.'
                openAlert={this.state.showSnackAlert}
                closeAlert={() => this.setState({showSnackAlert: false})}
              />
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