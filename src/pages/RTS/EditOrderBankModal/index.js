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
import DatePicker from 'components/Common/DatePicker'
import AWSMDropdown from 'components/Common/Dropdown'
import AWSMAlert from 'components/Common/AWSMAlert'
import {
  getEditOrderBankDetail,
  getEditOrderBankDetailClear,
} from 'store/actions'
import REGION_TERMINAL, {
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
  const { open, onCancel, editorderBankData, onEditOrderBankDetailClear } =
    props
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
  const [productList, setProductList] = useState([])

  const regionList = REGION_TERMINAL.map(item => item.region)

  useEffect(() => {
    if (editorderBankData) {
      const temp = { ...editorderBankData }
      setEditOrderData(temp)
      setoriginalEditOrderData(temp)

      const currentRegion = REGION_TERMINAL.find(
        e => e.region === props?.region
      )
      setTerminalList(currentRegion ? currentRegion.terminal : [])
      temp.terminal = props.terminal
      temp.region = props?.region

      const productListName = editorderBankData?.storage.map(a => a.name)
      setProductList(productListName)

      setInputValue(
        editorderBankData.order_remarks ? editorderBankData.order_remarks : ''
      )
      setInputValue1(
        editorderBankData.my_remark_1 ? editorderBankData.my_remark_1 : ''
      )
      setInputValue2(
        editorderBankData.my_remark_2 ? editorderBankData.my_remark_1 : ''
      )
      setInputValue3(
        editorderBankData.my_remark_3 ? editorderBankData.my_remark_1 : ''
      )
    }
  }, [editorderBankData])

  const onConfirmCancel = () => {
    setIsConfirm(false)
    onEditOrderBankDetailClear()
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
      eta: editOrderData?.shift_date + ' ' + editOrderData?.eta,
      planned_load_time:
        editOrderData?.shift_date + ' ' + editOrderData?.planned_load_time,
      order_remarks: editOrderData?.order_remarks,
      priority: editOrderData?.priority,
      vehicle: editOrderData?.vehicle,
      commercial_storage: editOrderData?.commercial_storage,
      retail_storage: editOrderData?.retail_storage,
      multi_load_id: editOrderData?.multi_load_id,
      multi_prod_id: editOrderData?.multi_prod_id,
      order_type: editOrderData?.order_type,
      product_category: editOrderData?.format_product_category,
    }
    const { onGetEditOrderBankDetails } = props
    await onGetEditOrderBankDetails({ id: editOrderData.id, data: temp })
    setIsUpdate(true)
  }

  useEffect(() => {
    if (editorderBankData && isUpdate === true) {
      typeof editorderBankData === 'object' &&
      editorderBankData.status === undefined
        ? onCancel('edit', 'success')
        : onCancel('edit', 'error')
      setIsUpdate(false)
      onEditOrderBankDetailClear()
    }
  }, [editorderBankData, isUpdate])

  const onConfirmExit = () => {
    setIsConfirm(false)
    onEditOrderBankDetailClear()
    if (onCancel) {
      onCancel('cancel')
    }
  }

  const toggle = () => {
    if (originalEditOrderData !== editOrderData) {
      setIsConfirm(true)
      onEditOrderBankDetailClear()
    } else {
      if (onCancel) {
        onCancel('cancel')
        onEditOrderBankDetailClear()
      }
    }
  }

  const onFieldChange = (key, value) => {
    const newOrderData = { ...editOrderData }

    if (key === 'region') {
      const currentRegion = REGION_TERMINAL.find(e => e.region === value)
      setTerminalList(currentRegion ? currentRegion.terminal : [])

      const newOrderData = { ...editOrderData }
      newOrderData[key] = currentRegion ? currentRegion.region : ''
      newOrderData['terminal'] = currentRegion.terminal[0]
      setEditOrderData(newOrderData)
    } else if (key === 'order_remarks') {
      setInputValue(value)
      if (value.length <= 40) {
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_1') {
      setInputValue1(value)
      if (value.length <= 40) {
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_2') {
      setInputValue2(value)
      if (value.length <= 40) {
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    } else if (key === 'my_remark_3') {
      setInputValue3(value)
      if (value.length <= 40) {
        newOrderData[key] = value
        setEditOrderData(newOrderData)
      }
    }
    if (key === 'product_name') {
      const pro_code = newOrderData.storage.find(res => res.name === value)
      newOrderData['retail_storage'] = pro_code.id
      newOrderData['format_product_code'] = pro_code.product
      newOrderData['format_product'] = pro_code.name
      newOrderData['format_product_category'] = pro_code.sales_category
      newOrderData['order_type'] = pro_code.ordering_category
      setEditOrderData(newOrderData)
    } else {
      newOrderData[key] = value
      setEditOrderData(newOrderData)
    }
  }

  const hrMints = val => {
    if (val !== '' && val !== undefined && val !== null) {
      const temp = val.split(':')
      return temp[0] + ':' + temp[1]
    } else {
      return ' - '
    }
  }

  const disableEdit = (dnStatus, dnNo) => {
    if (dnStatus !== 'Clean DN') {
      if (dnNo) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  const auditLogSummary = (createdBy, updatedBy, createdAt) => {
    if (updatedBy !== null) {
      return ` Last Updated By: ${
        updatedBy ? updatedBy.split('@')[0] : 'Unknown'
      }
      on ${createdAt ? format(new Date(createdAt), 'do LLL yyyy') : ''}`
    } else {
      return ` Created By: ${createdBy ? createdBy.split('@')[0] : 'Unknown'}
      on ${createdAt ? format(new Date(createdAt), 'do LLL yyyy') : ''}`
    }
  }

  return (
    <Modal isOpen={open} className="new-order-modal">
      <ModalHeader toggle={toggle}>
        <span className="modal-title">
          View/Edit Details: Order ID {editOrderData?.id}
        </span>
        <span className="last-updated-sub-title">
          {auditLogSummary(
            editOrderData?.created_by || null,
            editOrderData?.updated_by || null,
            editOrderData?.created_at || null
          )}
        </span>
      </ModalHeader>

      <ModalBody className="position-relative h-70v pl-30">
        {isConfirm && (
          <ExitConfirmation onExit={onConfirmExit} onCancel={onConfirmCancel} />
        )}
        {!isConfirm && editOrderData !== null && (
          <>
            <Row className="w-100">
              <Col md={4}>
                <label>SHIFT DATE</label>
                <DatePicker
                  value={editOrderData?.requested_delivery_date}
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
                      disabled={disableEdit(
                        editOrderData?.dn_status,
                        editOrderData?.dn_no
                      )}
                    />
                  </div>
                  <div className="col-3">
                    <AWSMDropdown
                      items={terminalList}
                      onChange={value => onFieldChange('terminal', value)}
                      value={editOrderData?.terminal}
                      disabled={disableEdit(
                        editOrderData?.dn_status,
                        editOrderData?.dn_no
                      )}
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
                    productList={productList}
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
          <Button
            color="light-primary"
            className="light-primary p-1320"
            outline
            onClick={toggle}
          >
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
  onEditOrderBankDetailClear: params =>
    dispatch(getEditOrderBankDetailClear(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrderBankModal)
