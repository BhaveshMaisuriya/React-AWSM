import React, { Fragment, useCallback, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import "./style.scss"
import { useDropzone } from "react-dropzone"
import FileUploadIcon from "../../../../assets/images/AWSM-Upload.svg"
import { connect } from "react-redux"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import AWSMAlert from "components/Common/AWSMAlert"
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {
  getUploadCsv,
} from "../../../../store/actions"
import { isEqual } from "lodash"

function CsvFileUpload(props) {
  const [alert, setAlert] = useState(true);
  const [successalert, setSuccessAlert] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [base64String, setBase64String] = useState({});
  const [showProgressbar, setShowProgressbar] = useState(false); 
  const [progress, setProgress] = useState(10);
  const [progressColor, setProgressColor] = useState('primary');  
  const [uploadCsvData, setUploadCsvData] = useState({});  

  useEffect(() => {
    if(showProgressbar === true){
      const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }
  }, [showProgressbar]);

  useEffect(async() => {
    if(progress === 100){
      const { getUploadCsv } = props;
      await getUploadCsv(base64String);
      setProgressColor('successColor');

      // const timer1 = setInterval(() => {
      //   setProgressColor('green');
      // }, 500);
      // return () => {
      //   clearInterval(timer1);
      // };
    }
  }, [progress]);

  useEffect(() => {
    const {uploadCsv} = props;
    // console.log("::", !isEqual(uploadCsv, uploadCsvData), uploadCsv, uploadCsvData)
    if(uploadCsv !== null && (!isEqual(uploadCsv, uploadCsvData))){
      props.toggle();
      props.getListCall();
      // setUploadCsvData(uploadCsv);
      setProgressColor('primary');
      setProgress(10);
      setShowProgressbar(false);
      setUploading(false);  
    }  
  }, [props.uploadCsv])

  const cancelUpload = () => {
    //  setProgressColor('red');
    // const timer1 = setInterval(() => {
      setUploading(false);
      setProgress(10);
      setShowProgressbar(false);
      setProgressColor('primary');
    // }, 5000);
    // return () => {
    //   clearInterval(timer1);
    // }
  }

  useEffect(() => {
    setSuccessAlert(false);   
    setUploading(false);
  }, [])

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  const onDrop = useCallback(acceptedFiles => {
    setUploading(true);
    if(acceptedFiles.length === 0) {
      setUploading(false)
    } else {
      fileToBase64(acceptedFiles[0], async(err, result) => {
        if (result) {
          const base64WithoutPrefix = result.substr('data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'.length);
          const params = {
            data: base64WithoutPrefix,
            api: props.currentPage
          }
          setBase64String(params);
          setShowProgressbar(true);
          // await onGetSLAAttchments(params)
        }
      });
    }
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: [".csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"], multiple: false })

  let allErrors = []

  const fileRejectionItems = fileRejections.map(({ file, errors }) =>
    errors.map(e => allErrors.push(e.message))
  )

  return (
    <React.Fragment>
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      id="auditLog-modal"
      contentClassName="modalContainer"
    >
      <ModalHeader toggle={props.toggle}>
        <h3>Upload CSV File</h3>
      </ModalHeader>
      <ModalBody>
        <div className={`${(isDragActive || uploading === true ) ? "csv_file_upload_main_active" : "file_upload_main"}`}>
          <div {...getRootProps()} className="dropzone">
          {(uploading === false) && <input {...getInputProps()} />}
            <div className="CsvUploadIcon">
              <ReactSVG src={FileUploadIcon} />
              {isDragActive ? <p className='drop_text'>Drop the files here ...</p> : <div> <p className='drop_text'>drag & drop your file here or <span>browse</span></p><span>By Uploading, the data will be directly populated into the system</span></div>}
            </div>
          </div>
        </div>
        {showProgressbar === true && 
          <div className={`box-border ${progressColor}`}>
            <p><strong>Uploading file and populating data into system ...</strong></p>
             <Box sx={{ display: 'flex', alignItems: 'center'}}>
             <Box sx={{ width: '100%', mr: 1 }}>
               <LinearProgress variant="determinate" value={progress} />
             </Box>
             <Box sx={{ minWidth: 35 }}>
               <Typography variant="body2" color={progress}><p className='cancel-upload' onClick={cancelUpload} >{progressColor === 'successColor' ? <CheckIcon /> : <CloseIcon />}</p></Typography>
             </Box>
           </Box>
          </div>
        }
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
    </ModalBody>
    </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = ({ retailCustomer }) => ({
  uploadCsv: retailCustomer.uploadCsv,
})

const mapDispatchToProps = dispatch => ({
  getUploadCsv: params => dispatch(getUploadCsv(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CsvFileUpload)