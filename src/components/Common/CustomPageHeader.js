import React, { Component } from "react"
import PropTypes from "prop-types"
import { Col, Row } from "reactstrap"

class Breadcrumbs extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs="12">
            <div className="page-title-box d-flex align-items-center justify-content-between font-size-20">
              <h4 className="mb-0">{this.props.title}</h4>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

Breadcrumbs.propTypes = {
  title: PropTypes.string,
}

export default Breadcrumbs
