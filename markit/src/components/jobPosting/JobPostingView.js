// @Author: Rashmi Chandy 
// Feature: Job Posting Management
//Task: View and Delete Job Posting

import {React, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import LaunchIcon from '@material-ui/icons/Launch';
import Box from '@material-ui/core/Box'
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Axios from "axios";

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
    },
    textEllipsis:{
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    viewMoreButtonStyle:{
        backgroundColor: 'rgb(255, 200, 0)',
        color: 'black'
    }
  
  });


const JobPostingView = ({courseNumber,setOpenDetailsDialog,setDuties,jobPostings,setEditFlag,setJobDetails,setOpenAddDialog,getJobPosting}) => {
    
    const history = useHistory();
    const classes = useStyles();
    const [jobPosting, setJobPosting] = useState(jobPostings);

    const handleClick = (event)=>{
        let jobPostion = jobPosting[event.target.dataset.index].position
        history.push('/jobApplication/'+courseNumber+'/'+jobPostion);
    
    }

    const openDialog = (duties)=>{
        console.log(duties)
        setOpenDetailsDialog(true)
        setDuties(duties)
    }

    const handleEditClick = (index)=>{
      console.log(index)
      console.log(jobPosting[index])
        setJobDetails(jobPosting[index])
        setEditFlag(true)
        setOpenAddDialog(true)
    }

    const handleDeleteClick = (index)=>{
        deletePosting(jobPosting[index])
    }

     //update job posting form 
    const deletePosting = async (data) => {
        await  Axios.delete(`/api/jobPosting/deletePosting/${data.course}/${data.position}` ).then((response) => {
        
            getJobPosting()    
        }).catch(error =>{
            getJobPosting(false);
        })
    };

    useEffect(()=>{
        setJobPosting(jobPostings)
    },[jobPostings])

    return (
    <section>
        {jobPosting.length>0 &&
                        <div className= {classes.cardSpacing}>
                            {jobPosting.map((job,index)=>
                            <Card className={classes.root} key={index}>
                            
                                <CardContent>
                                    <div style ={{'display':'flex', 'justifyContent':'flex-end','height':'10px'}}>
                                        
                                        <IconButton   onClick={()=>handleEditClick(index)} >
                                            <EditIcon/>
                                        </IconButton>

                                        
                                        <IconButton  onClick={()=>handleDeleteClick(index)} >
                                            <RemoveCircleOutlineIcon/>
                                        </IconButton>
                                    </div>
                                <Typography>
                                        <Box fontWeight="fontWeightMedium" m={1}>
                                            Position:
                                            <Box fontWeight="fontWeightLight" >
                                                {job.position && job.position.includes('TA')?'Teaching Assistant ('+job.position+ ')':job.position}
                                            </Box>
                                        </Box>
                                    </Typography>
                                    <Typography>
                                        <Box fontWeight="fontWeightMedium" m={1}>
                                            Total Hours:
                                            <Box fontWeight="fontWeightLight" >
                                                {job.totalHours}
                                            </Box>
                                        </Box>
                                    </Typography>

                                    <Typography>
                                    <Box fontWeight="fontWeightMedium" m={1}>
                                        Hourly Rate:
                                        <Box fontWeight="fontWeightLight" >
                                            {job.hourlyRate}
                                        </Box>
                                    </Box>
                                    </Typography>

                                    <Button variant="contained" className={classes.viewMoreButtonStyle}  onClick={() => openDialog(job.duties)}>
                                                View detailed job description <LaunchIcon />
                                    </Button>
                                    
                                </CardContent>
                            
                            <CardActions style={{justifyContent: 'center'}}>
                                
                                <Button    className={classes.buttonStyle} variant="dark" onClick={handleClick} data-index={index}>
                                    Apply
                                </Button>
                                
                            </CardActions>
                            </Card>
                        )} 
                        </div>
        }
                        
        {jobPosting.length===0 &&
            <Box fontWeight="fontWeightMedium" m={1}>
            No Job Posting available for this course 
            </Box>
        }
        
    </section>)


   
}

export default JobPostingView
