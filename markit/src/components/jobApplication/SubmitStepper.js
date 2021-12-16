// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Confirmation Screen

import React from 'react'
import { useState,useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './styling/stepper.css';
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import './styling/stepper.css';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    button: {
      marginBottom: theme.spacing(1)
    }
  }));

const SubmitStepper = ({mainForm}) => {
    const classes = useStyles();
    const [formValue, setFormValue] = useState(
        {
            firstName:mainForm.firstName,
            lastName:mainForm.lastName,
            email:mainForm.email,
            jobPosition:mainForm.jobPosition,
            course:mainForm.course,
            degree:mainForm.degree,
            program:mainForm.program,
            startYear:mainForm.startYear,
            endYear:mainForm.endYear,
            inputFields:mainForm.inputFields,
            skills: mainForm.skills
          })
    const [result,setResult] = useState({message:'',applicationId:''})
    const [status,setStatus] = useState(true)
 
    useEffect(() => {

       submitData(formValue)
    }, [formValue])

    const submitData = async (data) => {
    
        await  Axios.post("/api/jobApplication/addApplication",JSON.stringify(data),{headers:{"Content-Type" : "application/json"}} ).then((response) => {
            console.log(response)
            console.log("In function")
            for (const key of Object.keys(response.data)) {
                setResult({...result, [key] : response.data[key]}) 
                result[key]=  response.data[key]
              }    
            setStatus(false)
            const url = '/#/myApplication?email='+formValue['email'];
            window.open(url, '_blank');
        }).catch(error =>{
            setStatus(false)
        })
    };

    
    return (

        <div style = {{"display":"flex", "justifyContent":"center", "color":"black"}}>
            <div className={classes.button} style = {{  "padding": "14px" }}> 
            <Grid container spacing={2}>
                <Grid item >
                {status &&
                        <Spinner animation="border" variant="warning" role="status" /> }
                    <div >
                        <h2>{result.message}</h2>
                        {result['applicationId'] &&<h4 style = {{"color":"rgb(255, 200, 0)","textAlign":"center"}}>Applicant ID : {result['applicationId']}</h4>}
                        
                    </div>

                </Grid>
            </Grid>
            </div>
            <div className = 'buttonSpacing'>       
            </div>
        </div>
        
      
        
    )

}

export default SubmitStepper
