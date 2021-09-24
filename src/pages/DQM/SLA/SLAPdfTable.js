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

var temp =
  "   JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg=="

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
  const [deleteId, setDeleteId] = useState('') 
  const [alertMessage, setAlertMessage] = useState('')  
  const [showAlert, setShowAlert] = useState(false)  
  const [alertStatus, setAlertStatus] = useState('')  

  useEffect(() => {
    async function fetchData() {
      const { slaPdfs } = props
      if (slaPdfs !== null && slaPdfs !== undefined) {
        await getAllPdfLists(slaPdfs)
        const tableHead = {
          filename: "FILE NAME",
          created_at: "TIME UPDATED",
          category: "VERSION",
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
    if (slaPdfDownload !== null) {//slaPdfDownload.data.data
      const blob = base64toBlob(temp)
      const PdfUrl = URL.createObjectURL(blob)
      if (currentAction === "view") {
        window.open(PdfUrl, "_blank")
      } else {
        const linkSource = `data:application/pdf;base64,${temp}`
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
            <Tooltip title="Rename PdDF">
              <EditOutlinedIcon onClick={() => reNamePdf(item)} />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Download PdDF">
              <SystemUpdateAltOutlinedIcon
                onClick={() => downloadViewPdf(item, "download")}
              />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="View PdDF">
              <VisibilityOutlinedIcon
                onClick={() => downloadViewPdf(item, "view")}
              />
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Delete PdDF">
              <DeleteOutlinedIcon onClick={() => deletePdf(item)} />
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
      filename: renameFileName + '.pdf',
      remarks: selectedItem.remarks,
    })
    toggleRename()
    setShowAlert(true);
    setAlertStatus('success');
    setAlertMessage('PDF Renamed Successfully.')
  }

  const deletePdf = async item => {
    setDeleteId(item.id);
    setCurrentFileName(item.filename);
    toggleDelete();
  }

  const DeletePdf = async () => {
    const { onGetDeletePdf } = props
    await onGetDeletePdf({id: deleteId});
    toggleDelete()
    setAlertStatus('error');
    setShowAlert(true);
    setAlertMessage('PDF Deleted Successfully.')
  }

  useEffect(() => {
    props.slaRenamePdf !== null && props.getAllPdf();
  }, [props.slaRenamePdf])

  useEffect(() => {
    props.slaDeletePdf !== null && props.getAllPdf();
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
      await setFilterTableDatas(data)
    }
  }

  const updatePage = (event, currentPage) => {
    setCurrentPage(currentPage)
    const to = rowsPerPage * (currentPage + 1)
    const from = to - rowsPerPage
    setCollection(cloneDeep(tableDatas.slice(from, to)))
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
              placeholder="Search"
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
            <h6 className='mb-3'>Lorem ipsum {currentFileName}</h6>
            <p className='text-error'>Are You sure you want to delete file? This action cannot be undo.</p>
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
