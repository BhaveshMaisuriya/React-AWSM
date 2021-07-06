import React, { Component, useMemo, useState, useEffect } from "react"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import NoDataIcon from "../../../assets/images/AWSM-No-Data-Available.svg"
import {
  ganttChartTableColumns,
  ganttChartTableMapping,
  ganttChartTableData,
} from "./tableMapping"
import "./index.scss"

function GanttChartTable(props) {
  return (
    <div className="rts-table-container scroll right_border" id="scrollableDiv">
      <div className="container-orderbank" style={{ maxWidth: "100%" }}>
        <Row className='w-100'>
          <Col lg={5}>
            <table className={`scrollable`}>
              <thead>
                <tr>
                  {ganttChartTableColumns.map(v => {
                    return (
                      <th>{ganttChartTableMapping[v].label.toUpperCase()}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {ganttChartTableData && ganttChartTableData.length ? (
                  ganttChartTableData.map(v => {
                    return (
                      <tr>
                        {ganttChartTableColumns.map(e => {
                          return e === "vehicle" ? (
                            <td>
                              <span className={`circle`}>
                                {v[e]}{" "}
                                {v["pto"] && (
                                  <span className="pto_tag">{v["pto"]}</span>
                                )}{" "}
                              </span>
                            </td>
                          ) : e === "status" ? (
                            <td>
                              <span className={`circle`}>{v[e]}</span>
                            </td>
                          ) : (
                            <td>
                              <span className={`circle`}>{v[e]}</span>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={18} className={"rts-table-nodata"}>
                      <div>
                        <img src={NoDataIcon} alt="No Data" />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
          <Col lg={7}></Col>
        </Row>
      </div>
      <div className="square_border mb-3 mt-3">
        <div className='d-flex align-items-center  mr-2'>
          <div className="square light-sky mr-1 ml-2"></div>RT Availability
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square dark-sky mr-1 ml-2"></div>Scheduled
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square lavendar mr-1 ml-2"></div>Pending Shipment
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square blue mr-1 ml-2"></div>Shipment Created
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square grey mr-1 ml-2"></div>Pending Cancellation
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square light-red mr-1 ml-2"></div>Blocked DN
        </div>
        <div className='d-flex align-items-center  mr-2'>
          <div className="square yellow mr-1 ml-2"></div>Soft Overrule
        </div>        
      </div>
    </div>
  )
}

export default GanttChartTable
