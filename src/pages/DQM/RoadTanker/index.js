import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "./../Common"
import {
  getRoadTanker,
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
      subModule: "road-tanker",
    }
  }

  componentDidMount() {
    const {
      onGetRoadTanker,
    } = this.props
    const { searchFields } = this.state
    const params = {
      limit: 10,
      page: 0,
      sort_dir: "asc",
      sort_field: "vehicle",
      search_fields: transformArrayToString(searchFields),
    }
    onGetRoadTanker(params)
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
      onGetTableInformation,
      onUpdateTableInformation,
      filterRoadTanker,
      downloadRoadTanker,
      roadTanker,
      tableError,
      roadTankerIsLoading,
    } = this.props
    const { searchFields, subModule } = this.state

    return (
      <Fragment>
        {roadTankerIsLoading ? <Loader /> : ""}
        {roadTanker.list && (
          <Page
            onGetMainTable={onGetRoadTanker}
            onGetTableInformation={onGetTableInformation}
            onUpdateTableInformation={onUpdateTableInformation}
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={roadTanker}
            tableName={RoadTankerTableName}
            downloadtableData={downloadRoadTanker}
            filter={filterRoadTanker}
            headerTitle="Road Tanker"
            cardTitle="Road Tanker List"
            modalComponent={InformationModal}
            onGetDownloadCustomer={this.GetonDownload}
            subModule={subModule}
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
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTanker: params => dispatch(getRoadTanker(params)),
  onGetTableInformation: () => dispatch(getTableInformation()),
  onUpdateTableInformation: event => dispatch(updateTableInformation(event)),
  onGetDownloadRoadTanker: params => dispatch(getDownloadRoadTanker(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoadTanker)