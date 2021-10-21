import React, { useCallback, useState } from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import FileUploadIcon from "../../assets/images/AWSM-Upload.svg"
import { useDropzone } from "react-dropzone"
import { ReactSVG } from "react-svg"

function UploadDMRModal(props) {
  const { open, onCancel, onSave } = props

  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    // setUploading(true);
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, multiple: false })

  return (
    <Modal isOpen={open} className="upload-dmr">
      <ModalHeader toggle={onCancel}>Upload DMR</ModalHeader>
      <ModalBody className="position-relative scroll pl-30">
      <div className={`${(isDragActive || uploading === true ) ? "csv_file_upload_main_active" : "file_upload_main"}`}>
          <div {...getRootProps()} className="dropzone">
          {(uploading === false) && <input {...getInputProps()} />}
            <div className="CsvUploadIcon">
              <ReactSVG src={FileUploadIcon} />
              {isDragActive ? <p className='drop_text'>Drop the files here ...</p> : <div> <p className='drop_text'>drag & drop your file here or <span>browse</span></p><span>By Uploading, the data will be directly populated into the system</span></div>}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default UploadDMRModal
