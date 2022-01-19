import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import {
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Row,
  Nav,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Col,
} from 'reactstrap'
import ExitConfirmation from 'components/Common/ExitConfirmation'
import AWSMInput from 'components/Common/Input'
import AWSMDropdown from 'components/Common/Dropdown'
import AWSMAlert from 'components/Common/AWSMAlert'
import { getEditOrderBankDetail } from 'store/actions'
import REGION_TERMINAL, {
  TERMINAL_CODE_MAPPING_ID,
  TERMINAL_CODE_MAPPING,
} from 'common/data/regionAndTerminal'
import {
  AddressTripTab,
  DeliveryTab,
  IndicatorContactTab,
  SiteDNTab,
  OrderTab,
} from './exportAllTab'

const timeData = []
const navItems = [
  { id: '1', name: 'Order' },
  { id: '2', name: 'Delivery' },
  { id: '3', name: 'Site & DN' },
  { id: '4', name: 'Indicator & Contact' },
  { id: '5', name: 'Address & Trip' },
]

for (let i = 0; i < 24; i++) {
  timeData.push(`${i.toString().padStart(2, '0')}:00`)
  timeData.push(`${i.toString().padStart(2, '0')}:15`)
  timeData.push(`${i.toString().padStart(2, '0')}:30`)
  timeData.push(`${i.toString().padStart(2, '0')}:45`)
}
timeData.push(`23:59`)

