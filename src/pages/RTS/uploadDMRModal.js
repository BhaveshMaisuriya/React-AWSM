import React, { Fragment, useCallback, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import "./style.scss"
import { useDropzone } from "react-dropzone"
import FileUploadIcon from "../../assets/images/AWSM-Upload.svg"
import { connect } from "react-redux"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import AWSMAlert from "components/Common/AWSMAlert"
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {
  getUploadDMR,
  setUploadDMR,
} from "../../store/actions"

function UploadDMRModal(props) {
  const [alert, setAlert] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [region, setRegion] = useState('');
  const [showProgressbar, setShowProgressbar] = useState(false); 
  const [progress, setProgress] = useState(10);
  const [progressColor, setProgressColor] = useState('primary');  
  const [uploadCsvData, setUploadCsvData] = useState({});  
  const [uploadFile, setUploadFile] = useState(null);
  
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
      const { getUploadDMR } = props
      await getUploadDMR({ uploadFile, region });
      setProgressColor('successColor');
    }
  }, [progress]);

  useEffect(async() => {
    setRegion(props.region);
  }, [props.region]);  

  useEffect(async() => {
    const { uploadDMR, uploadDMRError } = props;
    if(uploadDMR !== null || uploadDMRError !== null){
      if (uploadDMRError === null) {
        props.alertShow('success');
      } else {
        props.alertShow('error');
      }
      props.onSave();
      
      setUploadCsvData(uploadDMR);

      const { setUploadDMR } = props;
      await setUploadDMR();

      setProgressColor('primary');
      setProgress(10);
      setShowProgressbar(false);
      setUploading(false);  
      // setSuccessAlert(true);
      // setAlertMessage('Excel Uploaded Successfully!')
      // setAlertStatus('success');
    }
  }, [props.uploadDMR, props.uploadDMRError])

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

  const onDrop = useCallback(acceptedFiles => {
    setUploading(true);
    if(acceptedFiles.length === 0) {
      setUploading(false)
    } else {
      setUploadFile(acceptedFiles[0])
      setShowProgressbar(true);
    }
  }, [])
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({ onDrop, accept: [".csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "application/vnd.ms-excel.sheet.binary.macroenabled.12", ".xlsb"], multiple: false })

  let allErrors = []

  const fileRejectionItems = fileRejections.map(({ file, errors }) =>
    errors.map(e => allErrors.push(e.message))
  )

  return (
    <React.Fragment>    
      {allErrors.length !== 0 && (
        <AWSMAlert
          status="error"
          message={allErrors.join(",")}
          openAlert={alert}
          closeAlert={() => setAlert(false)}
        />
      )}
      <Modal
        centered
        isOpen={props.open}
        toggle={props.onCancel}
        id="auditLog-modal"
      >
      <ModalHeader toggle={props.onCancel}>
        <h3>Upload DMR</h3>
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
            <p><strong>{ progressColor === 'successColor' ? 'Completed!' : 'Uploading file and populating data into system ...'}</strong></p>
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
    </ModalBody>
    </Modal>
    </React.Fragment>
  )
}

const mapStateToProps = ({ sla }) => ({
  uploadDMR: sla.uploadDMR,
  uploadDMRError: sla.uploadDMRError,
})

const mapDispatchToProps = dispatch => ({
  getUploadDMR: params => dispatch(getUploadDMR(params)),
  setUploadDMR: () => dispatch(setUploadDMR()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadDMRModal)