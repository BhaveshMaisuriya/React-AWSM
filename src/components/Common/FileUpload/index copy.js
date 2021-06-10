import React, { Fragment } from "react"
import "./style.scss"
import Dropzone from "react-dropzone"
import PublishRoundedIcon from "@material-ui/icons/PublishRounded"
import AWSMAlert from "../AWSMAlert"

export default function FileUpload(props) {
  function OnDropCall(allData) {
    props.allDocuments(allData)
  }

  return (
    <div className="file_upload_main">
      <Dropzone
        onDrop={files => OnDropCall(files)}
        accept={props.acceptedFormat}
      >
        {({ getRootProps, getInputProps, isDragReject }) => (
          <div
            {...getRootProps({
              className: "dropzone",
              onDrop: event => event.stopPropagation(),
            })}
          >
            {isDragReject && (
              <Fragment>
                {console.log("here::")}
                <AWSMAlert
                  status="error"
                  message="File type not accepted, sorry!"
                  openAlert={true}
                />
              </Fragment>
            )}
            <input {...getInputProps()} />
            <div className="UploadIcon">
              <PublishRoundedIcon />
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  )
}
