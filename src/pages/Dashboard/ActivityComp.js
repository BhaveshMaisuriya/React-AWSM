import React, { Component } from "react"
import { Card, CardBody, CardTitle, Media, Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle } from "reactstrap"
import { Link } from "react-router-dom"

class ActivityComp extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-1">Team on Duty</CardTitle>
            <Dropdown className="mb-4"
                        isOpen={this.state.btnprimary1}
                        toggle={() =>
                          this.setState({
                            btnprimary1: !this.state.btnprimary1,
                          })
                        }
                      >
                        <DropdownToggle
                          tag="button"
                          className="btn btn-primary"
                        >
                          Central Region <i className="mdi mdi-chevron-down"></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem>Northern</DropdownItem>
                          <DropdownItem>Southern</DropdownItem>
                          <DropdownItem>Eastern</DropdownItem>
                          <DropdownItem>Central</DropdownItem>
                          <DropdownItem>Borneo</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>{" "}
            <ul className="verti-timeline list-unstyled">
              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"/>
                </div>
                <Media>
                  <div className="mr-3">
                    <h5 className="font-size-14">
                    M Firdaus Zakaria{" "}
                      <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"/>
                    </h5>
                  </div>
                  <Media body>
                    <div>Team Lead. Duty ends in 3 hours.</div>
                  </Media>
                </Media>
              </li>

              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"/>
                </div>
                <Media>
                  <div className="mr-3">
                    <h5 className="font-size-14">
                    M Zamri B Abdullah{" "}
                      <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"/>
                    </h5>
                  </div>
                  <Media body>
                    <div id="activitytext">
                      Scheduler <Link to="mailto:sahil.chaddha@petronas.com"> Contact</Link>
                    </div>
                  </Media>
                </Media>
              </li>
              <li className="event-list active">
                <div className="event-timeline-dot">
                  <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"/>
                </div>
                <Media>
                  <div className="mr-3">
                    <h5 className="font-size-14">
                    M Taufik Hamid{" "}
                      <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"/>
                    </h5>
                  </div>
                  <Media body>
                    <div>Scheduler Controller</div>
                  </Media>
                </Media>
              </li>
              <li className="event-list">
                <div className="event-timeline-dot">
                  <i className="bx bx-right-arrow-circle font-size-18"/>
                </div>
                <Media>
                  <div className="mr-3">
                    <h5 className="font-size-14">
                    M Fakhruddin Kamaruzzaman{" "}
                      <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"/>
                    </h5>
                  </div>
                  <Media body>
                    <div>Scheduler</div>
                  </Media>
                </Media>
              </li>
            </ul>
            <div className="text-center mt-4">
                              <Link
                                to=""
                                className="waves-effect waves-light"
                              >
                                View More <i className="mdi mdi-arrow-right ml-1"></i>
                              </Link>
              {/* <Link
                to=""
                className="btn btn-primary waves-effect waves-light btn-sm"
              >
                View More <i className="mdi mdi-arrow-right ml-1"/>
              </Link> */}
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default ActivityComp
