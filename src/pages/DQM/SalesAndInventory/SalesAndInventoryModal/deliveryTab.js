import React, { Component } from "react"
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined"
import Tooltip from "@material-ui/core/Tooltip"
import informationIcon from "../../../../assets/images/AWSM-Information.svg"
import { format } from "date-fns"
export default class DeliveryTab extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleEvent = this.handleEvent.bind(this)
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler()
    }
  }

  componentWillUnmount() {}

  // Prototype methods, Bind in Constructor (ES2015)
  handleEvent() {}

  // Class Properties (Stage 3 Proposal)
  handler = () => {
    this.setState()
  }

  render() {
    const { data } = this.props
    return (
      <>
        <label className="delivery-table-label">PAST DELIVERY</label>
        <table className="delivery-table-snl table">
          <thead>
            <tr>
              <th>
                DATE{" "}
                <Tooltip title="1 week historical data">
                  <img src={informationIcon} />
                </Tooltip>
              </th>
              <th>
                VOLUME (L){" "}
                <Tooltip title="1 week historical data">
                  <img src={informationIcon} />
                </Tooltip>
              </th>
              <th>
                VOLUME ADJUSTMENT (L){" "}
                <Tooltip title="1 week historical data taken from Yesterday Delivery Adjustment (L)">
                  <img src={informationIcon} />
                </Tooltip>
              </th>
              <th>
                TOTAL DELIVERY (L){" "}
                <Tooltip title="1 week historical data taken Total Delivery = Past Delivery Volume + Past Delivery Volume Adjustment">
                  <img src={informationIcon} />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(record => {
              return (
                <tr>
                  <td>{format(new Date(record?.date), "do LLL yyyy")}</td>
                  <td>{record?.volume}</td>
                  <td>{record?.volume_adjustment}</td>
                  <td>{record?.total_delivery}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
}
