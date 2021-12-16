// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Stepper 4

import React from 'react'
import { useState } from 'react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import './styling/stepper.css';
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3)
    }
  }));

const SkillsStepper = ({handleNext,handleBack,mainForm}) => {
 
    const classes = useStyles();
    const [formValue, setFormValue] = useState({
        skills: mainForm.skills
    })


    const handleStepperNext = (event)=>{
        event.preventDefault()
        console.log(formValue)
       handleNext(formValue) 
    }

    const handleStepperBack = (event)=>{
        handleBack()
        
    }

    const skillsList = [
        "Java","Python","Angular","React","Database","Web Development", "DevOps","SQL"
      ];


    return (
        <div>
            <div style = {{ "borderStyle": "groove", "padding": "14px"}}> 
            <h6>Add Technical Skills / Area of Expertise</h6>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg ={6} xl={6}>
                        <div >
                            <form noValidate autoComplete="off">
                            <div className={classes.root}>
                                <Autocomplete
                                    multiple
                                    id="skills"
                                    options={skillsList}
                                    getOptionLabel={(option) => option} 
                                    onChange={(event, newValue) => {
                                        setFormValue({skills:newValue});
                                       }
                                    }  renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Skills"
                                        placeholder="Select Skill Tag"
                                    />
                                    )}
                                />
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
                style = {{"backgroundColor":"rgb(255, 200, 0)","marginLeft":"2%"}}
                onClick={handleStepperNext}
                className={classes.button}
                >Finish</Button>
            </div>
        </div>
        
    )

}

export default SkillsStepper
