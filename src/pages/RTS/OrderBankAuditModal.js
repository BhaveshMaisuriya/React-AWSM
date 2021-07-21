import React, { Fragment, useState } from "react"
import { Modal, ModalHeader } from "reactstrap";
import AuditLog from "components/Common/AuditLog";
import { connect } from "react-redux"

function OrderBankAuditModal(props) {
    const [rowsAudit, setRowsAudit] = useState(6);
    const [currentAuditPage, setCurrentAuditPage] = useState(0);

    function toggle() {
        props.istoggle();
    }

    function CloseModal() {
      props.CloseModal();
    }

    function handleChangeAuditPage (event, currentAudit) {
        setCurrentAuditPage(currentAudit);
    }

  return (
    <Fragment>
      {props.auditsCom.list && props.auditsCom.list.length > 0 &&
      <Modal
        isOpen={props.open}
        toggle={toggle}
        id="auditLog-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={toggle}>
          <h3>Audit Log</h3>
        </ModalHeader>
        <AuditLog
          rowsAudit={rowsAudit}
          currentAuditPage={currentAuditPage}
          data={props.auditsCom.list}
          closeModal={CloseModal}
          handlePageChange={handleChangeAuditPage}
        />
      </Modal>
      }
    </Fragment>
  )
}

const mapStateToProps = ({ orderBank }) => ({
    auditsCom: orderBank.auditsCom,
  })
  
  const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderBankAuditModal)