import React, { PureComponent } from "react";
import {
  Modal,
  ModalHeader
} from "reactstrap";
import TableInformation from "../../../components/Common/TableInformation"


class TableInformationWrapper extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: "1",
    }
  }

  render() {
    const { activeTab } = this.state;
    const toggle = tab => {
      if (activeTab !== tab) {
        this.setState({ activeTab: tab })
      }
    }
    const { onCancel, visible, data } = this.props;

    const modalContent = visible ? (
      <Modal isOpen={visible} contentClassName="modalTIContainer">
        <ModalHeader toggle={this.toggleTI}>
          <span
            style={{
              height: "26px",
              color: "#000000",
              fontFamily: "Museo Sans",
              letterSpacing: "0",
              lineHeight: "26px",
            }}
          >
            Table Information
          </span>
          <span className="last-updated-sub-title">
              Last Updated By: Nur Izzati on 3rd March 2021
            </span>
        </ModalHeader>
        <div>
          <TableInformation
            closeModal={onCancel}
            data={data}
            dataList={data.list}
          />
        </div>
      </Modal>
    ) : null
    return modalContent
  }
}

export default TableInformationWrapper;
