// @Author: Rashmi Chandy 
// Feature: Job Posting Management
//Task: Add and Edit Job Posting - Component designed in a generic way to handle both tasks of adding new job and editing
import {React,useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function AddJobPopup({openAddDialog,setOpenAddDialog,getJobPosting,jobDetails,editFlag}) {
  const theme = useTheme();
  const classes = useStyles();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpenAddDialog(false);
  };

  const handleSave = () => {
    validateForm()
    console.log(formValue)
    let allFieldsPresent =true;
    for(const [key, value] of Object.entries(formValue)){
      if(!formValue[key]){
        allFieldsPresent = false
      }
    }
    if(allFieldsPresent){
      if(!editFlag){
        saveData(formValue)
      }
      else{
        updateData(formValue)
      }
    }
  };

   // Job Roles
   const [jobRoles,setJobRoles] = useState([])

  // Form fields
  const [formValue, setFormValue] = useState({
    course:jobDetails.course,
    position:jobDetails.position,
    duties:jobDetails.duties,
    hourlyRate:jobDetails.hourlyRate,
    totalHours:jobDetails.totalHours
  })

  // Track Errors
  const [errors,setErrors] = useState({})

  useEffect(()=>{
    console.log("in use effect")
    console.log(jobDetails)
    formValue['duties'] = jobDetails['duties']
    setFormValue(jobDetails)
    getPositions()
  },[jobDetails])

  const getPositions = async () => {
      await Axios.get("api/jobPosition/getPositions").then((response) => {
      let postionList = response.data["positions"]
      if(postionList && postionList.length >0){
        setJobRoles(postionList)
      }        
    });
  };

  const getRate = async (position) => {
    await Axios.get("api/jobPosition/getRate/"+position).then((response) => {
    let rate = response.data["hourlyRate"]
    if(rate ){
      setFormValue({...formValue,'hourlyRate' : rate})
    }        
    });
  };

  //add new job posting  
  const saveData = async (data) => {
    
    await  Axios.post("/api/jobPosting/addJob",JSON.stringify(data),{headers:{"Content-Type" : "application/json"}} ).then((response) => {
        console.log(response)
        setOpenAddDialog(false);
        getJobPosting()
        
    }).catch(error =>{
      setOpenAddDialog(false);
    })
  };
  //update job posting form 
  const updateData = async (data) => {
    
      await  Axios.put(`/api/jobPosting/updatePosting/${formValue.course}/${formValue.position}`,JSON.stringify(data),{headers:{"Content-Type" : "application/json"}} ).then((response) => {
      console.log(response)
      setOpenAddDialog(false);
      getJobPosting()    
  }).catch(error =>{
      setOpenAddDialog(false);
  })
};




  // Update Form input values 
  const handleChange = (event)=>{
      setFormValue({
          ...formValue,
          [event.target.name] : event.target.value
      })
      if(event.target.name =='position'){
        setFormValue({...formValue,position:event.target.value})
        formValue['position']=event.target.value
        getRate(event.target.value)
      }
  }


  // Checking Validation on input field blur
  const handleBlur = (event)=>{
    var emptyError ={};
    var regexError = {};
   
    if(event.target.name ==='duties'){
        emptyError = checkEmpty('duties',"Duties")
        setErrors({...errors,...emptyError})
    }
    if(event.target.name ==='totalHours'){
      emptyError = checkEmpty('totalHours',"Total Hours")
      setErrors({...errors,...emptyError})
    }
    if(event.target.name ==='position'){
      emptyError = checkEmpty('position',"Position")
      setErrors({...errors,...emptyError})
    }
    if(event.target.name ==='hourlyRate'){
      emptyError = checkEmpty('hourlyRate',"Hourly Rate")
      setErrors({...errors,...emptyError})
    }
   
  }

   // Validate All form fields on submit and update the error state variable
  function validateForm(){
    let errors = {};
    var emptyDuties ={};
    var emptyPosition ={};
    var emptyTotalHours ={};
    var emptyHourlyRate ={}
   
    emptyDuties = checkEmpty('duties',"Duties")
    errors ={...errors,...emptyDuties}

    emptyPosition = checkEmpty('position',"Position")
    errors ={...errors,...emptyPosition}

    emptyTotalHours = checkEmpty('totalHours',"Total Hours")
    errors ={...errors,...emptyTotalHours}

    emptyHourlyRate = checkEmpty('hourlyRate',"Hourly Rate")
    errors ={...errors,...emptyHourlyRate}

    console.log(errors)
  
    setErrors(errors);       
}


function checkEmpty(inputFieldName, inputFieldLabel){
    if(!formValue[inputFieldName]){
        return {[inputFieldName]:inputFieldLabel+' is required'}
    }
    return {[inputFieldName]:undefined} 
}

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openAddDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{editFlag?"Edit Job Posting":"Add Job Posting"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Please enter the Job positing details:</p>
            <form style ={{"width":"500px"}} >
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel id="select-label">Position</InputLabel>
                  <Select labelId="position" id="position" name="position" value={formValue.position} onChange={handleChange}>
                  {jobRoles.map((role,index)=>
                    <MenuItem value={role.position}>{role.description}</MenuItem>   
                  )}
                  </Select>
                  </FormControl>
              </div>
              <div>
                  <TextField id="hourlyRate" label="Hourly Rate (CAD)" type="text" name= "hourlyRate" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.hourlyRate} error={checkIfError('hourlyRate')}
                                    helperText={checkIfError('hourlyRate') ? errors.hourlyRate : ''} onBlur ={handleBlur} disabled={true}/>
                </div>

                <div>
                  <TextField id="duties" label="Duties" name="duties" required multiline rows={4} variant="outlined"
                  onChange= {handleChange} value= {formValue.duties} error= {checkIfError('duties')}
                  helperText={checkIfError('duties') ? "Please enter brief job description":errors.duties} onBlur ={handleBlur} fullWidth/>
                </div>
                <div>
                  <TextField id="totalHours" label="Total Hours" type="text" name= "totalHours" fullWidth margin="normal"
                                    onChange= {handleChange} value= {formValue.totalHours} error={checkIfError('totalHours')}
                                    helperText={checkIfError('totalHours') ? errors.totalHours : ''} onBlur ={handleBlur} />
                </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
              <Button  variant="danger"  onClick= {handleClose} >Close</Button> 
              <Button  variant="success" onClick= {handleSave}>Save</Button> 

        </DialogActions>
      </Dialog>
    </div>
  );

  function checkIfError(keyName){  
    if(Object.keys(errors).length>0 && errors[keyName]){
        return true;
    }
    return false;
}
}
