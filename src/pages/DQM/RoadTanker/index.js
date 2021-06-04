import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "./../Common"
import {
  getRoadTanker,
  getRoadTankerAuditLog,
  // getRoadTankerFilter,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"

import { transformArrayToString, getCookieByKey } from "./../Common/helper"

import { auditsRoadTanker, address } from "../../../common/data/roadTanker"
import { filter } from "lodash"

class RoadTanker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey("road-tanker-table")
        ? JSON.parse(getCookieByKey("road-tanker-table"))
        : tableColumns,
    }
  }

  componentDidMount() {
    const {
      onGetRoadTanker,
      onGetRoadTankerAuditLog,
      onGetTableInformation,
    } = this.props

    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "vehicle",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      pagination: 0,
      sort_dir: "desc",
      sort_field: "created",
      q: "commercial_customer",
    }
    onGetRoadTanker(params)
    onGetRoadTankerAuditLog(payload)
    //onGetTableInformation()
  }

  render() {
    const {
      onGetRoadTanker,
      onGetRoadTankerAuditLog,
      // onGetRoadTankerFilter,
      onGetTableInformation,
      onUpdateTableInformation,
      // auditsRoadTanker,
      filterRoadTanker,
      // address,
      roadTanker,
    } = this.props

    const { searchFields } = this.state
    if (!roadTanker || roadTanker.length === 0) return ""

    return (
      <Fragment>
        <Page
          onGetCustomer={onGetRoadTanker}
          onGetAuditLog={onGetRoadTankerAuditLog}
          // onGetFilter={onGetRoadTankerFilter}
          onGetTableInformation={onGetTableInformation}
          onUpdateTableInformation={onUpdateTableInformation}
          tableColumns={searchFields}
          tableMapping={tableMapping}
          tableData={roadTanker}
          audits={auditsRoadTanker}
          filter={filterRoadTanker}
          address={address}
          headerTitle="Road Tanker"
          cardTitle="Road Tanker List"
          modalComponent="not null"
        />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ roadTanker }) => ({
  roadTanker: roadTanker.roadTanker,
  // auditsRoadTanker: roadTanker.auditsRoadTanker,
  filterRoadTanker: roadTanker.filterRoadTanker,
  // address: retailCustomer.address,
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTanker: params => dispatch(getRoadTanker(params)),
  onGetRoadTankerAuditLog: payload => dispatch(getRoadTankerAuditLog(payload)),
  // onGetRoadTankerFilter: payload => dispatch(getRoadTankerFilter(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoadTanker)
