import React, {
  Component,
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react"
import { connect } from "react-redux"
import classnames from "classnames"
import "./SLATab.scss"
import { Nav, NavItem, NavLink, TabContent, TabPane, Modal, ModalHeader, ModalBody } from "reactstrap"
import SLATable from "./SLATable"
import { EllipsisIcon } from "../../../common/CustomizeTable/icons"
import EditIcon from "../../../assets/images/AWSM-Edit-Icon.svg"
import TrashIcon from "../../../assets/images/AWSM-Trash-Icon.svg"
import { ReactSVG } from "react-svg"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import AWSMButtonOption from "../../../components/Common/AWSMButtonOption"
import { updateSlaSectionNote } from "../../../store/actions"

const DeleteNoteConfirmation = ({ isOpen, onDelete, onCancel }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={onCancel}>
        Delete Confirmation
      </ModalHeader>
      <ModalBody>
        <h6>Are you sure you want to delete this Notes?</h6>
        <hr/>
        <div className="d-flex align-items-center justify-content-end">
          <button onClick={onCancel} className="btn btn-outline-danger mr-2">Cancel</button>
          <button onClick={onDelete} className="btn btn-danger">Delete</button>
        </div>
      </ModalBody>
    </Modal>
  )
}

const SLAAddNote = ({ data, onChange, onDeleteNote }) => {
  const [onEditing, setOnEditing] = useState(false)
  const [value, setValue] = useState(data.note || "");
  const [editor, setEditor] = useState(null)
  const [viewEditor, setViewEditor] = useState(null)

  const onOptionClick = option => {
    if (option.label === "Edit") {
      setOnEditing(true)
    } else if (option.label === "Delete") {
      onDeleteNote()
    }
  }
  const onUpdate = () => {
    if (onChange) {
      onChange(value)
    }
    setOnEditing(false)
  }

  const onCancel = () => {
    editor.setData(data.note || "")
    setOnEditing(false)
  }
  const onEditorChange = (event, editor) => {
    if (editor) {
      setValue(editor.getData())
    }
  }

  return (
    <div className="sla-tab-add-container">
      {!data.note && !onEditing ? (
        <div className="sla-tab-add-note" onClick={() => setOnEditing(true)}>
          <hr />
          <h4>+ ADD NOTES</h4>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between py-3 note-title">
          <h4>Notes</h4>
          <AWSMButtonOption
            optionClick={onOptionClick}
            options={[
              { icon: EditIcon, label: "Edit" },
              { icon: TrashIcon, label: "Delete" },
            ]}
          />
        </div>
      )}
      <div className={onEditing ? "add-note-content-container" : "d-none"}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [
              "heading",
              "|",
              "bold",
              "italic",
              "numberedList",
              "bulletedList",
              "|",
              "outdent",
              "indent",
              "|",
            ],
          }}
          data={data.note}
          onChange={onEditorChange}
          onReady={editor => setEditor(editor)}
        />
        <div className="d-flex justify-content-end pr-3 mt-2">
          <button className="btn btn-outline-primary mr-3" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onUpdate}>
            Update
          </button>
        </div>
      </div>
      <div className={!onEditing && data.note ? "d-block" : "d-none"}>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: [],
          }}
          disabled
          data={data.note}
          onReady={editor => setViewEditor(editor)}
        />
      </div>
    </div>
  )
}

const SectionLabelEdit = ({ defaultValue, disabled, onChange }) => {
  const MAX_CHARS = 120
  const inputRef = useRef(null)
  const [onEditing, setOnEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)

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

  const onUpdate = () => {
    if (onChange) {
      onChange(value)
    }
    setOnEditing(false)
  }

  return (
    <div className="sla-section-label-edit">
      <div className="flex-grow-1 position-relative">
        <input
          onChange={e => setValue(e.target.value)}
          className={`sla-section-input ${isError ? "error" : ""}`}
          onFocus={() => setOnEditing(true)}
          value={value}
          ref={inputRef}
          disabled={disabled || !onEditing}
        />
        {onEditing && (
          <div className={`remain-character ${isError ? "error" : "valid"}`}>
            {`${remainCharacters >= 0 ? "+" : ""}${remainCharacters}`}
          </div>
        )}
      </div>
      {!onEditing ? (
        <div className="sla-btn-edit" onClick={() => setOnEditing(true)}>
          <ReactSVG src={EditIcon} />
        </div>
      ) : (
        <div className="d-flex">
          <button
            className="btn btn-outline-primary ml-3 mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            disabled={isError}
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
      deleteNoteModal: false,
    }
    this.toggle = this.toggle.bind(this)
    this.onNoteChange = this.onNoteChange.bind(this)
    this.onDeleteNote = this.onDeleteNote.bind(this)
  }

  componentDidMount() {}

  toggle(index) {
    this.setState({
      activeTab: index,
    })
  }

  onAddSection(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  onSubtitleChange(value) {
    console.log(value)
  }

  onNoteChange(value) {
    const { updateSlaSectionNote } = this.props
    updateSlaSectionNote(value)
  }

  deleteNoteModal() {
    updateSlaSectionNote(null)
  }

  onDeleteNote() {
    this.setState({...this.state, deleteNoteModal: false})
  }

  render() {
    const { data } = this.props
    const { modalDetail } = this.state
    return (
      <Fragment>
        <Nav tabs className="nav-sla-tab col-12 mx-3">
          {data.map((item, index) => {
            return (
              <NavItem key={index}>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({
                    active: this.state.activeTab !== index,
                  })}
                  onClick={() => {
                    this.toggle(index)
                  }}
                >
                  <div className="d-flex justify-content-center">
                    <div>{item.title}</div>
                    <button>
                      <EllipsisIcon />
                    </button>
                  </div>
                </NavLink>
              </NavItem>
            )
          })}
          <NavItem>
            <NavLink
              key={data.length}
              style={{ cursor: "pointer" }}
              className="active sla-and-new-section"
              onClick={this.onAddSection}
            >
              + Add Section
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          activeTab={this.state.activeTab}
          className="p-3 text-muted col-12"
        >
          {data.map((item, index) => {
            return (
              <TabPane key={index} tabId={index}>
                <div>
                  <div>
                    <SectionLabelEdit
                      defaultValue={item.subtitle}
                      onChange={this.onSubtitleChange}
                    />
                    <SLATable items={item.items} />
                    <a className="sla-tab-add">+ Add Row</a>
                    <SLAAddNote
                      data={item}
                      onChange={this.onNoteChange}
                      onDeleteNote={() => this.setState({...this.state, deleteNoteModal: true})}
                    />
                  </div>
                </div>
              </TabPane>
            )
          })}
        </TabContent>
        <DeleteNoteConfirmation
          isOpen={this.state.deleteNoteModal}
          onDelete={this.onDeleteNote}
          onCancel={() => this.setState({...this.state, deleteNoteModal: false})}
        />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateSlaSectionNote: params => dispatch(updateSlaSectionNote(params))
})

export default connect(null, mapDispatchToProps)(SLATab)
