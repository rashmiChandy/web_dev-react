// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Stepper 2

import React from 'react'
import { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import './styling/stepper.css';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%"
    },
    button: {
      marginRight: theme.spacing(1)
    }
  }));

const EducationStepper = ({handleNext,handleBack,mainForm}) => {
    const degreeList = ["Bachelors","Masters","Post Graduate"];

    const defaultProps = {
        options: degreeList,
        getOptionLabel: (option) => option,
      };
    
    const classes = useStyles();
    const [formValue, setFormValue] = useState({
        degree:'',
        program:mainForm.program,
        startYear:mainForm.startYear,
        endYear:mainForm.endYear
    })

    const [degreeValue, setDegreeValue] = useState(mainForm.degree);

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

    const handleStepperBack = (event)=>{
        setNextClicked(false)
        handleBack()
        
    }


    // Checking Validation on input field blur
    const handleBlur = (event)=>{
        var emptyError ={};
        var regexError = {};
        setNextClicked(false)
        if(event.target.name ==='program'){
            emptyError = checkEmpty('program',"Program")
            setErrors({...errors,...emptyError})
        }
        if(event.target.name ==='startYear' || event.target.name ==='endYear'){
            emptyError = checkEmpty(event.target.name,event.target.name ==='endYear'?"End Year":"Start Year")
            setErrors({...errors,...emptyError})
            if (emptyError[event.target.name] === undefined){
                regexError = checkRegex(event.target.name,event.target.name ==='endYear'?"End Year":"Start Year"
                ,/^[0-9]{4}$/)
                setErrors({...errors,...regexError})
            }
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
       if((Object.keys(errors).length === 0 && nextClicked) || (Object.keys(errorCopy).length ===0 && nextClicked)){
           
            handleNext(formValue);
       }
       
    }, [errors])

    // Validate All form fields on submit and update the error state variable
    function validateForm(){
        let errors = {};
        var emptyError ={};
        var regexError ={};
       
        setFormValue({...formValue,degree:degreeValue})
        emptyError = checkDropdown(degreeValue)
        errors ={...errors,...emptyError}
  
        emptyError = checkEmpty('program',"Program")
        errors ={...errors,...emptyError}

        const yearFields = ['endYear','startYear']
        for(let i=0; i<yearFields.length; i++){
            emptyError = checkEmpty(yearFields[i],yearFields[i] ==='endYear'?"End Year":"Start Year")
            errors ={...errors,...emptyError}
            if (!emptyError[yearFields[i]] ){
                regexError = checkRegex(yearFields[i],yearFields[i] ==='endYear'?"End Year":"Start Year"
                ,/^[0-9]{4}$/)
                errors ={...errors,...regexError}

            }
        }
        console.log(errors)
      
        setErrors(errors);       
    }


    function checkEmpty(inputFieldName, inputFieldLabel){
        if(!formValue[inputFieldName]){
            return {[inputFieldName]:inputFieldLabel+' is required'}
        }
        return {[inputFieldName]:undefined} 
    }

    function checkRegex(inputFieldName,inputFieldLabel, regex){
        if (!regex.test(formValue[inputFieldName])) {
            return {[inputFieldName]:inputFieldLabel+' is invalid'}
        }  
        return {[inputFieldName]:undefined}  
    }

    function checkDropdown(newValue){
        if(!newValue){
            return {degree:'Degree is required'}
        }
        return {degree:undefined} 
    }
    




    return (
        <div>
            <div style = {{ "borderStyle": "groove", "padding": "14px"}}> 
            <h6>Latest Educational Qualification</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg ={6} xl={6}>
                        <div >
                            <form noValidate autoComplete="off">
                                <div>
                                <Autocomplete id="degree" name="degree" {...defaultProps}
                                     style={{ width: "100%" }} value={degreeValue}  onChange={(event, newValue) => {
                                        setDegreeValue(newValue);
                                        let emptyError = checkDropdown(newValue)
                                        setErrors({...errors,...emptyError});  
  
                                    }}
                                     renderInput={(params) => (<TextField {...params} label="Degree" variant="outlined" error={checkIfError('degree')}
                                     helperText={checkIfError('degree') ? errors.degree : ''} /> )} />
                                </div>
                                <div>
                                    <TextField id="program" label="Program" type="text" name= "program" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.program} error={checkIfError('program')}
                                    helperText={checkIfError('program') ? errors.program : ''} onBlur ={handleBlur} />
                                </div>
                                <div>
                                    <TextField id="startYear" label="Start Year" type="text" name= "startYear" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.startYear}  error={checkIfError('startYear')}
                                    helperText={checkIfError('startYear') ? errors.startYear : ''} onBlur ={handleBlur} />
                                </div>
                                
                                <div>
                                    <TextField id="endYear" label="End Year" type="text" name= "endYear" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.endYear} error={checkIfError('endYear')}
                                    helperText={checkIfError('endYear') ? errors.endYear : ''} onBlur ={handleBlur}   />
                                </div>
                                
                            </form>
                        </div>

                    
                    </Grid>
                </Grid>
            </div>
            <div className = 'buttonSpacing'>      
                <Button
                style = {{"backgroundColor":"#dc3545",color:"white"}}
                onClick={handleStepperBack}
                className={ classes.button}
                >
                Back
                </Button> 
                    
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

export default EducationStepper