const EditOrderBankModal = props => {
  const { open, onCancel, viewData, region, terminal, editorderBankData } = props

  const [isConfirm, setIsConfirm] = useState(false)
  const [editOrderData, setEditOrderData] = useState(null)
  const [originalEditOrderData, setoriginalEditOrderData] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [activeTab, setActiveTab] = useState('1')
  const [inputValue, setInputValue] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [terminalList, setTerminalList] = useState([])
  const regionList = REGION_TERMINAL.map(item => item.region)

  useEffect(() => {
    if (viewData !== null) {
      let temp = { ...viewData }
      const currentRegion = REGION_TERMINAL.find(e => e.region === props?.region)
      setTerminalList(currentRegion ? currentRegion.terminal : [])
      temp.terminal = props.terminal;
      temp.region = props?.region
      setEditOrderData(temp)
      setoriginalEditOrderData(temp)
    }
  }, [viewData])

  useEffect(async () => {}, [region])

  const onConfirmCancel = () => {
    setIsConfirm(false)
  }

  const handleUpdate = async () => {
    const temp = {
      shift_date: editOrderData?.shift_date, //shiftDate.toISOString().split('T')[0],
      requested_delivery_date: editOrderData?.requested_delivery_date, //shiftDate.toISOString().split('T')[0],
      my_remark_1: editOrderData?.my_remark_1,
      my_remark_2: editOrderData?.my_remark_2,
      my_remark_3: editOrderData?.my_remark_3,
      terminal: TERMINAL_CODE_MAPPING[editOrderData?.terminal],
      volume: parseInt(editOrderData?.volume),
      eta: editOrderData?.eta,
      planned_load_time: editOrderData?.planned_load_time,
      remarks: editOrderData?.remarks,
      priority: editOrderData?.priority,
      vehicle: editOrderData?.vehicle,
      commercial_storage: editOrderData?.commercial_storage,
      retail_storage: editOrderData?.retail_storage,
    }
    const { onGetEditOrderBankDetails } = props
    await onGetEditOrderBankDetails({ id: editOrderData.id, data: temp })
    setIsUpdate(true)
  }

  useEffect(() => {
    if (editorderBankData && isUpdate === true) {
      typeof editorderBankData === 'object' && editorderBankData.status === undefined
        ? onCancel('edit', 'success')
        : onCancel('edit', 'error')
      setEditOrderData(null)
      setIsUpdate(false)
    }
  }, [editorderBankData])

  const onConfirmExit = () => {
    setIsConfirm(false)
    if (onCancel) {
      onCancel('cancel')
    }
  }

  const toggle = () => {
    if (originalEditOrderData !== editOrderData) {
      setIsConfirm(true)
    } else {
      if (onCancel) {
        onCancel('cancel')
      }
    }
  }

  const onFieldChange = (key, value) => {
    if (key === 'region') {
      const currentRegion = REGION_TERMINAL.find(e => e.region === value)
      setTerminalList(currentRegion ? currentRegion.terminal : [])

      const newOrderData = { ...editOrderData }
      newOrderData[key] = currentRegion ? currentRegion.region : ''
      newOrderData['terminal'] = currentRegion.terminal[0];
      setEditOrderData(newOrderData)
    } else if (key === 'remarks') {
      setInputValue(value)
      if (value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_1') {
      setInputValue1(value)
      if (value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_2') {
      setInputValue2(value)
      if (value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_3') {
      setInputValue3(value)
      if (value.length < 40) {
        const newOrderData = { ...editOrderData }
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else {
      const newOrderData = { ...editOrderData }
      newOrderData[key] = value
      setEditOrderData(newOrderData)
    }
  }

  const formatDate = date => {
    if (date) {
      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    } else return ''
  }

  const hrMints = val => {
    if (val !== '' && val !== undefined && val !== null) {
      let temp = val.split(':')
      return temp[0] + ':' + temp[1]
    } else {
      return ' - '
    }
  }

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">View/Edit Details: Order ID {editOrderData?.id}</span>
        <span className="last-updated-sub-title">
          {`Last Updated By: ${editOrderData?.updated_by?.split('@')[0] || 'Unknown'} on ${
            (editOrderData?.created_at &&
              format(new Date(editOrderData?.created_at), 'do LLL yyyy')) ||
            ''
          }`}
        </span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v pl-30">
        {isConfirm && <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />}
        {!isConfirm && editOrderData !== null && (
          <>
            <Row className="w-100">
              <Col md={4}>
                <label>SHIFT DATE</label>
                <AWSMInput
                  type="text"
                  value={formatDate(editOrderData?.shift_date)}
                  disabled={true}
                />
              </Col>
              <Col>
                <label className="text-upper">region & terminal</label>
                <Row>
                  <div className="col-3">
                    <AWSMDropdown
                      items={regionList}
                      onChange={value => onFieldChange('region', value)}
                      value={editOrderData.region ? editOrderData.region : ''}
                      disabled={false}
                    />
                  </div>
                  <div className="col-3">
                    <AWSMDropdown
                      items={terminalList}
                      onChange={value => onFieldChange('terminal', value)}
                      value={editOrderData?.terminal}
                      disabled={false}
                    />
                  </div>
                </Row>
              </Col>
            </Row>
            <div className="mt-4 border-tab">
              <Nav pills justified>
                {navItems.map((index, key) => {
                  return (
                    <NavItem>
                      <NavLink
                        id={key}
                        className={activeTab === index.id ? 'active' : ''}
                        onClick={() => setActiveTab(index.id)}
                      >
                        <span className="d-none d-sm-block">{index.name}</span>
                      </NavLink>
                    </NavItem>
                  )
                })}
              </Nav>
            </div>
            <div className="scroll order-scroll">
              <TabContent activeTab={activeTab} className="py-1">
                <TabPane tabId="1">
                  <OrderTab
                    data={editOrderData}
                    inputValue={inputValue}
                    inputValue1={inputValue1}
                    inputValue2={inputValue2}
                    inputValue3={inputValue3}
                    onFieldChange={onFieldChange}
                    timeData={timeData}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <DeliveryTab hrMints={hrMints} data={editOrderData} />
                </TabPane>
                <TabPane tabId="3">
                  <SiteDNTab data={editOrderData} />
                </TabPane>
                <TabPane tabId="4">
                  <IndicatorContactTab data={editOrderData} />
                </TabPane>
                <TabPane tabId="5">
                  <AddressTripTab data={editOrderData} />
                </TabPane>
              </TabContent>
            </div>
          </>
        )}
      </ModalBody>

      {!isConfirm && (
        <ModalFooter>
          <Button color="light-primary" className="light-primary p-1320" outline onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" className="p-1320" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      )}
      {showAlert && (
        <AWSMAlert
          status="success"
          message="Order Details has successfully load"
          openAlert={showAlert}
          closeAlert={() => setShowAlert(false)}
        />
      )}
    </Modal>
  )
}

const mapStateToProps = ({ orderBank }) => ({
  currentOrderDetail: orderBank.currentOrderDetail,
  editorderBankData: orderBank.editorderBankData,
})

const mapDispatchToProps = dispatch => ({
  onGetEditOrderBankDetails: params => dispatch(getEditOrderBankDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderBankModal)