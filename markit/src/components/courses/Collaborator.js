import React, { useState, useEffect }  from 'react';
import { CssBaseline, Typography, Container, Grid, Avatar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    }
}));

const Collaborator = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const id = location.state.course.courseId;
        const user = location.state.user;
        if (id && user) {
            const getCollaborator = async () => {
                await Axios.get(`/api/collaborator/${id}`).then((response) => {
                    if (response.data.collaborators) {
                        setRows(response.data.collaborators);
                    }
                });
            };
            getCollaborator();
        }
    }, [location.state]);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '10vh' }}>
                    <Grid item lg={2}>
                        {rows && rows.map((row) => (
                            <Avatar alt={row.email} src='.' className={classes.avatar} />
                        ))}
                    </Grid>
                </Typography>
            </Container>
        </React.Fragment >
    );
}

export default Collaborator;