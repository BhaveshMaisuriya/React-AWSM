import React, { Component, useState, useEffect, Fragment } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

function ClearScheduling (props) {

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if(open === true){
      const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 10));
      }, 500);
      return () => {
        clearInterval(timer);
      };
    }
  }, [open]);

  useEffect(() => {
    if(progress === 100){
      onToggleConfirm()
      props.showConfirmAlert();
    }
  }, [progress]);

  const onClear = async() => {
    setProgress(10);
    await onToggleConfirm()
    // props.toggle();
  }

  const onToggleConfirm = () => {
    setOpen(!open);
    
  }

  const months = [
    "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
  ]

  const currentDate = () => {
    var today = new Date();
    return (today.getDate() + " "+ months[today.getMonth()+1]  + " " + today.getFullYear());
  }
  return(
    <Fragment>
      <Modal
        isOpen={props.clearScheduling}
        toggle={props.toggle}
        id="clearscheduling-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader toggle={props.toggle}>
          <h3>Clear Scheduling Confirmation</h3>
        </ModalHeader>
          <p>This action cannot be undone. Are you sure you want to clear {props.checkedValue} on {currentDate()}? All order will be drop back to Unscheduled list in Order Bank.</p>
          <ModalFooter>
          <div className="d-flex">
        <button className="btn btn-dan" onClick={props.toggle}>Cancel</button>
        <button className="btn btn-danger ml-2" onClick={onClear}>Clear</button>
      </div>
      </ModalFooter>
      </Modal>

      {/* progress */}
      <Modal
        isOpen={open}
        toggle={onToggleConfirm}
        id="clearschedulingConfirm-modal"
        contentClassName="modalContainer"
      >
        <ModalHeader>
          <h3>Clear {props.checkedValue} Scheduling</h3>
        </ModalHeader>
          
          <div className={`yellowbar`}>
          <p>Please wait until action is complete.</p>
             <Box sx={{ display: 'flex', alignItems: 'center'}}>
             <Box sx={{ width: '100%', mr: 1 }}>
               <LinearProgress variant="determinate" value={progress} />
             </Box>
           </Box>
          </div>

      </Modal>

    </Fragment>
  )
}

export default ClearScheduling;