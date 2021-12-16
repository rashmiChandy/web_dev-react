// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Parent Component which toggles the steppers

import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PersonIcon from "@material-ui/icons/Person";
import WorkIcon from "@material-ui/icons/Work";
import SchoolIcon from "@material-ui/icons/School";
import StepConnector from "@material-ui/core/StepConnector";
import BuildIcon from "@material-ui/icons/Build";
import './styling/stepper.css';
import PersonalDetailsStepper from "./PersonalDetailsStepper";
import EducationStepper from "./EducationStepper";
import ExperienceStepper from "./ExperienceStepper";
import SkillsStepper from './SkillsStepper';
import { useState,useEffect } from 'react';
import SubmitStepper from "./SubmitStepper";
import {Card} from 'react-bootstrap'

const ConnectorStyles = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundColor: "grey"
    }
  },
  completed: {
    "& $line": {
      backgroundColor: "grey"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const StepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    background: "rgb(255, 200, 0)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    background: "#333333",
  }
});



function StepIcon(props) {
  const classes = StepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <PersonIcon />,
    2: <SchoolIcon />,
    3: <WorkIcon />,
    4: <BuildIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  }
}));

function getSteps() {
  return ["Personal Details", "Education", "Experience", "Skills"];
}


export default function JobApplicationStepper({match}) {
  let params = match.params;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetailsStepper handleNext={handleNext} mainForm={mainForm}/>;
      case 1:
        return <EducationStepper handleNext={handleNext} handleBack={handleBack} mainForm={mainForm}/>;
      case 2:
        return<ExperienceStepper handleNext={handleNext} handleBack={handleBack} mainForm={mainForm} />;
      case 3:
        return <SkillsStepper handleNext={handleNext} handleBack={handleBack} mainForm={mainForm}/>;
      default:
        return <SubmitStepper mainForm={mainForm}></SubmitStepper>
    }
  }
   
  const [mainForm,setMainForm] = useState({
    firstName:'',
    lastName:'',
    email:sessionStorage.getItem('markit-email')?sessionStorage.getItem('markit-email') : '',
    jobPosition:params.jobPosition,
    course:params.courseName,
    degree:null,
    program:'',
    startYear:'',
    endYear:'',
    inputFields:[{ organization: '', position: '', start: null, end:null }],
    skills: []
  })

  useEffect(()=>{
    console.log(mainForm)
  },[mainForm])
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = (formValue) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    for (const key of Object.keys(formValue)) {
      setMainForm({...mainForm, [key] : formValue[key]}) 
      mainForm[key]=  formValue[key]
      console.log(mainForm)
    }    
    console.log(mainForm)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <section style= {{"display":"flex","justifyContent": "center", "width":"100%", "color":"black"}}>
      <Card style={{ width: '70%', height: 'auto', 'marginTop':'5%', "text-align": "left",'backgroundColor': 'lightgrey'}}>
      
        <Card.Body>
          <div className={classes.root} style = {{"backgroundColor":"white"}}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<ConnectorStyles />}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                
                </Step>
              ))}
            </Stepper>
          
            <div className= 'spacing'>
                    {getStepContent(activeStep)}
            </div>
          
          </div>
          
          
        </Card.Body>
    
      </Card>

    </section>
    
    
  );
}
