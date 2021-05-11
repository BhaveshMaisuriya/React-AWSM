import React, { Component } from "react"
import { Card, CardBody, CardTitle, Progress } from "reactstrap"

class TopCities extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
          <div className="float-right">
                  <div className="input-group input-group-sm">
                    <select className="custom-select custom-select-sm">
                      <option defaultValue>Jan 21</option>
                      <option value="1">Dec 20</option>
                      <option value="2">Nov 20</option>
                      <option value="3">Oct 20</option>
                    </select>
                  </div>
                </div>
            <CardTitle className="mb-4">New Customers Registered</CardTitle>
            <div className="text-center">
              <div className="mb-4">
                <i className="bx bx-map-pin text-primary display-4"/>
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Northern</p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">4</h5>
                    </td>
                    <td>
                      <Progress
                        value="94"
                        color="primary"
                        // className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Southern</p>
                    </td>
                    <td>
                      <h5 className="mb-0">3</h5>
                    </td>
                    <td>
                      <Progress
                        value="82"
                        color="success"
                        // className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Eastern</p>
                    </td>
                    <td>
                      <h5 className="mb-0">2</h5>
                    </td>
                    <td>
                      <Progress
                        value="70"
                        color="warning"
                        // className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Central</p>
                    </td>
                    <td>
                      <h5 className="mb-0">5</h5>
                    </td>
                    <td>
                      <Progress
                        value="54"
                        color="warning"
                        // className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Borneo</p>
                    </td>
                    <td>
                      <h5 className="mb-0">1</h5>
                    </td>
                    <td>
                      <Progress
                        value="70"
                        color="danger"
                        // className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default TopCities
