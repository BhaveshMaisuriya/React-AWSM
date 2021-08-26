import React, { Fragment, useCallback, useState } from "react"
import { ReactSVG } from "react-svg"
import "./style.scss"
import { useDropzone } from "react-dropzone"
import AWSMAlert from "../AWSMAlert"
import FileUploadIcon from "../../../assets/images/AWSM-Upload.svg"
export default function FileUpload(props) {
  const [alert, setAlert] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    props.allDocuments(acceptedFiles)
  }, [])
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: props.acceptedFormat })

  let allErrors = []

  const fileRejectionItems = fileRejections.map(({ file, errors }) =>
    errors.map(e => allErrors.push(e.message))
  )

  return (
    <div className="file_upload_main">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <div className="UploadIcon">
          <ReactSVG src={FileUploadIcon} />
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
    </div>
  )
}