import PropTypes from "prop-types"
import React, { Component } from "react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

class SidebarContent extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.initMenu()
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu()
    }
  }

  initMenu() {
    new MetisMenu("#side-menu")

    let matchingMenuItem = null
    const ul = document.getElementById("side-menu")
    const items = ul.getElementsByTagName("a")
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem)
    }
  }

  activateParentDropdown = item => {
    item.classList.add("active")
    const parent = item.parentElement

    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      // parent.classList.add("mm-active")
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add("mm-show") // ul tag

        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      return false
    }
    return false
  }

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t("Menu")}</li>
            <li>
              <Link to="/#" className="waves-effect">
                <i className="bx bx-data" />
                <span className="badge badge-pill badge-info float-right">
                  04
                </span>
                <span>DQM</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/sales-inventory">Sales & Inventory</Link>
                  <Link to="/retail-customer">Retail Customer</Link>
                  <Link to="/commercial-customer">Commercial Customer</Link>
                  <Link to="/terminal">Terminal</Link>
                  <Link to="/road-tanker">Road Tanker</Link>
                  {/* <Link to="/employee-data">Employee Data</Link> */}
                  <Link to="/product">Product</Link>
                  {/* <Link to="/cloud-cluster">Cloud Clusters</Link> */}
                  <Link to="/sla">SLA</Link>
                  {/* <Link to="/order-forecast">Order Forecast Method</Link> */}
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className=" waves-effect">
                <i className="bx bxs-bar-chart-alt-2" />
                <span>RTS</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/rts">Dashboard</Link>
                  {/* <Link to="/dashboard/2">Dashboard2</Link> */}
                  <Link to="/highcharts">HighCharts</Link>
                  <Link to="/bryntum">Bryntum</Link>
                  <Link to="/orderbank">Order Bank</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#" className=" waves-effect">
                <i className="bx bxs-book-content" />
                <span>OPO</span>
              </Link>
            </li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="bx bxs-truck" />
                <span>RAM</span>
              </Link>
            </li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="bx bxs-microchip" />
                <span>DES</span>
              </Link>
            </li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="bx bxs-report" />
                <span>SDA</span>
              </Link>
            </li>

            <li>
              <Link to="#" className=" waves-effect">
                <i className="bx bxs-user-detail" />
                <span>EMS</span>
              </Link>
            </li>

            {/* <li className="menu-title">{this.props.t("Apps")}</li> */}

            {/* <li>
              <Link to="/calendar" className=" waves-effect">
                <i className="bx bx-calendar" />
                <span>Calendar</span>
              </Link>
            </li> */}
            {/* <li>
              <Link to="/highcharts" className=" waves-effect">
                <i className="bx bx-chat" />
                <span>HighCharts</span>
              </Link>
            </li>
            <li>
              <Link to="/bryntum" className=" waves-effect">
                <i className="bx bx-chat" />
                <span>Bryntum</span>
              </Link>
            </li> */}
            {/*
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-briefcase-alt" />
                <span>{this.props.t("Products")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/projects-grid">
                    {this.props.t("Projects Grid")}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    {this.props.t("Projects List")}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    {this.props.t("Project Overview")}
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    {this.props.t("Create New")}
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-task" />
                <span>{this.props.t("Tasks")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="#">{this.props.t("Task List")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Kanban Board")}</Link>
                </li>
                <li>
                  <Link to="#">{this.props.t("Create Task")}</Link>
                </li>
              </ul>
            </li>

            <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bxs-user-detail" />
                  <span>{this.props.t("Contacts")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/contacts-grid">{this.props.t("User Grid")}</Link>
                  </li>
                  <li>
                    <Link to="/contacts-list">{this.props.t("User List")}</Link>
                  </li>
                  <li>
                    <Link to="/contacts-profile">
                      {this.props.t("Profile")}
                    </Link>
                  </li>
                </ul>
              </li>
        
            <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bxs-bar-chart-alt-2" />
                  <span>{this.props.t("Charts")}</span>
                </Link>

                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/apex-charts">{this.props.t("Apex charts")}</Link>
                  </li>
                  <li>
                    <Link to="/chartist-charts">
                      {this.props.t("Chartist Chart")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/chartjs-charts">
                      {this.props.t("Chartjs Chart")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/e-charts">{this.props.t("E Chart")}</Link>
                  </li>
                  <li>
                    <Link to="/tui-charts">
                      {this.props.t("Toast UI Chart")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/sparkline-charts">
                      {this.props.t("Sparkline Chart")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/charts-knob">{this.props.t("Knob Chart")}</Link>
                  </li>
                </ul>
              </li>

            <li>
                <Link to="/#" className="has-arrow waves-effect">
                  <i className="bx bx-map" />
                  <span>{this.props.t("Maps")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/maps-google">{this.props.t("Google Maps")}</Link>
                  </li>
                  <li>
                    <Link to="/maps-vector">{this.props.t("Vector Maps")}</Link>
                  </li>
                  <li>
                    <Link to="/maps-leaflet">
                      {this.props.t("Leaflet Maps")}
                    </Link>
                  </li>
                </ul>
              </li>
*/}
          </ul>
        </div>
      </React.Fragment>
    )
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
}

export default withRouter(withTranslation()(SidebarContent))
