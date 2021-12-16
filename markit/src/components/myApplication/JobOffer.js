// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: View, Accept/Reject the job offer

import {React,useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const JobOffer = ({email}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [disableField, setDisableField] = useState(false);
    const [jobOffer, setJobOffer] = useState([])

    const [formValue, setFormValue] = useState({
      comments: ''
     })

    //  Form Validation
    const [errors,setErrors] = useState({comments:''})
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = (event)=>{
      console.log(event)
      event.preventDefault()
      validateForm(event)
  
    }

     // Update Form input values 
     const handleInputChange = (event)=>{
      setFormValue({
          ...formValue,
          [event.target.name] : event.target.value
      })
  }

  useEffect(()=>{
    getJobOffers()
},[])

const filterCourses =  (courseList,courseId) => {
    let courseName = courseId;
   if(courseList && courseList.length >0){
    var output =  courseList.filter(course => {return course.courseId == courseId});
    courseName = output[0].courseName
    }     
    return courseName
};

// Job Offer details are retrieved by combining information about the Job posting and Job Offer details
const getJobOffers = async () => {
  var jobOffers = [] 
  axios.get("api/hiring-management/jobOffers/"+email ).then((response) => {
    
    let jobsList = response.data["jobs"]
    let jobOffersList = response.data["jobOffers"]
    let courseList = response.data["courses"]
    jobOffersList.forEach(jobOffer=>{
        let jobDetails = jobsList.filter(job=>{ return job.position == jobOffer.jobPosition && 
          job.course == jobOffer.course })
        let courseName = filterCourses(courseList,jobDetails[0].course)
        jobOffers.push(
          {role:jobDetails[0].position && jobDetails[0].position.includes("TA")? "Teaching Assistant ("+jobDetails[0].position+")" : jobDetails[0].position,
          position:jobDetails[0].position,
          course: courseName,
          courseCode:jobDetails[0].course,
          jobDetails:jobDetails[0].duties,
          wagePerHour:jobDetails[0].hourlyRate, totalHours:jobDetails[0].totalHours})

    })
    
    setJobOffer(jobOffers);   
    })
}

async function saveToDatabase(index,status) {
  await axios.put("api/hiring-management/update-job-offer-status",
      {
          'course': jobOffer[index].courseCode,
          'email': email,
          'position': jobOffer[index].position,
          'status':status,
          'comments':formValue.comments
      })
      .then((response) => {
          if (response.status === 200) {                
            axios.put("api/hiring-management/update-job-application-status",
                      {
                          'email': email,
                          'course': jobOffer[index].courseCode,
                          'jobPosition': jobOffer[index].position,
                          'status': status
                      })
                      .then((response) => {
                          if (response.status === 200) {
                              setDisableField(true)
                          }
                      }).catch((error) => {
                        setDisableField(false)
                      });
              
          }
      })
}

    return (
        <section>
             <div className={classes.root}>
                {jobOffer.map((offer,index)=>
                      <Accordion expanded={expanded === 'panel'+index+1} onChange={handleChange('panel'+index+1)}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panelbh-content"+index+1}
                        id={"panelbh-header"+index+1}
                        >
                        <Typography className={classes.heading}>{offer.role}</Typography>
                        <Typography className={classes.secondaryHeading}>{offer.course}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Total Hours:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.totalHours}
                                </Box>
                            </Box>
                          </Typography>

                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Hourly Rate:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.wagePerHour}
                                </Box>
                            </Box>
                          </Typography>

                          <Typography>
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Duties:
                                <Box fontWeight="fontWeightLight" >
                                    {offer.jobDetails}
                                </Box>
                            </Box>
                          </Typography>
                          <section style ={{'margin-left':'10px'}}>
                            <form  >
                            <div>
                                <TextField id="comments" label="Comments" name="comments" required onChange= {handleInputChange} value= {formValue.comments} error= {errors.comments=== ''?false:true}
                                helperText={errors.comments=== ''?"Please enter offer confirmation message or reason for declining the offer":errors.comments} fullWidth
                                disabled={disableField}/>
                              </div> 
                              <div>
                                <Button  variant="danger" style = {{'margin-right':'5%', 'margin-top':'20px'}} onClick= {handleSubmit} data-index={index} disabled={disableField}>Decline</Button> 
                                <Button  variant="success" style = {{'margin-right':'5%', 'margin-top':'20px'}} onClick= {handleSubmit} data-index={index} disabled ={disableField}>Accept</Button> 
                              </div>
                            </form>
                          </section>
                        
                        </AccordionDetails>
                  </Accordion>
                         
                 )}
                 {jobOffer.length===0 &&
                    <Box fontWeight="fontWeightMedium" m={1}>
                     No Job Offers at this moment
                    </Box>
                }
            </div>
        </section>
    )
    
    // Validate All form fields on submit and update the error state variable
    function validateForm(event){
      
      let error = {};

      if (!formValue.comments.trim()) {
        error.comments = 'Please enter comments';
      }
      else {
        error.comments =''
        saveToDatabase(event.target.dataset.index,event.target.outerText =="Accept"?"Accepted":"Rejected")
      }

      setErrors(error);       

  }
}

export default JobOffer
