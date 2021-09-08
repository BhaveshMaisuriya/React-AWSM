import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "./../Common"
import {
  getRoadTanker,
  getRoadTankerAuditLog,
  getDownloadRoadTanker,
  getTableInformation,
  updateTableInformation,
} from "../../../store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import InformationModal from "./InformationModal"
import { transformArrayToString, getCookieByKey } from "./../Common/helper"
import Loader from "../../../components/Common/Loader"

const RoadTankerTableName = "road-tanker-table"
class RoadTanker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchFields: getCookieByKey(RoadTankerTableName)
        ? JSON.parse(getCookieByKey(RoadTankerTableName))
        : tableColumns,
      isRoadTankerTIVisible: true,
    }
  }

  componentDidMount() {
    const {
      onGetRoadTanker,
      onGetRoadTankerAuditLog,
      onGetTableInformation,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "vehicle",
      search_fields: transformArrayToString(searchFields),
    }
    const payload = {
      limit: 6,
      page: 1,
      module: "road-tanker",
    }
    onGetRoadTanker(params)
    onGetRoadTankerAuditLog(payload)
  }

  GetonDownload = async currentPage => {
    const downloadParams = {
      limit: null,
      page: 0,
      search_fields: "*",
    }
    const { onGetDownloadRoadTanker } = this.props
    await onGetDownloadRoadTanker(downloadParams)
  }

  render() {
    const {
      onGetRoadTanker,
      onGetRoadTankerAuditLog,
      onGetTableInformation,
      onUpdateTableInformation,
      filterRoadTanker,
      downloadRoadTanker,
      roadTanker,
      auditsRoadTanker,
      tableError,
      roadTankerIsLoading,
    } = this.props
    const { searchFields } = this.state

    return (
      <Fragment>
        {roadTankerIsLoading ? <Loader /> : ""}
        {roadTanker.list && (
          <Page
            onGetMainTable={onGetRoadTanker}
            onGetAuditLog={onGetRoadTankerAuditLog}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={roadTanker}
            tableName={RoadTankerTableName}
            downloadtableData={downloadRoadTanker}
            audits={auditsRoadTanker}
            filter={filterRoadTanker}
            headerTitle="Road Tanker"
            cardTitle="Road Tanker List"
            modalComponent={InformationModal}
            onGetDownloadCustomer={this.GetonDownload}
          />
        )}
        {tableError && (
          <div className="page-content">
            <div className="container-fluid">
              <p>
                There's some issue loading the data. Please refresh the page or
                try again later
              </p>
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ roadTanker }) => ({
  roadTanker: roadTanker.roadTanker,
  tableError: roadTanker.tableError,
  roadTankerIsLoading: roadTanker.isLoading,
  filterRoadTanker: roadTanker.filterRoadTanker,
  downloadRoadTanker: roadTanker.downloadRoadTanker,
  auditsRoadTanker: roadTanker.auditsRoadTanker
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTanker: params => dispatch(getRoadTanker(params)),
  onGetRoadTankerAuditLog: payload => dispatch(getRoadTankerAuditLog(payload)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadRoadTanker: params => dispatch(getDownloadRoadTanker(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoadTanker)
