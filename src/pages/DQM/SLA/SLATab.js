import React, {
  Component,
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import './SLATab.scss'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap'
import SLATable from './SLATable'
import EditIcon from 'assets/images/AWSM-Edit-Icon.svg'
import TrashIcon from 'assets/images/AWSM-Trash-Icon.svg'
import NoDataIcon from 'assets/images/AWSM-No-Data-Available.svg'
import { ReactSVG } from 'react-svg'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AWSMButtonOption from 'components/Common/AWSMButtonOption'
import { createSLARecord, updateSLAItem, updateSLASection } from 'store/actions'
import {
  deleteSLARecord,
  createSLASection,
  updateSectionTab,
  deleteSLASection,
} from 'store/actions'
import SLAModalDetail from './EditModal/SLAModalDetail'
import { isScheduler } from 'helpers/auth_helper'
import ExitConfirmation from 'components/Common/ExitConfirmation'
import { isEqual } from 'lodash'

const DeleteNoteConfirmation = ({ isOpen, onDelete, onCancel, item }) => {
  return (
    <Modal isOpen={isOpen} className="delete-note-modal">
      <ModalHeader toggle={onCancel}>Delete Confirmation</ModalHeader>
      <ModalBody>
        <h6 className="mb-3">Are you sure you want to delete this {item}?</h6>
        <div className="d-flex align-items-center justify-content-end mt-4">
          <button onClick={onCancel} className="btn btn-dan mr-2">
            Cancel
          </button>
          <button onClick={onDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

const AddNewSectionModal = ({
  defaultValue,
  isOpen,
  onAdd,
  onCancel,
  type = 'add',
  listTabIsExist = [],
}) => {
  const MAX_CHARS = 12
  const inputRef = useRef(null)
  const [onEditing, setOnEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)
  const onCancelHandler = () => {
    setValue('')
    onCancel()
  }

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleValidatorData = () => {
    let item = listTabIsExist.filter(e => e.title === value)
    return !!item.length
  }

  const HandleSubmitData = () => {
    onAdd(value)
    setValue('')
  }

  useEffect(() => {
    if (onEditing) {
      inputRef.current?.focus()
    }
  }, [onEditing])

  const isError = useMemo(() => {
    return value.length > MAX_CHARS
  }, [value])

  const remainCharacters = useMemo(() => {
    return MAX_CHARS - value.length
  }, [value])

  return (
    <Modal isOpen={isOpen} className={'add-section'}>
      <ModalHeader toggle={onCancel}>
        {type == 'add' ? 'Add New' : 'Rename'} Section
      </ModalHeader>
      <ModalBody>
        <div className="title">
          {type == 'add'
            ? 'Please provide a name below if you wish to add a new section on this report.'
            : 'Please enter a new name below and click update if u wish to rename this section.'}
        </div>
        <div className="sla-section-label-edit mt-3">
          <div className="flex-grow-1 position-relative">
            <input
              onChange={e => setValue(e.target.value)}
              className={`sla-section-input add-new-section ${
                onEditing ? 'focus' : ''
              } ${isError ? 'error' : ''}`}
              onFocus={() => setOnEditing(true)}
              onBlur={() => setOnEditing(false)}
              value={value}
              ref={inputRef}
              placeholder="Type new name here.."
            />
            {onEditing && (
              <div
                className={`remain-character ${isError ? 'error' : 'valid'}`}
              >
                {`${remainCharacters >= 0 ? '+' : ''}${remainCharacters}`}
              </div>
            )}
          </div>
          {isError && (
            <div className="sla-section-error-message">
              Exceed character limit
            </div>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-end mt-3">
          <button onClick={onCancelHandler} className="btn btn-outline-primary">
            Cancel
          </button>
          <button
            onClick={HandleSubmitData}
            className="btn btn-primary"
            disabled={
              remainCharacters < 0 ||
              remainCharacters == MAX_CHARS ||
              handleValidatorData()
            }
          >
            {type == 'add' ? 'Add' : 'Update'}
          </button>
        </div>
      </ModalBody>
    </Modal>
  )
}

const SLAAddNote = ({ data, onSubmit, onDeleteNote, disabled }) => {
  const [onEditing, setOnEditing] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [value, setValue] = useState(data.notes || '')
  const [editor, setEditor] = useState(null)
  const [viewEditor, setViewEditor] = useState(null)

  useEffect(() => {
    setValue(data.notes || '')
  }, [data])

  const onOptionClick = option => {
    if (option.label === 'Edit') {
      setOnEditing(true)
    } else if (option.label === 'Delete') {
      onDeleteNote()
    }
  }
  const onUpdate = () => {
    if (onSubmit) {
      onSubmit(value, !!data.notes)
    }
    setOnEditing(false)
  }

  const onCancel = () => {
    if (!isEqual(data.notes, value) === true) {
      setShowExitConfirm(true)
    } else {
      setValue(data.notes || '')
      editor.setData(data.notes || '')
      setOnEditing(false)
    }
  }

  const onCancelConfirm = () => {
    setValue(data.notes || '')
    editor.setData(data.notes || '')
    setShowExitConfirm(false)
    setOnEditing(false)
  }

  const onConfirmCancel = () => {
    editor.setData(editor.getData())
    setValue(editor.getData())
    setShowExitConfirm(false)
    setOnEditing(true)
  }

  const onEditorChange = (event, editor) => {
    if (editor) {
      setValue(editor.getData())
    }
  }
  useEffect(() => {
    if (onEditing) {
      editor?.editing.view.focus()
    }
  }, [onEditing])

  return (
    <div className="sla-tab-add-container">
      {!data.notes && !onEditing ? (
        !disabled ? (
          <div className="sla-tab-add-note">
            <hr />
            <h4 onClick={() => setOnEditing(true)}>+ ADD NOTES</h4>
          </div>
        ) : null
      ) : (
        <div className="d-flex align-items-center justify-content-between py-3 note-title">
          <h4>Notes</h4>
          <AWSMButtonOption
            optionClick={onOptionClick}
            disabled={disabled}
            options={[
              { icon: EditIcon, label: 'Edit' },
              { icon: TrashIcon, label: 'Delete' },
            ]}
          />
        </div>
      )}

      <div
        className={
          onEditing
            ? !showExitConfirm
              ? 'add-note-content-container'
              : 'add-note-content-container border-none'
            : 'd-none'
        }
      >
        {showExitConfirm ? (
          <ExitConfirmation
            onExit={onCancelConfirm}
            onCancel={onConfirmCancel}
          />
        ) : (
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'numberedList',
                'bulletedList',
                '|',
                'outdent',
                'indent',
                '|',
              ],
            }}
            data={value}
            onChange={onEditorChange}
            onReady={editor => setEditor(editor)}
          />
        )}
        <div className="d-flex justify-content-end pr-3 mt-2">
          <button className="btn btn-outline-primary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={onUpdate}
            disabled={data.notes === value}
          >
            Update
          </button>
        </div>
      </div>

      <div className={!onEditing && data.notes ? 'd-block' : 'd-none'}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [],
          }}
          disabled
          data={data.notes}
          onReady={editor => setViewEditor(editor)}
        />
      </div>
    </div>
  )
}

const SectionLabelEdit = ({ defaultValue, disabled, onSubmit }) => {
  const MAX_CHARS = 120
  const inputRef = useRef(null)
  const [onEditing, setOnEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  useEffect(() => {
    if (onEditing) {
      inputRef.current?.focus()
    }
  }, [onEditing])

  const isError = useMemo(() => {
    return value.length > MAX_CHARS
  }, [value])

  const remainCharacters = useMemo(() => {
    return MAX_CHARS - value.length
  }, [value])

  const onCancel = () => {
    setValue(defaultValue)
    setOnEditing(false)
  }

  const onUpdate = event => {
    event.stopPropagation()
    if (onSubmit) {
      onSubmit(value)
    }
    setOnEditing(false)
  }

  const onButtonEditClick = () => {
    if (disabled) {
      return
    }
    setOnEditing(true)
  }

  return (
    <div className="sla-section-label-edit">
      <div className="flex-grow-1 position-relative">
        <input
          onChange={e => setValue(e.target.value)}
          className={`sla-section-input ${onEditing ? 'focus' : ''} ${
            isError ? 'error' : ''
          }`}
          onFocus={() => setOnEditing(true)}
          value={value}
          ref={inputRef}
          disabled={disabled || !onEditing}
          onClick={e => e.stopPropagation()}
        />
        {onEditing && (
          <div className={`remain-character ${isError ? 'error' : 'valid'}`}>
            {`${remainCharacters >= 0 ? '+' : ''}${remainCharacters}`}
          </div>
        )}
      </div>
      {!onEditing ? (
        <div className="sla-btn-edit" onClick={onButtonEditClick}>
          <ReactSVG src={EditIcon} />
        </div>
      ) : (
        <div className="d-flex">
          <button className="btn btn-outline-primary ml-3" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={isError || value === defaultValue}
            onClick={onUpdate}
          >
            Update
          </button>
        </div>
      )}
      {isError && (
        <div className="sla-section-error-message">Exceed character limit</div>
      )}
    </div>
  )
}

class SLATab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      addRowModal: false,
      deleteNoteModal: false,
      addSectionModal: false,
      renameSectionModal: false,
      deleteSectionModal: false,
      sectionNameSelected: '',
    }
    this.toggle = this.toggle.bind(this)
    this.onSubmitNote = this.onSubmitNote.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
    this.onSubmitSubtitle = this.onSubmitSubtitle.bind(this)
    this.onAddSectionHandler = this.onAddSectionHandler.bind(this)
    this.onOptionClick = this.onOptionClick.bind(this)
    this.onUpdateSectionHandler = this.onUpdateSectionHandler.bind(this)
    this.onDeleteSectionHandler = this.onDeleteSectionHandler.bind(this)
    this.onDeleteRecord = this.onDeleteRecord.bind(this)
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.data && prevProps.data !== this.props.data) {
      const { activeItem } = this.state
      const index = activeItem
        ? this.props.data.findIndex(e => e.id === activeItem.id)
        : -1
      if (activeItem && index >= 0) {
        this.setState({ activeTab: index })
      } else {
        this.setState({ activeItem: prevProps.data[0], activeTab: 0 })
      }
    }
  }

  toggle(index, item) {
    this.setState({
      activeTab: index,
      activeItem: item,
    })
  }

  onAddSection(e) {
    this.setState({ addSectionModal: true })
  }

  onSubmitSubtitle(section, value) {
    const { updateSLASection, category } = this.props
    updateSLASection({
      id: section.id,
      category: category,
      title: section.title,
      data: { subtitle: value },
    })
  }

  onSubmitNote(section, value, isUpdate) {
    const { updateSLASection, category } = this.props
    updateSLASection({
      id: section.id,
      category: category,
      title: section.title,
      data: { notes: value },
      action: isUpdate ? 'note-updated' : 'note-created',
    })
  }

  onDeleteNote() {
    const { updateSLASection, category, data } = this.props
    this.setState({ ...this.state, deleteNoteModal: false })
    updateSLASection({
      id: data[this.state.activeTab].id,
      category: category,
      title: data[this.state.activeTab].title,
      data: { notes: '' },
      action: 'note-deleted',
    })
  }

  onOptionClick(option) {
    if (option.label === 'Edit') {
      this.setState({
        renameSectionModal: true,
        sectionNameSelected: option.title,
      })
    } else if (option.label === 'Delete') {
      this.setState({
        deleteSectionModal: true,
        sectionNameSelected: option.title,
      })
    }
  }

  onAddSectionHandler(value) {
    const { createSLASection, category } = this.props
    createSLASection({ category: category, data: { title: value } })
    this.setState({
      addSectionModal: false,
    })
  }

  onUpdateSectionHandler(value) {
    const { updateSLASection, category, data } = this.props
    updateSLASection({
      id: data[this.state.activeTab].id,
      category: category,
      title: data[this.state.activeTab].title,
      data: { title: value },
    })
    this.setState({
      renameSectionModal: false,
    })
  }

  onHandleAddRow() {
    this.setState({ addRowModal: true })
  }

  onDeleteSectionHandler() {
    const { category, data, deleteSLASection } = this.props
    deleteSLASection({
      id: data[this.state.activeTab].id,
      title: data[this.state.activeTab].title,
      category: category,
    })
    this.setState({
      deleteSectionModal: false,
    })
  }

  onCreateSLARecordHandler(recordValue) {
    const { onCreateSLARecord, category, data } = this.props
    const { activeTab } = this.state
    const sectionSelected = data.length && data[activeTab]
    onCreateSLARecord({
      sectionId: sectionSelected.id,
      tabName: sectionSelected?.title,
      recordValue,
      category,
    })
  }

  onUpdateSLARecordHandler({ recordValue, itemId }) {
    const { onUpdateSLAItem, category, data } = this.props
    const { activeTab } = this.state
    const sectionSelected = data.length && data[activeTab]
    onUpdateSLAItem({
      sectionId: sectionSelected.id,
      tabName: sectionSelected?.title,
      recordId: itemId,
      recordValue,
      category,
    })
  }

  handleGenerateAddNewSection = () => {
    return (
      <AddNewSectionModal
        defaultValue={''}
        isOpen={this.state.addSectionModal}
        onAdd={this.onAddSectionHandler}
        onCancel={() =>
          this.setState({ ...this.state, addSectionModal: false })
        }
        listTabIsExist={this.props.data}
      />
    )
  }
  handleGenerateEditSection = () => {
    const { renameSectionModal, sectionNameSelected } = this.state
    return (
      sectionNameSelected && (
        <AddNewSectionModal
          key={new Date()}
          type={'edit'}
          defaultValue={sectionNameSelected}
          isOpen={renameSectionModal}
          onAdd={this.onUpdateSectionHandler}
          onCancel={() =>
            this.setState({ ...this.state, renameSectionModal: false })
          }
          listTabIsExist={this.props.data}
        />
      )
    )
  }
  handleGenerateDeleteSection = () => {
    const { deleteSectionModal, sectionNameSelected } = this.state
    return (
      <DeleteNoteConfirmation
        isOpen={deleteSectionModal}
        onDelete={this.onDeleteSectionHandler}
        onCancel={() =>
          this.setState({ ...this.state, deleteSectionModal: false })
        }
        item={'Section'}
      />
    )
  }

  onDeleteRecord(section, recordId) {
    const { deleteSLARecord, category } = this.props
    deleteSLARecord({
      category: category,
      id: section.id,
      title: section.title,
      recordId: recordId,
    })
  }

  render() {
    const { data } = this.props
    const { addRowModal } = this.state
    const scheduler = isScheduler()

    return (
      <Fragment>
        <Nav tabs className="nav-sla-tab col-12 mx-3">
          {data
            ? data.map((item, index) => {
                return (
                  <NavItem key={index}>
                    <NavLink
                      style={{ cursor: 'pointer' }}
                      className={classnames({
                        active: this.state.activeTab !== index,
                      })}
                      onClick={() => {
                        this.toggle(index, item)
                      }}
                    >
                      <div className="d-flex justify-content-center section-tab">
                        <div>{item.title}</div>
                        <button>
                          <AWSMButtonOption
                            optionClick={this.onOptionClick}
                            options={[
                              {
                                icon: EditIcon,
                                label: 'Edit',
                                title: item.title,
                              },
                              {
                                icon: TrashIcon,
                                label: 'Delete',
                                title: item.title,
                              },
                            ]}
                            disabled={scheduler}
                          />
                        </button>
                      </div>
                    </NavLink>
                  </NavItem>
                )
              })
            : null}
          <NavItem>
            <NavLink
              key={data ? data.length : 1}
              style={{ cursor: 'pointer' }}
              className="active sla-and-new-section"
              onClick={this.onAddSection.bind(this)}
              disabled={scheduler}
            >
              + Add Section
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={this.state.activeTab}
          className="p-3 text-muted col-12"
        >
          {data
            ? data.map((item, index) => {
                return (
                  <TabPane key={index} tabId={index}>
                    <div>
                      <div>
                        <SectionLabelEdit
                          defaultValue={item.subtitle}
                          disabled={scheduler}
                          onSubmit={value => this.onSubmitSubtitle(item, value)}
                          max_chars={120}
                        />
                        <SLATable
                          items={item.records}
                          onDeleteSLADetail={recordId =>
                            this.onDeleteRecord(item, recordId)
                          }
                          onUpdate={this.onUpdateSLARecordHandler.bind(this)}
                          scheduler={scheduler}
                        />
                        {item.records && item.records.length > 0 ? (
                          !scheduler && (
                            <a
                              className="sla-tab-add"
                              onClick={this.onHandleAddRow.bind(this)}
                            >
                              + Add Row
                            </a>
                          )
                        ) : (
                          <div className="sla-no-data">
                            <ReactSVG src={NoDataIcon} />
                            <h4 className="mt-5 mb-3">No KPI Yet</h4>
                            {!scheduler && (
                              <button
                                className="btn btn-primary"
                                onClick={this.onHandleAddRow.bind(this)}
                              >
                                + Add KPI
                              </button>
                            )}
                          </div>
                        )}
                        <SLAAddNote
                          data={item}
                          onSubmit={(value, isUpdate) =>
                            this.onSubmitNote(item, value, isUpdate)
                          }
                          disabled={scheduler}
                          onDeleteNote={() =>
                            this.setState({
                              ...this.state,
                              deleteNoteModal: true,
                            })
                          }
                        />
                      </div>
                    </div>
                  </TabPane>
                )
              })
            : null}
        </TabContent>
        <DeleteNoteConfirmation
          isOpen={this.state.deleteNoteModal}
          onDelete={this.onDeleteNote}
          onCancel={() =>
            this.setState({ ...this.state, deleteNoteModal: false })
          }
          item={'Notes'}
        />
        <SLAModalDetail
          openModalDetail={addRowModal}
          type={'add'}
          handleCloseModal={() => this.setState({ addRowModal: false })}
          onCreateSLARecord={this.onCreateSLARecordHandler.bind(this)}
        />
        {this.handleGenerateAddNewSection()}
        {this.handleGenerateEditSection()}
        {this.handleGenerateDeleteSection()}
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateSLASection: params => dispatch(updateSLASection(params)),
  deleteSLARecord: params => dispatch(deleteSLARecord(params)),
  createSLASection: params => dispatch(createSLASection(params)),
  updateSectionTab: params => dispatch(updateSectionTab(params)),
  deleteSlaSection: params => dispatch(deleteSLASection(params)),
  onUpdateSLAItem: event => dispatch(updateSLAItem(event)),
  onCreateSLARecord: event => dispatch(createSLARecord(event)),
  deleteSLASection: params => dispatch(deleteSLASection(params)),
})

export default connect(null, mapDispatchToProps)(SLATab)
