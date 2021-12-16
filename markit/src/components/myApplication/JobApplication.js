// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Track Application

import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';
import Axios from "axios";

import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    root: {
      width: '30%',
      backgroundColor: '#e7ecf3',
      
    },
   
    buttonStyle:{
        borderRadius: 3,
        border: 0,
        height: 40,
        padding: '0 10px',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    },
    cardSpacing:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
  
  });


const filterCourses =  (courseList,courseId) => {
        let courseName = courseId;
       if(courseList && courseList.length >0){
        var output =  courseList.filter(course => {return course.courseId == courseId});
        courseName = output[0].courseName
        }     
        return courseName
};


const JobApplication = ({email}) => {
    const classes = useStyles();
    const [jobsApplied, setJobsApplied] = useState([]);
    const [visibility,setVisibility]=useState({});
    const handleClick = (event) => {
        getUpdatedStatus(event.target.dataset.index)
        setVisibility({...visibility,[event.target.dataset.index]:true}) 
    };

    useEffect(()=>{
        getJobsApplied()
    },[])

    // Two API calls are performed in this method. First API call will fetch the list of courses the next API call will fetch the jobs applied. 
    // The fetched list of courses is used to retrieve the courseName from the course Id. 
    const getJobsApplied = async () => {
        await Axios.get("api/course" ).then((courseApiResponse) => {
            let courseList = courseApiResponse.data["courses"];
            Axios.get("api/jobApplication/getApplications/"+email ).then((response) => {
            var result = [] 
            let jobsAppliedList = response.data["jobApplications"]
            
            if(jobsAppliedList && jobsAppliedList.length >0){
             for (let i=0; i< jobsAppliedList.length; i++){
                 let obj ={courseName:filterCourses(courseList,jobsAppliedList[i].course), position:jobsAppliedList[i].jobPosition,
                  applicationId:jobsAppliedList[i].applicationId, status:jobsAppliedList[i].status}
                 result.push(obj)
                 }
             setJobsApplied(result);
 
             }        
         });
           
        });
       
    };

    const getUpdatedStatus = async (index) => {
     
        await Axios.get("api/jobApplication/getApplications/"+email ).then((response) => {
            let jobsAppliedList = response.data["jobApplications"]
            jobsApplied[index].status = jobsAppliedList[index].status
            setJobsApplied(jobsApplied);       
        });
       
    };

    

    return (
        <section>
            {jobsApplied.length>0 &&
            <div className= {classes.cardSpacing}>
                 {jobsApplied.map((job,index)=>
                  <Card className={classes.root} key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h6">
                            Application: {job.applicationId}
                        </Typography>
                        <Typography >
                            <Box fontWeight="fontWeightMedium" m={1}>
                                Course:
                                <Box fontWeight="fontWeightLight" >
                                {job.courseName}
                                </Box>
                             </Box>
                             <Box fontWeight="fontWeightMedium" m={1}>
                             Position:
                                <Box fontWeight="fontWeightLight" >
                                {job.position}
                                </Box>
                             </Box>
                             {visibility[index] &&
                                <Box fontWeight="fontWeightMedium" m={1}>
                                Status: 
                                    <Box>
                                        <Button  variant={getStatusColor(job.status)}>{job.status}</Button> 
                                    </Box>
                                </Box>
                            }
                        </Typography>
                        
                    </CardContent>
                
                <CardActions style={{justifyContent: 'center'}}>
                    
                    <Button    className={classes.buttonStyle} variant="dark" onClick={handleClick} data-index={index}>
                        Track Status
                    </Button>
                    
                </CardActions>
                </Card>
             )} 
            </div>}
            
                 {jobsApplied.length===0 &&
                    <Box fontWeight="fontWeightMedium" m={1}>
                     No Jobs Applied
                    </Box>
                }
                       
        </section>
    )

    function getStatusColor(status){  
        if(status === 'Under Review'){
            return "warning";
        }
        else if(status === 'Interview Scheduled'){
            return "primary"
        }
        else if(status === 'Hired'){
            return "info"
        }
        else if(status === 'Accepted'){
            return "success"
        }
        else if(status === 'Rejected'){
            return "danger"
        }
        else return "dark"
       
    }
   
}

export default JobApplication
