import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import Page from "../Common"
import { getRoadTanker } from "store/actions"
import { tableColumns, tableMapping } from "./tableMapping"
import InformationModal from "./InformationModal"
import { transformArrayToString, getCookieByKey } from "../Common/helper"
import Loader from "components/Common/Loader"

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
    const { onGetRoadTanker } = this.props
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

  render() {
    const {
      onGetRoadTanker,
      filterRoadTanker,
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
            tableColumns={searchFields}
            defaultColumns={tableColumns}
            tableMapping={tableMapping}
            tableData={roadTanker}
            tableName={RoadTankerTableName}
            filter={filterRoadTanker}
            headerTitle="Road Tanker"
            cardTitle="Road Tanker List"
            modalComponent={InformationModal}
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
})

const mapDispatchToProps = dispatch => ({
  onGetRoadTanker: params => dispatch(getRoadTanker(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoadTanker)
