import React, { useEffect, useState, useRef, Fragment } from "react"
import cloneDeep from "lodash/cloneDeep"
import TablePagination from "../../../components/Common/DataTable/tablePagination"
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { connect } from "react-redux"
import { getSLAPdfDownload } from "store/actions"
import { saveAs } from 'file-saver';

var FileSaver = require('file-saver');

function SLAPdfTable(props) {
  const rowsPerPage = 10
  const [value, setValue] = useState("")
  const [tableDatas, setTableDatas] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [collection, setCollection] = useState([])

  useEffect(() => {
    async function fetchData() {      
      const { slaPdfs } = props;
      if(slaPdfs !== null && slaPdfs !== undefined ){
        await getAllPdfLists(slaPdfs);
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

    const getAllPdfLists = async(slaPdfs) => {
      let allData = [];
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
      ];

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
///file/6d9cdc2c-837f-42e1-bcdd-a7d044dc792?action=download

          var PdfLink = 'https://www.orimi.com/pdf-test.pdf'; // + item.location;
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
                <EditOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
                <SystemUpdateAltOutlinedIcon onClick={() => downloadPdf(item)} />&nbsp;&nbsp;&nbsp;&nbsp;
                <VisibilityOutlinedIcon onClick={() => window.open(PdfLink, "_blank")} />&nbsp;&nbsp;&nbsp;&nbsp;
                <DeleteOutlinedIcon />&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            )      
        }) 
      })
      await setTableDatas(allData) 
      await setCollection(cloneDeep(allData.slice(0, rowsPerPage)))
    }

    const downloadPdf = async(item) => {
      // saveAs(Pdfurl, Pdfname);
      const { onGetSlaPdfDownload } = props;
      await onGetSlaPdfDownload(item.id);
    }

  const GetSearchedValue = async val => {
    setValue(val)   
      if(val === '') { 
        setCollection(cloneDeep(tableDatas.slice(0, rowsPerPage))) 
      } else {
        const query = val.toLowerCase()
        setCurrentPage(0)
        const data = cloneDeep(
          tableDatas
            .filter(item => item.filename.toLowerCase().indexOf(query) > -1)
            .slice(0, rowsPerPage)
        )
        await setCollection(data)
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
                tableDatas.length - (currentPage * rowsPerPage + rowsPerPage) <
                0
                  ? tableDatas.length
                  : currentPage * rowsPerPage + rowsPerPage
              } of ${tableDatas.length} enteries`}
            </div>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <TablePagination
             totalPages={Math.ceil(
              tableDatas.length / rowsPerPage
            )}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onChangePage={updatePage}
          />
        </Fragment>
      )}
    </>
  )
}

const mapStateToProps = ({ sla }) => ({
  slaPdfs: sla.slaPdfs,
})

const mapDispatchToProps = dispatch => ({
  onGetSlaPdfDownload: (params) => dispatch(getSLAPdfDownload(params)),  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SLAPdfTable)
// export default SLAPdfTable;