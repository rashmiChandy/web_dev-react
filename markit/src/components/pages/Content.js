import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Image sourced from https://elearningindustry.com/considerations-before-designing-effective-elearning-courses
import courses from '../images/courses.jpg'
// Image sourced from https://learning.shine.com/talenteconomy/career-help/how-to-write-a-job-application-letter/
import jobApplication from '../images/job-application.png'
// Image sourced from https://www.lanthitstaffing.com/en/2021/01/20/process-of-employee-onboarding/
import onboarding from '../images/onboarding.png'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    width:"345px",
  },
  media: {
    height: 140,
  },
});

export default function Content() {
  const history = useHistory()
  const classes = useStyles();

  return (
      <div style={{display: "contents"}}>
          {/*CARD 1  */}
           <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={courses}
                    title="Explore Courses"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Explore Courses
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                            Choose from a wide range of courses offered by the university. View the course details and apply for the job which matches your skillset.
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                
                    <Button size="small" color="primary" onClick={()=>history.push('/courses')}>
                    Learn More
                    </Button>
                </CardActions>
            </Card>
            {/* Card 2 */}
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={jobApplication}
                    title=" Application Updates"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Application Updates
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                            Keep track of your job applications and view the details of its current status. Easily manage your Job offers. 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                
                    <Button size="small" color="primary" onClick={()=>history.push('/myApplication?email='+sessionStorage.getItem('markit-email'))}>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
             {/* Card 3 */}
             <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                    className={classes.media}
                    image={onboarding}
                    title=" Onboarding"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Onboarding Process
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                           (1) View Job Posting (2) Apply for a Job (3) Track your Application (4) Complete interview process (5) Receive Job Offer if you are hired. 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                
                    <Button size="small" color="primary" onClick={()=>history.push('/onboarding')}>
                        Learn More 
                    </Button>
                </CardActions>
            </Card>
        </div>
   
    
  );
}
