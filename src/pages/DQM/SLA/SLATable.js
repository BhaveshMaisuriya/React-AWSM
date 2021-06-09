import React, { useEffect, useState, useRef } from "react"
import cloneDeep from "lodash/cloneDeep"
import throttle from "lodash/throttle"
import Pagination from "rc-pagination"
import "rc-pagination/assets/index.css"

function SLATable(props) {
  const countPerPage = 10
  const [value, setValue] = useState("")
  const [tableDatas, setTableDatas] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [collection, setCollection] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { allData, tableHead } = props
      await setTableDatas(allData)
      await setTableHeader(tableHead)
      await setCollection(cloneDeep(allData.slice(0, countPerPage)))
    }
    fetchData()
  }, [props.allData])

  const GetSearchedValue = async(val) => {
    setValue(val);
    if (!val) {
      updatePage(1)
    } else {
      const query = val.toLowerCase();
      setCurrentPage(1)
      const data = cloneDeep(
        tableDatas
          .filter(item => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      )
      await setCollection(data)
    }
  }

  const updatePage = p => {
    setCurrentPage(p)
    const to = countPerPage * p
    const from = to - countPerPage
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
      <div class="search">
        <input
          placeholder="Search"
          value={value}
          onChange={e => GetSearchedValue(e.target.value)}
          className='Search_input'
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={tableDatas.length}
      />
    </>
  )
}
export default SLATable
