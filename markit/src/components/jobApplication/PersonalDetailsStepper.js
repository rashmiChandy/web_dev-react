// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Stepper 1

import React from 'react'
import { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import './styling/stepper.css';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    button: {
      marginRight: theme.spacing(1)
    }
  }));

const PersonalDetailsStepper = ({handleNext,mainForm}) => {
    const classes = useStyles();
    const [formValue, setFormValue] = useState({
        firstName:mainForm.firstName,
        lastName:mainForm.lastName,
        email:mainForm.email,
        jobPosition:mainForm.jobPosition,
        course:mainForm.course
    })

    // Track Errors
    const [errors,setErrors] = useState({})

    const [nextClicked,setNextClicked] = useState(false)

    // Update Form input values 
    const handleChange = (event)=>{
        setFormValue({
            ...formValue,
            [event.target.name] : event.target.value
        })
    }

    const handleStepperNext = (event)=>{
        setNextClicked(true)
        event.preventDefault()
        validateForm()
        
    }


    // Checking Validation on input field blur
    const handleBlur = (event)=>{
        setNextClicked(false)
        if(event.target.name ==='firstName'){
            validateFirstName()
        }
        if(event.target.name ==='lastName'){
            validateLastName()
        }
        if(event.target.name ==='email'){
            validateEmail()
        }
    }

    // Track errors 
    useEffect(() => {
        let errorCopy = {...errors}
        for (const [key] of Object.entries(errorCopy)) {
            if(errorCopy[key]=== undefined){ 
                delete errorCopy[key];   
            }
          }
          console.log(errorCopy)
       if((Object.keys(errors).length === 0 && nextClicked) || (Object.keys(errorCopy).length ===0 && nextClicked)){
            handleNext(formValue);
       }
       
    }, [errors])

    // Validate All form fields on submit and update the error state variable
    function validateForm(){
        let errors = {};

        if (!formValue.firstName.trim()) {
            errors.firstName = 'First Name is required';
        }
  
        if (!formValue.lastName.trim()) {
            errors.lastName = 'Last Name is required';
        }
        
        if (!formValue.email) {
            errors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(formValue.email)) {
            errors.email = 'Email address is invalid';
        }
        setErrors(errors);       
    }

// Validate First name invoked on blur
    function validateFirstName(){
        if (!formValue.firstName || !formValue.firstName.trim()) {
            console.log("here in fname")
            setErrors({...errors,firstName:'First Name is required'})
          }
        else setErrors({...errors,firstName:undefined});
        console.log(errors)
    }

// Validate Last name invoked on blur
    function validateLastName(){
        if (!formValue.lastName || !formValue.lastName.trim()) {
            console.log("here in lname")
            setErrors({...errors,lastName:'Last Name is required'})
        }
        else  setErrors({...errors,lastName:undefined}); 
        console.log(errors)
    }

    // Validate Email invoked on blur
    function validateEmail(){
        if (!formValue.email) {
            setErrors({...errors,email:'Email is required'})
        } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(formValue.email)) {
            setErrors({...errors,email:'Email address is invalid'})
        }
          
        else setErrors({...errors,email:undefined}); 
     
    }


    return (
        <div>
            <div style = {{ "borderStyle": "groove", "padding": "14px"}}> 
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg ={6} xl={6}>
                        <div >
                            <form noValidate autoComplete="off">
                                <div>
                                    <TextField id="firstName" label="First Name" name="firstName" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.firstName} error={checkIfError('firstName')}
                                    helperText={checkIfError('firstName') ? errors.firstName : ''} onBlur ={handleBlur}  />
                                </div>
                                <div>
                                    <TextField id="lastName" label="Last Name" type="text" name= "lastName" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.lastName} error={checkIfError('lastName')}
                                    helperText={checkIfError('lastName') ? errors.lastName : ''} onBlur ={handleBlur} />
                                </div>
                                <div>
                                    <TextField id="email" label="Email ID" type="text" name= "email" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.email}  error={checkIfError('email')}
                                    helperText={checkIfError('email') ? errors.email : ''} onBlur ={handleBlur} 
                                    disabled={mainForm.email?true:false} />
                                </div>
                                {/* Prefilled field based on course selected in the Jost Posting Page */}
                                <div>
                                    <TextField id="course" label="Course" type="text" name= "course" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.course} inputProps={{ readOnly: true, disabled: true  }} />
                                </div>
                                {/* Prefilled field based on Job selected in the Jost Posting Page */}
                                <div>
                                    <TextField id="jobPosition" label="Position" type="text" name= "jobPosition" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.jobPosition}  inputProps={{ readOnly: true, disabled: true  }} />
                                </div>
                                
                            </form>
                        </div>

                    
                    </Grid>
                </Grid>
            </div>
            <div className = 'buttonSpacing'>       
                    
                <Button
                style = {{"backgroundColor":"rgb(255, 200, 0)"}}
                onClick={handleStepperNext}
                className={classes.button}
                >Next</Button>
            </div>
        </div>
        
    )

    function checkIfError(keyName){  
        if(Object.keys(errors).length>0 && errors[keyName]){
            return true;
        }
        return false;
    }

}

export default PersonalDetailsStepper
