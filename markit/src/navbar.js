import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import DoneIcon from '@material-ui/icons/Done';
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import './App.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NavigationBar = () => {
    const [display, setdisplay] = useState(false);
    const [number, setNumber] = useState(0);
    const [success, setSuccess] = React.useState(false);
    const history = useHistory();

    if (sessionStorage.getItem('markit-email') === null) {
        sessionStorage.setItem('markit-email', "");
    }
    const handleSuccess = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
    };

    const increment = () => {
        if (sessionStorage.getItem('markit-email') === "") {
            setNumber(number + 1);
            setdisplay(false);
        }
        else {
            setdisplay(true);
        }
    }

    const handleToggle = () => {
        if (sessionStorage.getItem('markit-email')) {
            setdisplay(false);
            sessionStorage.setItem('markit-email', "");
            setSuccess(true);
            increment();
        }
    }

    useEffect(() => {
        increment();
    }, [number])

    switch (sessionStorage.getItem('markit-email') !== "") {
        case true:
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="/" style={{ 'color': '#ffffff' }}>
                            MarkIT
                            <DoneIcon fontSize="large"></DoneIcon>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">HOME</Nav.Link>
                                <Nav.Link href="/#/courses">COURSES</Nav.Link>
                                <Nav.Link href={"/#/myApplication?email=" + sessionStorage.getItem('markit-email')}>MY APPLICATION</Nav.Link>
                                <Nav.Link href="#/hiring-management">HIRING</Nav.Link>
                                <Nav.Link href="#onboarding">ONBOARDING</Nav.Link>
                                <Nav.Link href="/#/profile">PROFILE</Nav.Link>
                                <Nav.Link href="/#/reset">RESET</Nav.Link>
                                <Nav.Link href="#/" onClick={handleToggle}>LOGOUT</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
        default:
            return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
                    <Container>
                        <Navbar.Brand href="/" style={{ 'color': '#ffc800' }}>
                            MarkIT
                            <DoneIcon fontSize="large"></DoneIcon>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link href="/">HOME</Nav.Link>
                                <Nav.Link href="/#/login" >SIGN IN</Nav.Link>
                                <Snackbar open={success} autoHideDuration={3000} onClose={handleSuccess}>
                                    <Alert onClose={handleSuccess} severity="success">
                                        Logged out successfully!''
                                    </Alert>
                                </Snackbar>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            );
    }
}
export default NavigationBar;