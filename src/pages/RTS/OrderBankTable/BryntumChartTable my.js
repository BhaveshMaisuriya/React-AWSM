import React, { Component, useMemo, useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import {
  Row,
  Col,
  Popover,
  PopoverBody,
} from "reactstrap"
import { createPopper } from "@popperjs/core"
import {
  ganttChartTableMapping,
  ganttChartTableData,
  ganttChartTableEvents,
} from "./tableMapping"
import "./index.scss"
import { BryntumSchedulerPro } from "@bryntum/schedulerpro-react"
import "@bryntum/schedulerpro/schedulerpro.classic-dark.css"
import "@bryntum/schedulerpro/schedulerpro.classic-light.css"
import "@bryntum/schedulerpro/schedulerpro.classic.css"
import "@bryntum/schedulerpro/schedulerpro.material.css"
import "@bryntum/schedulerpro/schedulerpro.stockholm.css"
import moment from "moment"

function BryntumChartTable(props) {
  const schedulerConfig = {
    eventColor: null,
    timeRangesFeature: {
      narrowThreshold: 10,
    },
    autoHeight: true,
    rowHeight: 40,
    barMargin: 1,
    features : {
      eventDrag : {
          constrainDragToResource : true,
          nonWorkingTime : true
      },
      eventTooltip : {
        // align : 't-b', // Align left to right,
        template : data => `
        <div className="hover_tooltip">
          <p className="white-bg brdr-radius">1</p>
          <p className="blue-bg brdr-radius">M808</p>
          <p className="white-text brdr-radius">3 hrs</p>
          <p className="green-bg brdr-radius">eta 09:00</p>
        </div>
        `
    },
      timeRanges             : {
          showCurrentTimeLine : true
      }
  },
    startDate        : new Date(2021, 6, 27, 0),
    endDate          : new Date(2021, 6, 27, 24),
    viewPreset: "hourAndDay",
    useInitialAnimation: "slide-from-left",
    zoomKeepsOriginalTimespan: false,
    events: [
      {
        id: 1,
        resourceId: 2,
        name: "M808",
        startDate  : new Date(2021, 6, 27, 2),
        endDate    : new Date(2021, 6, 27, 5),
        durationUnit: "h",
        eventColor: "sky",
      },
      {
        id: 2,
        resourceId: 3,
        name: "M808",
        startDate  : new Date(2021, 6, 27, 4),
        endDate    : new Date(2021, 6, 27, 6),
        eventColor: "blue",
        durationUnit: "h",
      },
      {
        id: 3,
        resourceId: 5,
        name: "",
        startDate  : new Date(2021, 6, 27, 1),
        endDate    : new Date(2021, 6, 27, 5, 30),
        eventColor: "blue",
        durationUnit: "h",
      },
      {
        id: 4,
        resourceId: 1,
        name: "",
        startDate  : new Date(2021, 6, 27, 1),
        endDate    : new Date(2021, 6, 27, 10, 30),
        eventColor: "red",
        durationUnit: "h",
      },
      {
        id: 5,
        resourceId: 4,
        name: "",
        startDate  : new Date(2021, 6, 27, 4, 30),
        endDate    : new Date(2021, 6, 27, 10),
        draggable: false,
        eventColor: "red",
        durationUnit: "h",
      },
    ],
    columns: [],
    resources: ganttChartTableData,
    multiEventSelect : true,
  }

  for (const tableMap of Object.keys(ganttChartTableMapping)) {
    schedulerConfig.columns.push({
      text: ganttChartTableMapping[tableMap].label,
      field: tableMap,
      width: "auto",
    })
  }

  const para = document.createElement("p");
  const node = document.createTextNode("M808");
  para.appendChild(node);
  // const element = document.getElementsByClassName("b-sch-event-content");
  // element.appendChild(para);
  // var target = document.getElementsByClassName("b-has-content")[0];
  // var count = target && target.length;
  var target = document.querySelector(".b-sch-event-content");
  var subtarget = document.querySelector(".hover_display");
  // var html = '<h1 id="title">Some Title</h1><span style="display:inline-block; width=100px;">Some arbitrary text</span>';
  
  if(target){
    target.addEventListener("mouseover", function(e) {
      console.log("here", target)
      // document.getElementsByClassName("b-sch-event-content").innerHTML = html;
      // target.innerHTML(html);
      // appendHtml(document.body, html);
      subtarget.style.display = 'flex';
    });
    target.addEventListener("mouseout", function(e) {
      subtarget.style.display = 'none';
    });
  }

  const target = document.getElementsByClassName(`b-sch-event-content`);
  const hover = document.getElementsByClassName(`b-sch-event`)[0];
  const bottom_target = document.getElementsByClassName(`hover_display`)[0];
 
  if (hover) {    
    hover.addEventListener("mouseenter", event => {
      console.log("here", hover);
      bottom_target.setAttribute("style", "display:flex;");
      target.innerHTML = "Hello World!";
    })
    hover.addEventListener("mouseleave", event => {
      console.log("here1", hover);
      bottom_target.setAttribute("style", "display:none;");
    })
  }

  return (
    <div className="rts-table-container scroll" id="scrollableDiv">
      <div className="container-orderbank" style={{ maxWidth: "100%" }}>
        <Row style={{}} className="w-100">
          <Col lg={12}>
            <BryntumScheduler {...schedulerConfig} />
          </Col>
        </Row>
        {filterList.map(e => {
          return (
            <ChartColumnFilter
              key={e.key}
              filterKey={e.key}
              filterData={ganttChartTableData.map(v => v[e.key])}
            />
          )
        })}
      </div>
      <ConfirmDNStatusModal 
        isOpen={modal} 
        onSend={sendRequestsHandler} 
        onCancel={toggle} 
        headerContent={dropdownSelectedItem?.header || ''} 
        bodyContent={`Are you sure you want to proceed for ${dropdownSelectedItem?.body || ''}`}/>
    </div>
  )
}

export default BryntumChartTable
