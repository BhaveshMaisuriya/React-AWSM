import React, { useEffect, useState, useRef, Fragment } from "react"
import cloneDeep from "lodash/cloneDeep"
import TablePagination from "../../../components/Common/Pagination"

function SLATable(props) {
  const rowsPerPage = 10
  const [value, setValue] = useState("")
  const [tableDatas, setTableDatas] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [collection, setCollection] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { allData, tableHead } = props
      await setTableDatas(allData)
      await setTableHeader(tableHead)
      await setCollection(cloneDeep(allData.slice(0, rowsPerPage)))
    }
    fetchData()
  }, [props.allData])

  const GetSearchedValue = async val => {
    setValue(val)
    if (!val) {
      updatePage(1)
    } else {
      const query = val.toLowerCase()
      setCurrentPage(0)
      const data = cloneDeep(
        tableDatas.filter(item => item.name.toLowerCase().indexOf(query) > -1).slice(0, rowsPerPage)
      )
      await setCollection(data)
    }
  }

  const updatePage = (event, currentPage) => {
    setCurrentPage(currentPage)
    const to = rowsPerPage * currentPage
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
    return Object.values(tableHeader).map((title, index) => <td key={index}>{title}</td>)
  }

  return (
    <>
      {tableDatas?.length === 0 && <p className="not_found">No Uploaded Documents Found!</p>}
      {tableDatas?.length > 0 && (
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
                tableDatas?.length - (currentPage * rowsPerPage + rowsPerPage) < 0
                  ? tableDatas?.length
                  : currentPage * rowsPerPage + rowsPerPage
              } of ${tableDatas?.length} enteries`}
            </div>
          </div>
          <table>
            <thead>
              <tr>{headRow()}</tr>
            </thead>
            <tbody className="trhover">{tableData()}</tbody>
          </table>
          <TablePagination
            count={tableDatas?.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onChangePage={updatePage}
          />
        </Fragment>
      )}
    </>
  )
}
export default SLATable
