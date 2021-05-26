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
      displayConfirmationBox: false,
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
      <Modal isOpen={visible} contentClassName="modalTIContainer" toggle={() => setDisplayConfirmationBox(!displayConfirmationBox)} >
      <ModalHeader toggle={() => setDisplayConfirmationBox(!displayConfirmationBox)}>
      <h3>
        <span>Table Information 
          <span className="last-updated-sub-title">
            Last Updated By: Nur Izzati on 3rd March 2021
          </span>
        </span>
      </h3>
      </ModalHeader>
        <div>
          {this.state.displayConfirmationBox ?
            <div className="Confirmation-box">
              <div>
                <h3>Exit Confirmation</h3>
                <p>Are you sure you want to exit without update? <br />You will lose all the changes made.</p>
                <button className="btn btn-outline-danger" onClick={() => this.setState({displayConfirmationBox: false})}>Cancel</button>
                <button className="btn btn-danger" onClick={onCancel}>Exit</button>
              </div>
            </div>
              : 
              <TableInformation
                closeModal={onCancel}
                data={data}
                dataList={data.list}
              />            
          }
        </div>
      </Modal>
    ) : null
    return modalContent
  }
}

export default TableInformationWrapper;