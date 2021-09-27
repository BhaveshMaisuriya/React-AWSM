import React, { Fragment, useCallback, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import "./style.scss"
import { useDropzone } from "react-dropzone"
import AWSMAlert from "../AWSMAlert"
import FileUploadIcon from "../../../assets/images/AWSM-Upload.svg"
import { connect } from "react-redux"

function FileUpload(props) {
  const [alert, setAlert] = useState(true);
  const [successalert, setSuccessAlert] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);  
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    setSuccessAlert(false);   
    setUploading(false);
  }, [])

  useEffect(() => {
    const { slaAttachments } = props
     if(slaAttachments !== undefined && slaAttachments !== null) {   
      setTimeout(async function () {          
        setAlertMessage(slaAttachments === false ? 'There is Something Wrong Please try again!' : (slaAttachments?.data?.statusCode) ? slaAttachments.data.message : 'PDF Uploaded Successfully');
        setAlertStatus(slaAttachments === false ? 'error' : (slaAttachments?.data?.statusCode) ? 'error' : 'success'); 
        setSuccessAlert(true);   
        setUploading(false);
      }.bind(this), 2000)  
    }
  }, [props.slaAttachments])

  const onDrop = useCallback(acceptedFiles => {
    setUploading(true);
    props.allDocuments(acceptedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: props.acceptedFormat, multiple: false })

  let allErrors = []

  const fileRejectionItems = fileRejections.map(({ file, errors }) =>
    errors.map(e => allErrors.push(e.message))
  )

  return (
    <div className={`${(isDragActive || uploading === true ) ? "file_upload_main_active" : "file_upload_main"}`}>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div className="UploadIcon">
          <ReactSVG src={FileUploadIcon} />
          {isDragActive ? <p className='drop_text'>Drop the files here ...</p> : uploading === true ? <p className='drop_text'>File Uploading ...</p> :  <p className='drop_text'>drag & drop your file here or <span>browse</span></p>}
        </div>
      </div>
      <div className="hide_div">{fileRejectionItems}</div>
      {allErrors.length !== 0 && (
        <AWSMAlert
          status="error"
          message={allErrors.join(",")}
          openAlert={alert}
          closeAlert={() => setAlert(false)}
        />
      )}
      {successalert && !uploading && alertStatus !== null && alertMessage !== null &&
        <AWSMAlert
          status={alertStatus}
          message={alertMessage}
          openAlert={successalert}
          closeAlert={() => setSuccessAlert(false)}
        />
      }
    </div>
  )
}

const mapStateToProps = ({ sla }) => ({
  slaAttachments: sla.slaAttachments,
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUpload)