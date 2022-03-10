import React from 'react'
import { connect } from 'react-redux'
import { dragOrderBankToGanttChartConfirm } from 'store/actions'

import RedAlertIcon from 'assets/images/AWSM-Red-Alert.svg'
import ConfirmDNStatusModal from './confirmDNStatusModal'

const AlertOverruleModal = ({ confirmRestrictions, ganttChartScheduling }) => {
  const { orderIndexes, constraints, requiresConfirmation } =
    ganttChartScheduling

  return (
    <ConfirmDNStatusModal
      isOpen={constraints.length > 0}
      headerContent={
        <>
          <img src={RedAlertIcon} className="header-icon" alt="alerticon" />
          {requiresConfirmation
            ? 'Soft Overrule Alert!'
            : 'Hard Overrule Alert!'}
        </>
      }
      bodyContent={
        <>
          <p style={{ marginBottom: 0 }}>
            {requiresConfirmation
              ? 'Your order assignment does not fulfill the requirement below:'
              : 'This action is not allowed. Your order assignment does not fulfill the requirement below:'}
          </p>
          <br />
          <br />
          <textarea
            className="error-alert-message"
            rows="4"
            disabled
            value={constraints.join('&#10;')}
          ></textarea>
          <br />
          <br />
          <p>
            {requiresConfirmation
              ? 'Are you sure you want to proceed?'
              : 'Please check your order and re-assign'}
          </p>
          <br />
        </>
      }
      styleColor="danger"
      onCancel={() => confirmRestrictions({ proceed: false })}
      onSend={
        requiresConfirmation &&
        (() => confirmRestrictions({ proceed: true, orderIndexes }))
      }
    />
  )
}

const mapStateToProps = ({ orderBank }) => ({
  ganttChartScheduling: orderBank.ganttChart.scheduling,
})

const mapDispatchToProps = dispatch => ({
  confirmRestrictions: params =>
    dispatch(dragOrderBankToGanttChartConfirm(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AlertOverruleModal)
