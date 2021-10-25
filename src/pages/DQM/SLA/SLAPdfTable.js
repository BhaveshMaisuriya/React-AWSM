import React, { useEffect, useState, useRef, Fragment } from "react"
import cloneDeep from "lodash/cloneDeep"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import EditOutlinedIcon from "@material-ui/icons/EditOutlined"
import SystemUpdateAltOutlinedIcon from "@material-ui/icons/SystemUpdateAltOutlined"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined"
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined"
import { connect } from "react-redux"
import Tooltip from "@material-ui/core/Tooltip"
import { getSLAPdfDownload, getDeletePdf, getRenamePdf } from "store/actions"
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
} from "reactstrap"
import AWSMInput from "components/Common/Input"
import AWSMAlert from "components/Common/AWSMAlert"
import { ReactSVG } from "react-svg"
import CustomTrashIcon from "../../../assets/images/AWSM-Trash-Icon-sla.svg"
import CustomViewIcon from "../../../assets/images/AWSM-View.svg"
import CustomDownloadIcon from "../../../assets/images/AWSM-Download.svg"
import CustomEditIcon from "../../../assets/images/AWSM-Edit.svg"

import { Icon } from "@material-ui/core"

function SLAPdfTable(props) {
  const rowsPerPage = 10
  const [value, setValue] = useState("")
  const [tableDatas, setTableDatas] = useState([])
  const [filterTableDatas, setFilterTableDatas] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [collection, setCollection] = useState([])
  const [currentAction, setCurrentAction] = useState("")
  const [currentFileName, setCurrentFileName] = useState("")
  const [renameFileName, setRenameFileName] = useState("")
  const [renameOpen, setRenameOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [deleteId, setDeleteId] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertStatus, setAlertStatus] = useState("")

  useEffect(() => {
    async function fetchData() {
      const { slaPdfs } = props
      if (slaPdfs !== null && slaPdfs !== undefined) {
        await getAllPdfLists(slaPdfs)
        const tableHead = {
          filename: "FILE NAME",
          created_at: "TIME UPDATED",
          created_by: "UPLOADED BY",
          action: "ACTION",
        }
        await setTableHeader(tableHead)
      }
    }
    fetchData()
  }, [props.slaPdfs])

  useEffect(() => {
    const { slaPdfDownload, slaPdfs } = props
    if (slaPdfDownload !== null) {
      const blob = base64toBlob(slaPdfDownload.data.data)
      const PdfUrl = URL.createObjectURL(blob)
      if (currentAction === "view") {
        window.open(PdfUrl, "_blank")
      } else {
        const linkSource = `data:application/pdf;base64,${slaPdfDownload.data.data}`
        const downloadLink = document.createElement("a")
        downloadLink.href = linkSource
        downloadLink.download = slaPdfDownload.data.filename
        downloadLink.click()
      }
    }
  }, [props.slaPdfDownload])

  const base64toBlob = data => {
    const bytes = atob(data)
    let length = bytes.length
    let out = new Uint8Array(length)
    while (length--) {
      out[length] = bytes.charCodeAt(length)
    }
    return new Blob([out], { type: "application/pdf" })
  }

  const getAllPdfLists = async slaPdfs => {
    let allData = []
    var months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ]

    slaPdfs.map((item, index) => {
      var uploadedDate = ""
      var uploadedTime = ""
      var getFullDate = new Date(item.created_at)
      var hours = getFullDate.getHours()
      var minutes = getFullDate.getMinutes()
      var ampm = hours >= 12 ? "pm" : "am"
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes
      uploadedDate =
        getFullDate.getDate() +
        " " +
        months[getFullDate.getMonth()] +
        " " +
        getFullDate.getFullYear()
      uploadedTime =
        getFullDate.getHours() + ":" + getFullDate.getMinutes() + " " + ampm

      allData.push({
        filename: item.filename,
        created_at: (
          <p className="uploaded_time">
            {uploadedDate}
            <br />
            <span> {uploadedTime}</span>
          </p>
        ),
        category: item.category,
        created_by: "user",
        action: (
          <div className="action">
            <Tooltip title="Rename PDF">
              <Icon onClick={() => reNamePdf(item)}>
                <ReactSVG src={CustomEditIcon} />
              </Icon>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Download PDF">
              <Icon onClick={() => downloadViewPdf(item, "download")}>
                <ReactSVG src={CustomDownloadIcon} />
              </Icon>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="View PDF">
              <Icon onClick={() => downloadViewPdf(item, "view")}>
                <ReactSVG src={CustomViewIcon} />
              </Icon>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Delete PDF">
              <Icon onClick={() => deletePdf(item)}>
                <ReactSVG src={CustomTrashIcon} />
              </Icon>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        ),
      })
    })

    await setTableDatas(allData)
    await setFilterTableDatas(allData)
    await setCollection(cloneDeep(allData.slice(0, rowsPerPage)))
  }

  const reNamePdf = async item => {
    setRenameFileName(item.filename.split(".pdf")[0])
    setRenameOpen(!renameOpen)
    setSelectedItem(item)
  }

  const RenamePdf = async () => {
    const { onGetRenamePdf } = props
    await onGetRenamePdf({
      id: selectedItem.id,
      filename: renameFileName + ".pdf",
      remarks: selectedItem.remarks,
    })
    toggleRename()
    setShowAlert(true)
    setAlertStatus("success")
    setAlertMessage("PDF Renamed Successfully.")
  }

  const deletePdf = async item => {
    setDeleteId(item.id)
    setCurrentFileName(item.filename)
    toggleDelete()
  }

  const DeletePdf = async () => {
    const { onGetDeletePdf } = props
    await onGetDeletePdf({ id: deleteId })
    toggleDelete()
    setAlertStatus("success")
    setShowAlert(true)
    setAlertMessage("PDF Deleted Successfully.")
  }

  useEffect(() => {
    props.slaRenamePdf !== null && props.getAllPdf()
  }, [props.slaRenamePdf])

  useEffect(() => {
    props.slaDeletePdf !== null && props.getAllPdf()
  }, [props.slaDeletePdf])

  const downloadViewPdf = async (item, action) => {
    const { onGetSlaPdfDownload } = props
    await onGetSlaPdfDownload(item.id)
    setCurrentAction(action)
    setCurrentFileName(item.filename)
  }

  const GetSearchedValue = async val => {
    setValue(val)
    if (val === "") {
      setCollection(cloneDeep(tableDatas.slice(0, rowsPerPage)))
      setFilterTableDatas(tableDatas)
    } else {
      const query = val.toLowerCase()
      setCurrentPage(0)
      const data = cloneDeep(
        tableDatas
          .filter(item => item.filename.toLowerCase().indexOf(query) > -1)
          .slice(0, rowsPerPage)
      )
      await setCollection(data)
      await setFilterTableDatas(
        tableDatas.filter(
          item => item.filename.toLowerCase().indexOf(query) > -1
        )
      )
    }
  }

  const updatePage = (event, currentPage) => {
    setCurrentPage(currentPage)
    const to = rowsPerPage * (currentPage + 1)
    const from = to - rowsPerPage
    setCollection(cloneDeep(filterTableDatas.slice(from, to)))
  }

  const tableRows = rowData => {
    const { key, index } = rowData
    const tableCell = Object.keys(tableHeader)
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>
    })

    return <tr key={index}>{columnData}</tr>
  }

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }))
  }

  const headRow = () => {
    return Object.values(tableHeader).map((title, index) => (
      <td key={index}>{title}</td>
    ))
  }

  const toggleRename = () => {
    setRenameOpen(!renameOpen)
  }

  const toggleDelete = () => {
    setDeleteOpen(!deleteOpen)
  }

  return (
    <>
      {tableDatas.length === 0 && (
        <p className="not_found">No Uploaded Documents Found!</p>
      )}
      {tableDatas.length > 0 && (
        <Fragment>
          <div className="search">
            <input
              placeholder="Search File Name"
              value={value}
              onChange={e => GetSearchedValue(e.target.value)}
              className="Search_input"
            />
          </div>
          <div className="top-page-number">
            <div className="enteriesText">
              {`${currentPage * rowsPerPage + 1} to ${
                filterTableDatas.length -
                  (currentPage * rowsPerPage + rowsPerPage) <
                0
                  ? filterTableDatas.length
                  : currentPage * rowsPerPage + rowsPerPage
              } of ${filterTableDatas.length} enteries`}
            </div>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <TablePagination
            totalPages={Math.ceil(filterTableDatas.length / rowsPerPage)}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onChangePage={updatePage}
          />
        </Fragment>
      )}

      {/* rename */}
      <Modal
        isOpen={renameOpen}
        toggle={toggleRename}
        id="rename-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={toggleRename}>
          <h3>Rename File</h3>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={10}>
              <AWSMInput
                value={renameFileName}
                onChange={value => setRenameFileName(value)}
              />
            </Col>
            <Col lg={2}>
              <div className="d-flex align-items-center h-100">.pdf</div>
            </Col>
          </Row>
        </ModalBody>
        <Row>
          <Col>
            <div className="d-flex justify-content-end pr-3 mt-2 mb-4">
              <button
                className="btn btn-outline-primary mr-3"
                onClick={toggleRename}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={RenamePdf}>
                Rename
              </button>
            </div>
          </Col>
        </Row>
      </Modal>

      {/* delete */}
      <Modal
        isOpen={deleteOpen}
        toggle={toggleDelete}
        id="rename-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={toggleDelete}>
          <h3>Delete Confirmation</h3>
        </ModalHeader>
        <ModalBody>
          <Row>
            <h6 className="mb-3">{currentFileName}</h6>
            <p className="text-error">
              Are You sure you want to delete file? This action cannot be undo.
            </p>
          </Row>
        </ModalBody>
        <Row>
          <Col>
            <div className="d-flex justify-content-end pr-3 mt-2 mb-4">
              <button
                className="btn btn-outline-danger mr-3"
                onClick={toggleDelete}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={DeletePdf}>
                Delete
              </button>
            </div>
          </Col>
        </Row>
      </Modal>
      <AWSMAlert
        status={alertStatus}
        message={alertMessage}
        openAlert={showAlert}
        closeAlert={() => setShowAlert(false)}
      />
    </>
  )
}

const mapStateToProps = ({ sla }) => ({
  slaPdfs: sla.slaPdfs,
  slaPdfDownload: sla.slaPdfDownload,
  slaRenamePdf: sla.slaRenamePdf,
  slaDeletePdf: sla.slaDeletePdf,
})

const mapDispatchToProps = dispatch => ({
  onGetSlaPdfDownload: params => dispatch(getSLAPdfDownload(params)),
  onGetRenamePdf: params => dispatch(getRenamePdf(params)),
  onGetDeletePdf: params => dispatch(getDeletePdf(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SLAPdfTable)
// export default SLAPdfTable;
