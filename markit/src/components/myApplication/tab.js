// @Author: Rashmi Chandy 
// Feature: Application Management
//Task: Track Application, View Scheduled Interviews, View, Accept/Reject the job offer

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './tab.css';
import JobApplication from './JobApplication'
import InterviewScheduled from './InterviewScheduled'
import JobOffer from './JobOffer'
import { Card } from 'react-bootstrap'

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
}));

export default function ApplicationTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
                  <Tab label="Job Application" />
                  <Tab label="Scheduled Interview" />
                  <Tab label="Job Offer" />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <JobApplication email={new URLSearchParams(props.location.search).get('email')}></JobApplication>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <InterviewScheduled email={new URLSearchParams(props.location.search).get('email')}></InterviewScheduled>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <JobOffer email={new URLSearchParams(props.location.search).get('email')}></JobOffer>
              </TabPanel>
            </div>
          </section>


        </Card.Body>

      </Card>

    </div>



  );
}
