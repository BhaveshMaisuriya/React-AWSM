import React, { Component, Fragment } from "react"
import { tableColumns, tableMapping } from "./tableMapping"
import classnames from "classnames"
import FixedColumnTable from "../../../components/Common/FrozenTableColumn"

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Modal,
    ModalHeader,
    CardText,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardHeader,
    Button
  } from "reactstrap"
class SLATab extends Component {
  constructor(props) {
    super(props)
    this.state = {
    activeTab: 0
    }
    this.toggle = this.toggle.bind(this)
  }

  componentDidMount() {
    
  }

  toggle(index) {
      this.setState({
          activeTab: index
      })
  }

  render() {
    const { data } = this.props
    return (
      <Fragment>
                    <Nav tabs className="nav-sla-tab col-12">
                      {data.map((item, index) => {
                          return (
                            <NavItem key={index}>
                                <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                    active: this.state.activeTab != index,
                                    })}
                                    onClick={() => {
                                        this.toggle(index)
                                    }}
                                    >
                                    {item.title}
                                </NavLink>
                      </NavItem>
                          )
                      })}
                      <NavItem>
                                <NavLink key={data.length}
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                    active: this.state.activeTab != data.length,
                                    })}
                                    onClick={() => {
                                        this.toggle(data.length)
                                    }}
                                    >
                                    +
                                </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} className="p-3 text-muted col-12">
                    {data.map((item, index) => {
                          return (
                            <TabPane key={index} tabId={index}>
                        <Row>
                          <Col sm="12" lg="12" md="12">
                            <CardText className="mb-0">
                              {item.subtitle}
                            </CardText>
                            <FixedColumnTable
                        headers={tableColumns}
                        config={tableMapping}
                        tableData={item.items}
                        frozen={1}
                        // modalPop={this.modalHandlerTI}
                      />
                      <a className="sla-tab-add">+ Add Row</a>
                          </Col>
                        </Row>
                      </TabPane>
                          )
                      })}
                     
                </TabContent>
      </Fragment>
    )
  }
}


export default SLATab