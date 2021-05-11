import React, { Component } from "react"
import { Col, Card, CardBody, Table } from "reactstrap"
import ReactApexChart from "react-apexcharts"

class TotalSellingProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series1: [95],
      series2: [94],
      series3: [92],
      series4: [85],
      seriesc: [96],
      radialoptionsc: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#34c38f"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "60%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions1: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#34c38f"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "60%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions2: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#556ee6"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "60%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions3: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#f46a6a"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "60%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions4: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#f46a6a"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "60%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* <Col xl="12"> */}
          <Card>
            <CardBody>
              <div className="clearfix">
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
                <h4 className="card-title mb-4">ASR Submission by Region</h4>
              </div>

              <div className="text-muted text-center">
                <p className="mb-2">All regions</p>
                <h4>6385</h4>
                <p className="mt-4 mb-0">
                  <span className="badge badge-soft-success font-size-11 mr-2">
                    {" "}
                    0.6% <i className="mdi mdi-arrow-up"/>{" "}
                  </span>{" "}
                  From previous period
                </p>
              </div>

              <div className="table-responsive mt-4">
                <Table className="table-centered mb-0">
                  <tbody>
                  <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Central</h5>
                        <p className="text-muted mb-0">Central Region</p>
                      </td>

                      <td>
                        <div id="radialchart-1" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptionsc}
                            series={this.state.seriesc}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-1">ASR</p>
                        <h5 className="mb-0">96 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Northern</h5>
                        <p className="text-muted mb-0">Northern Region</p>
                      </td>

                      <td>
                        <div id="radialchart-1" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions1}
                            series={this.state.series1}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-1">ASR</p>
                        <h5 className="mb-0">95 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Southern</h5>
                        <p className="text-muted mb-0">Southern Region</p>
                      </td>

                      <td>
                        <div id="radialchart-2" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions2}
                            series={this.state.series2}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-1">ASR</p>
                        <h5 className="mb-0">94 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Eastern</h5>
                        <p className="text-muted mb-0">Easter Region</p>
                      </td>

                      <td>
                        <div id="radialchart-3" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions3}
                            series={this.state.series3}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-1">ASR</p>
                        <h5 className="mb-0">92 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Borneo</h5>
                        <p className="text-muted mb-0">Borneo</p>
                      </td>

                      <td>
                        <div id="radialchart-3" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions4}
                            series={this.state.series4}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <p className="text-muted mb-1">ASR</p>
                        <h5 className="mb-0">85 %</h5>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        {/* </Col> */}
      </React.Fragment>
    )
  }
}

export default TotalSellingProduct
