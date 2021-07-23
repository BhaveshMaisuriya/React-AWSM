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
import { BryntumSchedulerPro } from "@bryntum/schedulerpro-react"
import '@bryntum/schedulerpro/schedulerpro.classic-dark.css';
import '@bryntum/schedulerpro/schedulerpro.classic-light.css';
import '@bryntum/schedulerpro/schedulerpro.classic.css';
import '@bryntum/schedulerpro/schedulerpro.material.css';
import '@bryntum/schedulerpro/schedulerpro.stockholm.css';
import moment from 'moment'

function BryntumChartTable(props) {
    
    const schedulerproConfig = {
        project: {
            calendar: 'weekends',
            calendarsData: [
                {
                    id        : 'shift1',
                    name      : 'Day Shift',
                    // Intervals to define all SA and SU as non-working days
                    intervals : [
                        {
                            recurrentStartDate : 'at 08:00',
                            recurrentEndDate   : 'at 18:00',
                            isWorking          : false
                        },
                        {
                            "startDate"          : "2021-07-24",
                            "endDate"            : "2021-07-30",
                            isWorking          : false
                        }
                    ]
                },
                {
                    id        : 'weekends',
                    name      : 'Weekends',
                    // Intervals to define all SA and SU as non-working days
                    intervals : [
                        {
                            "startDate"          : "2021-07-28 00:00",
                            "endDate"            : "2021-07-29 00:00",
                            isWorking          : false
                        },
                        {
                            "startDate"          : "2021-07-30 00:00",
                            "endDate"            : "2021-07-31 00:00",
                            isWorking          : false
                        },
                        {
                            "startDate"          : "2021-07-29 00:00",
                            "endDate"            : "2021-07-30 00:00",
                            isWorking          : false
                        },
                        {
                            "startDate"          : "2021-07-31 00:00",
                            "endDate"            : "2021-08-01 00:00",
                            isWorking          : false
                        },
                        {
                            "startDate"          : "2021-07-31 00:00",
                            "endDate"            : "2021-08-01 00:00",
                            isWorking          : false
                        },
                        // {
                        //     recurrentStartDate : 'on Sat at 0:00',
                        //     recurrentEndDate   : 'on Mon at 0:00',
                        //     isWorking          : false
                        // }
                    ]
                },
                {
                    "id"                       : "day",
                    "name"                     : "Day shift",
                    "unspecifiedTimeIsWorking" : false,
                    "intervals"                : [
                        {
                            "recurrentStartDate" : "at 8:00",
                            "recurrentEndDate"   : "at 17:00",
                            "isWorking"          : true
                        }
                    ]
                },
                {
                    "id"                       : "early",
                    "name"                     : "Early shift",
                    "unspecifiedTimeIsWorking" : false,
                    "intervals"                : [
                        {
                            "recurrentStartDate" : "at 6:00",
                            "recurrentEndDate"   : "at 14:00",
                            "isWorking"          : true
                        }
                    ]
                },
                {
                    "id"                       : "late",
                    "name"                     : "Late shift",
                    "unspecifiedTimeIsWorking" : false,
                    "intervals"                : [
                        {
                            "recurrentStartDate" : "at 14:00",
                            "recurrentEndDate"   : "at 22:00",
                            "isWorking"          : true
                        }
                    ]
                },
                {
                    "id"                       : "night",
                    "name"                     : "Night shift",
                    "unspecifiedTimeIsWorking" : false,
                    "intervals"                : [
                        {
                            "recurrentStartDate" : "at 22:00",
                            "recurrentEndDate"   : "at 6:00",
                            "isWorking"          : true
                        }
                    ]
                }
            ]
        },
        columns : [],
        events: [
            { id : 1, resourceId : 1, name : 'RT13098 Drag true', startDate : '2021-07-19', endDate : '2021-07-23' },
            { id : 2, resourceId : 1, name : 'RT11940 Drag true', startDate : '2021-07-24 08:00', endDate : '2021-07-25 23:59', eventColor: 'blue' },
            { id : 3, resourceId : 2, name : 'RT11940 Drag true', startDate : '2021-07-20', endDate : '2021-07-21', eventColor: 'blue' },
            { id : 5, resourceId : 4, name : 'RT09567 Drag false', startDate : '2021-07-24', endDate : '2021-07-28', draggable : false, eventColor : 'red' }
        ],
        resourceTimeRanges: [
            {
                id             : 1,
                resourceId     : 3,
                startDate      : '2021-07-20',
                endDate        : '2021-07-30',
                name           : 'Not Available',
                timeRangeColor: 'gray',
                cls : 'unavailable-gantt'
                // this time range should repeat every day
                // recurrenceRule : 'FREQ=DAILY'
            }
        ],

        autoHeight : true,
        rowHeight  : 40,
        barMargin  : 4,
        features : {
            eventDrag : {
                constrainDragToResource : true,
                nonWorkingTime : true
            },
            nonWorkingTime         : true,
            resourceNonWorkingTime : true,
            timeRanges             : {
                showCurrentTimeLine : true
            }
        },
        startDate : moment().subtract(1, 'days').toDate(),
        endDate   : moment().add(1, 'days').toDate(),
        resources: ganttChartTableData,
        resourceNonWorkingTimeFeature: true,
        nonWorkingTimeFeature: true,
        resourceTimeRangesFeature: true,
        maxTimeAxisUnit : 'hour',
    }

    for (const tableMap of Object.keys(ganttChartTableMapping)) {
        schedulerproConfig.columns.push({
            text: ganttChartTableMapping[tableMap].label,
            field: tableMap,
            width: 'auto'
        })
    }
  return (
    <div className="rts-table-container scroll" id="scrollableDiv">
      <div className="container-orderbank" style={{ maxWidth: "100%" }}>
        <Row style={{}} className='w-100'>
          <Col lg={12}>
          <BryntumSchedulerPro
            {...schedulerproConfig}
            // other props, event handlers, etc
        />

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default BryntumChartTable