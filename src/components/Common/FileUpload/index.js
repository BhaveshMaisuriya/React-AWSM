import React, { Fragment, useCallback, useState } from "react"
import "./style.scss"
import { useDropzone } from "react-dropzone"
import PublishRoundedIcon from "@material-ui/icons/PublishRounded"
import AWSMAlert from "../AWSMAlert"

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
          <PublishRoundedIcon />
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