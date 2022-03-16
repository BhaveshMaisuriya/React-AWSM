/**
 * Popup Component
 */
import React from 'react'
import './BryntumPopup.scss'
import CancelIcon from 'assets/images/AWSM-Cancel-Icon.svg'
import BlockIcon from '@material-ui/icons/Block'
import { connect } from 'react-redux'
import { getShipmentDetailsOnVehicle } from 'store/actions'

const fakeData = [
  {
    station: {
      ship_to: 36114489,
      name: 'MAJU GAS TRADING',
      planned_load_time: '09:00',
      loading_time: 1,
      duration_from_terminal: 3,
      ETA: '13:00',
    },
    order_1: {
      product: 'Primax 97 Premium',
      volume: '5460L',
      station_category: 'lv1',
      dn_no: 1234,
    },
  },
  {
    station: {
      ship_to: 36114564,
      name: 'ONE SH TRADING',
      planned_load_time: null,
      loading_time: null,
      duration_from_terminal: null,
      ETA: '17:00',
      depart_time_from_prev_station: '14:00',
      duration_from_prev_station: 3,
    },
    order_1: {
      product: 'Primax 95 Premium',
      volume: '5460L',
      station_category: 'lv1',
      dn_no: 1234,
      blocked_dn: true,
    },
  },
]
class Popup extends React.Component {
  /**
   * Constructor (initializes state and binds handlers)
   * @param {Object} props
   */
  constructor(props) {
    super()

    // Extract values used in the editor and keep them in state
    const { eventRecord, shipmentDetailsOnVehicle } = props
    this.state = {
      startDate: null,
      endDate: null,
      eventType: 'Meeting',
      location: '',
      resourceId: null,
      id: null,
      duration: null,
      durationUnit: '',
    }
    for (const key in this.state) {
      if (eventRecord[key]) {
        this.state[key] = eventRecord[key]
      }
    }

    // shortcuts to handlers
    this.dataChangedHandler = this.dataChangedHandler.bind(this)
    this.saveClickHandler = this.saveClickHandler.bind(this)
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this)
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this)
  }

  /**
   * Sets the changed value to state
   * @param {HTMLElement} target The input that changed
   */
  dataChangedHandler({ target }) {
    this.setState(prevState => {
      return {
        ...prevState,
        [target.name]: target.value,
      }
    })
  }

  /**
   * Updates state with startDate
   * @param {Date} startDate
   */
  startDateChangeHandler(startDate) {
    this.setState(prevState => {
      return {
        ...prevState,
        startDate: startDate,
      }
    })
  }
  componentDidMount() {
    this.props.getShipmentDetailsOnVehicle(this.props.eventRecord._data.id)
    this.setState(prevState => {
      return {
        ...prevState,
        duration: this.props.eventRecord._data.duration,
        durationUnit: this.props.eventRecord._data.durationUnit,
      }
    })
  }

  /**
   * Updates state with endDate
   * @param {Date} endDate
   */
  endDateChangeHandler(endDate) {
    this.setState(prevState => {
      return {
        ...prevState,
        endDate: endDate,
      }
    })
  }

  /**
   * Saves the modified form data to the record being edited
   */
  saveClickHandler() {
    const eventRecord = this.props.eventRecord

    // We need to reset this flag to tell scheduler that this is a real event
    eventRecord.isCreating = false

    // Update the eventRecord using the default setters
    eventRecord.beginBatch()
    for (const key in this.state) {
      eventRecord[key] = this.state[key]
    }

    // Add the eventRecord to the eventStore if it is not already there
    if (!eventRecord.eventStore) {
      this.props.eventStore.add(eventRecord)
    }
    eventRecord.endBatch()

    this.props.closePopup()
  }

  /**
   * @return The markup to render
   */
  render() {
    const convertLoadTime = (duration, durationUnit) => {
      switch (durationUnit) {
        case 'day':
          const hours = Math.floor(duration * 24)
          const minutes = (((duration * 24) % 1) * 60).toFixed(0)
          return `${hours}:${minutes}`
        default:
          break
      }
    }
    return (
      <div className="popup-mask">
        <div className="popup">
          <header>
            Shipment Details: Vehicle No {this.state.resourceId}&nbsp;{' '}
            <span className="close-popup" onClick={this.props.closePopup}>
              <img src={CancelIcon} />
            </span>
          </header>
          <div className="sub-header">
            <ul>
              <li>Terminal: KVDT M808</li>
              <li>Shipment No: {this.state.id}</li>
              <li>
                Planned Load Time:{' '}
                {convertLoadTime(this.state.duration, this.state.durationUnit)}
              </li>
            </ul>
          </div>
          <table>
            <thead>
              <tr className="table-header">
                <td>NO.</td>
                <td>STATION</td>
                <td>ORDER 1</td>
                <td>ORDER 2</td>
                <td>ORDER 3</td>
                <td>ORDER 4</td>
                <td>ORDER 5</td>
              </tr>
            </thead>
            <tbody className="table-body">
              {fakeData.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>
                      <p>Ship To: {order.station.ship_to}</p>
                      <p>Name: {order.station.name}</p>
                      {order.station.planned_load_time ? (
                        <p>
                          Planned load time: {order.station.planned_load_time}
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {order.order_1 ? (
                        <div>
                          <p>Product: {order.order_1.product}</p>
                          <p>Volume: {order.order_1.volume}</p>
                          <p>
                            Station Category: {order.order_1.station_category}
                          </p>
                          <p>DN No. : {order.order_1.dn_no}</p>
                          <p>
                            {order.order_1.blocked_dn ? (
                              <span className="blocked-dn">
                                <BlockIcon fontSize="small" /> Blocked DN
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ) : (
                        'N.A'
                      )}
                    </td>
                    <td>
                      {order.order_2 ? (
                        <div>
                          <p>Product: {order.order_2.product}</p>
                          <p>Volume: {order.order_2.volume}</p>
                          <p>
                            Station Category: {order.order_2.station_category}
                          </p>
                          <p>DN No. : {order.order_2.dn_no}</p>
                          <p>
                            {order.order_2.blocked_dn ? (
                              <span className="blocked-dn">
                                <BlockIcon fontSize="small" /> Blocked DN
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ) : (
                        'N.A'
                      )}
                    </td>
                    <td>
                      {order.order_3 ? (
                        <div>
                          <p>Product: {order.order_3.product}</p>
                          <p>Volume: {order.order_3.volume}</p>
                          <p>
                            Station Category: {order.order_3.station_category}
                          </p>
                          <p>DN No. : {order.order_3.dn_no}</p>
                          <p>
                            {order.order_3.blocked_dn ? (
                              <span className="blocked-dn">
                                <BlockIcon fontSize="small" /> Blocked DN
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ) : (
                        'N.A'
                      )}
                    </td>
                    <td>
                      {order.order_4 ? (
                        <div>
                          <p>Product: {order.order_4.product}</p>
                          <p>Volume: {order.order_4.volume}</p>
                          <p>
                            Station Category: {order.order_4.station_category}
                          </p>
                          <p>DN No. : {order.order_4.dn_no}</p>
                          <p>
                            {order.order_4.blocked_dn ? (
                              <div className="blocked-dn">
                                <BlockIcon fontSize="small" /> Blocked DN
                              </div>
                            ) : null}
                          </p>
                        </div>
                      ) : (
                        'N.A'
                      )}
                    </td>
                    <td>
                      {order.order_5 ? (
                        <div>
                          <p>Product: {order.order_5.product}</p>
                          <p>Volume: {order.order_5.volume}</p>
                          <p>
                            Station Category: {order.order_5.station_category}
                          </p>
                          <p>DN No. : {order.order_5.dn_no}</p>
                          <p>
                            {order.order_5.blocked_dn ? (
                              <span className="blocked-dn">
                                <BlockIcon fontSize="small" /> Blocked DN
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ) : (
                        'N.A'
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ orderBank }) => {
  return {
    shipmentDetailsOnVehicle: orderBank.shipmentDetailsOnVehicle,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getShipmentDetailsOnVehicle: params =>
      dispatch(getShipmentDetailsOnVehicle(params)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)
