// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Apply for a Job : Stepper 3

import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

const ExperienceStepper = ({handleNext,handleBack,mainForm}) =>{
  const classes = useStyles()
  const [inputFields, setInputFields] = useState(mainForm['inputFields']);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (index, event) => {
    const newInputFields = inputFields.map((input,i) => {
        if(i === index) {
          input[event.target.name] = event.target.value
        }
        return input;
      })
    console.log(newInputFields)
    setInputFields(newInputFields);
  }

  const handleDateChange = (date,fieldName,index) => {
      console.log(index)
    const newInputFields = inputFields.map((input,i) => {
        if(i === index) {
          input[fieldName] = date
          console.log(input)
        }
        return input;
      })
    console.log(newInputFields)
    setInputFields(newInputFields);
  };
  

  const handleAddFields = () => {
    setInputFields([...inputFields, { organization: '', position: '', start: null, end: null }])
  }

  const handleRemoveFields = (index) => {
    const values  = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  }

  const handleStepperNext = (event)=>{
    event.preventDefault()
    handleNext(inputFields)
    
}

const handleStepperBack = (event)=>{
    handleBack()
}


  return (
    <div>
        <div style = {{ "borderStyle": "groove", "padding": "14px"}}> 
        <h6>Work Experience (Include any prior TA/Marker Experience)
            <IconButton color="primary" aria-label="add experience" onClick={handleAddFields} >
                <AddCircleIcon />
            </IconButton>


        </h6>
        
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg ={6} xl={6}>
                    <div >
                        
                        <form className={classes.root} >
                            { inputFields.map((inputField,index) => (
                            
                                <div key={index} >
                                    <h6>[{index+1}]</h6>
                                    <div>
                                    <TextField id="organization" label="Organization" type="text" name= "organization" fullWidth margin="normal"
                                    onChange= {event=> handleChangeInput(index,event)} value= {inputField.organization} />
                                    </div>

                                    <div>
                                    <TextField id="position" label="Position" type="text" name= "position" fullWidth margin="normal"
                                    onChange= {event=> handleChangeInput(index,event)} value= {inputField.position} />
                                    </div>

                                    <div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker variant="outlined" name="start"
                                        openTo="year" views={["year", "month"]} format="MM/yyyy"
                                        label="Start Year and Month"
                                        value={inputField.start}
                                        onChange={value=> handleDateChange(value,'start',index)}
                                        />
                                    </MuiPickersUtilsProvider>
                                    </div>

                                    <div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker variant="outlined" name="end" 
                                        openTo="year" views={["year", "month"]} format="MM/yyyy"
                                        label="End Year and Month"
                                        value={inputField.end}
                                        onChange={value=> handleDateChange(value,'end',index)}
                                        />
                                    </MuiPickersUtilsProvider>
                                    </div>

                                    <IconButton color="secondary" hidden={inputFields.length === 1} onClick={() => handleRemoveFields(index)}>
                                    <RemoveCircleIcon /> </IconButton>

                                    <hr style = {{'borderTop': '1px solid rgb(255, 200, 0)'}} />
                                </div>
                            
                            )) }
                            
                        </form>
                    </div>

                        
                </Grid>
            </Grid>
        </div>
        <div className = 'buttonSpacing'>      
            <Button style = {{"backgroundColor":"#dc3545",color:"white"}} onClick={handleStepperBack} className={ classes.button}>
            Back</Button> 

            <Button style = {{"backgroundColor":"rgb(255, 200, 0)"}} onClick={handleStepperNext} className={classes.button}>
                Next</Button>
        </div>
    </div>

  );
}

export default ExperienceStepper;