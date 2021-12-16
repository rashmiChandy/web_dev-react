// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Interview Scheduled
 import {React, useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table'
import Box from '@material-ui/core/Box'
import Axios from "axios";

const InterviewScheduled = ({email}) => {
    const [interviewDetails,setInterviewDetails]= useState([])
    useEffect(()=>{
        getInterviews()
    },[])

    const filterCourses =  (courseList,courseId) => {
        let courseName = courseId;
       if(courseList && courseList.length >0){
        var output =  courseList.filter(course => {return course.courseId == courseId});
        courseName = output[0].courseName
        }     
        return courseName
    };


    // The interview and job application details are combined to display the interview details
    const getInterviews = async () => {
        Axios.get("api/hiring-management/getInterviewScheduled/"+email ).then((response) => {
        var scheduledInterviews = [] 
        let interviewDetailsList = response.data["interviewDetails"]
        let jobsAppliedList = response.data["jobApplications"]
        let courseList = response.data["courses"]
        interviewDetailsList.forEach(interview=>{
            let applicationDetails = jobsAppliedList.filter(application=>{ return application.jobPosition == interview.position && 
                    application.course == interview.course && application.email == interview.applicantEmail
            })
            let courseName = filterCourses(courseList,applicationDetails[0].course)
            scheduledInterviews.push({  applicationNo: applicationDetails[0].applicationId,
                jobDetails:courseName+ " - "+applicationDetails[0].jobPosition,
                dateTime: new Date(interview.interviewDateAndTime).toString()
            })

        })
        
        setInterviewDetails(scheduledInterviews);   
        })
    }
    
    
    return (
        <section>
            {interviewDetails.length>0 &&
            <Table striped bordered hover variant="dark" responsive="sm">
                <thead>
                    <tr>
                    <th>Application Number</th>
                    <th>Job Details</th>
                    <th>Date and Time</th>
                    </tr>
                </thead>
                <tbody>
                    {interviewDetails.map((interview,index)=>
                        <tr key={index}>
                        <td>{interview.applicationNo}</td>
                        <td>{interview.jobDetails}</td>
                        <td>{interview.dateTime}</td>
                        </tr>
                    )}
                   
                </tbody>
            </Table>
            }

            {interviewDetails.length===0 &&
                    <Box fontWeight="fontWeightMedium" m={1}>
                     No Interviews Scheduled
                    </Box>
                }
            
        </section>
    )
}

export default InterviewScheduled
