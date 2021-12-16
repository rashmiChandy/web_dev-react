// @Author: Rashmi Chandy 
// Feature: Job Posting Management
import {React,useState,useEffect} from 'react'
import JobPostingView from './JobPostingView'
import { Card } from 'react-bootstrap'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import '../myApplication/tab.css';
import JobDetailsPopup from './jobDetailsPopup'
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import Axios from "axios";
import AddJobPopup from './AddJobPopup';
import Tooltip from '@material-ui/core/Tooltip';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  addButtonStyle:{
    
    backgroundColor: '#28a745',
    color: 'white'
  }
  
}));


const filterCourses =  (courseList,courseId) => {
  let courseName = courseId;
 if(courseList && courseList.length >0){
  var output =  courseList.filter(course => {return course.courseId == courseId});
  courseName = output[0].courseName
  }     
  return courseName
};

const JobPosting =({match}) =>{
  const classes = useStyles();
  let params = match.params;
  const [openDetailsDialog,setOpenDetailsDialog] = useState(false)
  const [openAddDialog,setOpenAddDialog] = useState(false);
  const [editFlag,setEditFlag] = useState(false);
  const [duties,setDuties] = useState('')
  const [jobPostings, setJobPostings] = useState([]);
  const[jobDetails,setJobDetails] = useState({position:"",course:params.course,hourlyRate:"",totalHours:"",duties:""})
  
  useEffect(()=>{
    getJobPosting()
},[])

// Two API calls are performed in this method. First API call will fetch the list of courses the next API call will fetch the jobs postings. 
// The fetched list of courses is used to retrieve the courseName from the course Id. 
const getJobPosting = async () => {
    await Axios.get("api/course" ).then((courseApiResponse) => {
        let courseList = courseApiResponse.data["courses"];
        Axios.get("api/jobPosting/getPosting/"+params.course ).then((response) => {
        var result = [] 
        let jobPostingList = response.data["jobPostings"]
        
        if(jobPostingList && jobPostingList.length >0){
         for (let i=0; i< jobPostingList.length; i++){
             let obj ={courseName:filterCourses(courseList,jobPostingList[i].course),course:jobPostingList[i].course, position:jobPostingList[i].position,
                hourlyRate:jobPostingList[i].hourlyRate, duties:jobPostingList[i].duties,totalHours:jobPostingList[i].totalHours}
             result.push(obj)
             }
            setJobPostings(result);

         }        
     });
       
    });
   
};


  return (
    
    <div style={{ "display": "flex", "justifyContent": "center", "width": "100%" }}>
      <Card style={{
        width: '70%', height: 'auto', 'marginTop': '5%',
        'backgroundColor': 'lightgrey'
      }}>

        <Card.Body>
        <section className='tabStyle'>
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs value={0}  aria-label="tabs">
                  <Tab label={"Job Positions CSCI "+params.course} />
                </Tabs>
              </AppBar>
              <TabPanel value={0} index={0}>
                <div style={{"display":"flex","justifyContent":"flex-end", "marginBottom":"5px"}}>
                  <Button variant="contained" className={classes.addButtonStyle} onClick={() =>{ 
                    setJobDetails({...jobDetails,course: params.course})
                    setOpenAddDialog(true)
                    setEditFlag(false)
                  }}>
                    <Tooltip title="Add new Job Posting" aria-label="add"><AddIcon /></Tooltip>
                  </Button>
                </div>
                  
                  <JobPostingView courseNumber = {params.course} setOpenDetailsDialog = {setOpenDetailsDialog} 
                  setDuties={setDuties} jobPostings={jobPostings} setEditFlag={setEditFlag} setJobDetails={setJobDetails}
                  setOpenAddDialog={setOpenAddDialog} getJobPosting={getJobPosting}
                  ></JobPostingView>

                  <JobDetailsPopup openDetailsDialog={openDetailsDialog} duties={duties} setOpenDetailsDialog = {setOpenDetailsDialog} ></JobDetailsPopup>
                  
                  <AddJobPopup  openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} 
                  getJobPosting={getJobPosting} jobDetails={jobDetails} editFlag={editFlag}></AddJobPopup>
                 
              
              </TabPanel>
              
            </div>
          </section>

        </Card.Body>

      </Card>

    </div>



  );
}
export default JobPosting
