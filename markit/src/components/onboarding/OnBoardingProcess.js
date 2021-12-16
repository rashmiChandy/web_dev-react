import React, { Component, useState } from 'react'
import { makeStyles, withStyles } from "@material-ui/core/styles"
import { Stepper, Step, StepLabel } from "@material-ui/core"
import SIN from './SIN';
import Bank from './Bank';
import Payroll from './Payroll';
import EmployeeInformation from './EmployeeInformation'
import Acknowledgement from './Acknowledgement';
import './style-css/StepStyles.css';
import { Modal, Button } from "react-bootstrap";



const OnBoadingProcess = () => {


  const setStyles = makeStyles({
    onboard: {
      width: "50%",
      margin: "6rem auto",
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: "rgb(255,200,0)"
      },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: "black"
      }
    }
  })

  const [currentStep, setCurrentStep] = useState(0);

  const [currentModal, setCurrentModal] = useState(1);

  const [modalAck, setModalAck] = useState(false);

  const fnValidateCheck = (event) => {

    setModalAck(event.target.checked)
  }

  const nextFunction = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep + 1)
  }

  const backFunction = () => {
    setCurrentStep(prevCurrentStep => prevCurrentStep - 1)
  };

  const nextModal = () => {
    setCurrentModal(nextModalStep => nextModalStep + 1)
  }

  const previousModal = () => {
    setCurrentModal(prevModalStep => prevModalStep - 1)
  };

  const steps = ["Employee Information", "Social Insurance Number", "Banking Information", "Payroll Setup", "Acknowledgment"];


  const [mainValues, setMainValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    country: 'Canada',
    province: '',

    sinNumber: '',


  })


  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getSteps(index) {
    switch (index) {
      case 0:
        return <EmployeeInformation
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
        />
      case 1:
        return <SIN
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
        />
      case 2:
        return <Bank
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
        />
      case 3:
        return <Payroll
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          steps={steps}
          mainValues={mainValues}
        />
      case 4:
        return <Acknowledgement
          nextFunction={nextFunction}
          backFunction={backFunction}
          currentStep={currentStep}
          mainValues={mainValues}
          steps={steps} />
      default:
        return "Invalid"
    }


  }

  const ModalDiv1 = () => (
    <div id="results" className="search-results" style={{ "color": "black" }}>
      <h6><u>GENERAL INSTRUCTIONS</u></h6>

      <label><b>Section A - Student status</b></label>
      <p> No Teaching Assistant who is registered as a full-time student shall be required to work more than one hundred thirty (130) hours per semester”.  (excerpted from the &nbsp;
        <a href="https://3912.cupe.ca/documents/collective-agreements/">CUPE Collective Agreement </a>
        Clause 17.1(a), page 14.)
        Full-time status is usually defined as a person taking 3 or more courses in one term or on internship, co-op, or work term, or when registered for a thesis term.  If you are a full-time student and have agreed to work more than 130 TA hours or if have offers totalling more than 130 TA hours, then please contact &nbsp;
        <a href="mailto:markit@dal.ca?subject = Feedback&body = Message">markit@dal.ca</a>
      </p>

      <label><b>Section B - Study/ Work permit</b></label>
      <p>Your study/work Permit must be current at all times. If you are a student and have questions about extending your study Permit,
        please refer to Dalhousie University’s &nbsp;
        <a href="https://www.dal.ca/campus_life/international-centre/immigration-info/studying-in-canada/studypermitrenewal.html">International Centre instructions.</a>
      </p>
      <p>
        <u></u>Note:  All employees working in Canada who are not Canadian Citizens or Permanent Residents of Canada are required to have a current work/study Permit on file in order to be able to work and to get paid.
      </p>
    </div>
  )

  const ModalDiv2 = () => (
    <div id="results" className="search-results" style={{ "color": "black" }}>
      <h6><u>EMPLOYEE IDENTIFICATION</u></h6>

      <label><b>Section A - Personal Details</b></label>
      <p> All Teaching Assistants should provide a valid personal information for background verification processes. In case of any mistakes or change of residence/ phone number/ mailing address
        send an email immediately to  <a href="mailto:markit@dal.ca?subject = Feedback&body = Message">markit@dal.ca</a>
      </p>

      <label><b>Section B - SIN Number</b></label>
      <p>All the Teaching Assistants must provide a Social Insurance Number (SIN) provided by the Government of Canada. SIN number is  highly confidential
        and the assistants are advised not to share the information through email or telephone. SIN number must be entered through the web portal
        and  incase of any change in the SIN number an official re-application should be made and an email must be sent to &nbsp;
        <a href="mailto:markit@dal.ca?subject = Feedback&body = Message">markit@dal.ca</a>&nbsp;
        stating the reason for validation purposes.

      </p>

    </div>
  )

  const ModalDiv3 = () => (
    <div id="results" className="search-results" style={{ "color": "black" }}>

      <h6><u>BANKING INFORMATION</u></h6>

      <label><b>Section A - Banking Details</b></label>
      <p> All Teaching Assistants should provide a valid banking information for background verification processes. In case of any mistakes or change of bank/ phone number/ mailing address
        send an email immediately to  <a href="mailto:markit@dal.ca?subject = Feedback&body = Message">markit@dal.ca</a>
      </p>

      <label><b>Section B - Required Documents</b></label>
      <p> As a general rule, employees residing in Canada are required to provide banking information. The following documents are required by the payroll department to process
        the salary.
        <li>Direct Deposit Form</li>
        <li>Void cheque</li>
        <li>Passport size photo</li>
      </p>

    </div>
  )

  const ModalDiv4 = () => (
    <div id="results" className="search-results" style={{ "color": "black" }}>
      <h6><u>PAY PROCESSES</u></h6>

      <label><b>Section A - Marker Pay</b></label>
      <p>Markers must report the number of hours worked every two weeks in order to be paid.
        Approximately two weeks after completing the onboarding process, you will have access to the online system called “Casual Web Time Entry”.  A blue Enter Time button will appear in your DalOnline and at that time,
        you will be able to begin submitting your time for pay, following instructions in the Employee Time Entry Reference Guide which will be sent to your dal email. If you have any questions,
        email &nbsp;
        <a href="mailto:markit@dal.ca?subject = Feedback&body = Message">markit@dal.ca</a>
      </p>

      <label><b>Section B - Teaching Assistant Pay</b></label>
      <p> TAs are hired in fixed hours-per-term packages set by the &nbsp;
        <a href="https://3912.cupe.ca/documents/collective-agreements/">CUPE  </a>

        collective agreement (on page 23).  The TA contract is paid out in equal payments, divided among the bi-weekly paydays set for the term, and begin depending on when DalPayroll has all of the information.

      </p>

      <label>Example:</label>
      <p>
        TA contracts received and processed and approved on Jan.3 will be paid over the 7 pay periods of the Winter 2021 term, with the first payday being Jan.29 and the last being Apr.23.
        TA contracts received and processed and approved on Jan.5 will miss the deadline for the first bi-weekly payday and therefore will be paid over the 6 pay periods remaining in the Winter 2021 term, with the first payday being Feb.12 and the last being Apr.23.
      </p>
    </div>
  )

  const classes = setStyles();
  return (
    <section style={{ "display": "flex", "justifyContent": "center", "width": "100%" }}>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" style={{ "color": "black" }}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header style={{ "background-color": "rgb(255,200,0)", "color": "black" }}>
          <Modal.Title>Onboarding Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>



          {currentModal === 1 ? <ModalDiv1 /> : null}

          {currentModal === 2 ? <ModalDiv2 /> : null}

          {currentModal === 3 ? <ModalDiv3 /> : null}

          {currentModal === 4 ? <ModalDiv4 /> : null}

          {currentModal === 4 ?

            <p><input type="checkbox" onClick={fnValidateCheck}></input> &nbsp;
              I have read and understood all the instructions related to onboarding process <font color="red">*</font>
            </p>

            : null
          }

        </Modal.Body>
        <Modal.Footer>

          {/* <input type="button"  class="btn"  onClick={previousModal} style={{"background-color":"rgb(255,200,0)" ,"color":"black"  }} value="Go Back"  />
        <input type="button"  class="btn"  onClick={previousModal} style={{"background-color":"black" ,"color":"rgb(255,200,0)"  }} value="Go Next"  />
        <input type="button"  class="btn"  onClick={previousModal} style={{"background-color":"black" ,"color":"rgb(255,200,0)"  }} value="Proceed to OnBoarding"  /> */}

          {currentModal === 1 ? null :





            <input type="button" class="btn" onClick={previousModal} style={{ "background-color": "rgb(255,200,0)", "color": "black" }} value="Go Back" />

          }

          {currentModal === 4 ? <input type="button" class="btn" onClick={handleClose}
            disabled={(!modalAck)}
            style={{ "background-color": "black", "color": "rgb(255,200,0)" }} value="Proceed to OnBoarding" />
            :
            <input type="button" class="btn" onClick={nextModal} style={{ "background-color": "black", "color": "rgb(255,200,0)" }} value="Go Next" />

          }





        </Modal.Footer>
      </Modal>

      <div className={classes.onboard} style={{ "backgroundColor": "white" }}>

        <h2 class="stepheader" >
          <br />
          ONBOARDING PROCESS
          <br /> <br />
        </h2><br />

        <Stepper alternativeLabel activeStep={currentStep} >
          {steps.map((label, index) => (
            <Step key={label}   >
              <StepLabel >
                {label}

              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {currentStep === steps.length ?
          <div class="container">
            <br /><br />
            <div class="alert alert-custom" role="alert" style={{ width: '100%' }}>
              <h4 class="alert-heading">Onboarding completed!!!</h4>
              <p>All the information provided will be validated by the FCS coordinator and the payroll details will be verified by the payroll department. If all the details provided are valid, the employement portal will be updated in two weeks.</p>

              <p class="mb-0">Incase of any queries, please send an email to markit@dal.ca</p>
              
            </div>
            <br></br>
              
          </div>
          : (
            <>
              {getSteps(currentStep)}

            </>
          )}
      </div></section>
  );
}

export default OnBoadingProcess;