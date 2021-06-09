import React, { useState } from 'react';
import "./style.scss";
import { DropzoneArea } from 'material-ui-dropzone'
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';

export default function FileUpload(props) {

  const [files, setFiles] = useState([]);
  const [dropZoneText, setDropZoneText] = useState('');

  const handleChange = (value) => {
    setFiles(value);
    props.allDocuments(value);
  }

  const deleteDocument = (value) => {
    setFiles(value);
    console.log("files::delete", value);
  }

  return (
    <div className="file_upload_main">
      <DropzoneArea
        onChange={(files) => handleChange(files)}
        acceptedFiles={props.acceptedFiles}
        Icon={PublishRoundedIcon}
        filesLimit={props.filesLimit}
        // dropzoneText={dropZoneText}
        onAdd={(fileObjs) => addDocument(fileObjs)}
        onDelete={(fileObj) => deleteDocument(fileObj)}
      />
    </div>
  );
}