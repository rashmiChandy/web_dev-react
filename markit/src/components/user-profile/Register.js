import React from "react";
import {
  Grid,
  TextField,
  Card,
  Button,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { useState } from "react";
import { useHistory } from 'react-router';
import axios from 'axios';
import markit_logo from "../images/markit_logo.png";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Register() {
  const cardStyle = {
    padding: 50,
    height: "auto",
    width: "375px",
    margin: "12.5% auto",
  };
  const avatarStyle = { backgroundColor: "#000000" };
  const classes = useStyles();

  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [validPassword, setvalidPassword] = useState(true);
  const [validUsername, setvalidUsername] = useState(true);
  const [validFirstname, setvalidFirstname] = useState(true);
  const [validLastname, setvalidLastname] = useState(true);
  const [validConfPwd, setvalidConfPwd] = useState(true);
  const [validEmail, setvalidEmail] = useState(true);
  const [validTnC, setvalidTnC] = useState(true);
  const [tnc, settnc] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isRegister, setisRegister] = useState(false);
  const [userExists, setuserExists] = useState(false);
  const user_registration_api = "/api/register/add-user";
  const history = useHistory();

  const handleInput = (event) => {
    if (event.target.name === "username") {
      setusername(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "firstname") {
      setfirstname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "lastname") {
      setlastname(event.target.value);
      handleUsername(event.target.id, event.target.value);
    }
    if (event.target.name === "password") {
      setpassword(event.target.value);
      handlePassword(event.target.value);
    }
    if (event.target.name === "email") {
      setemail(event.target.value);
      handleEmail(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setconfirmPassword(event.target.value);
      handleConfirmPassword(event.target.value);
    }
    if (event.target.name === "tnc") {
      settnc(event.target.checked);
      handleTnC(event.target.checked);
    }
  };

  const handleUsername = (nameValue, userName) => {
    let boolName = false;
    const regex = /^\w+$/;
    if (userName !== null && userName !== "") {
      boolName = regex.test(userName);
    }
    if (nameValue === "username") {
      setvalidUsername(boolName);
    }
    if (nameValue === "firstname") {
      setvalidFirstname(boolName);
    }
    if (nameValue === "lastname") {
      setvalidLastname(boolName);
    }
  };

  const handlePassword = (passWord) => {
    if (passWord !== null || passWord !== "") {
      const regex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
      ///^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!#*@?])[A-Za-z\d@$!@#%*?&]{8,}$/;
      setvalidPassword(!regex.test(passWord));
    }
  };

  const handleConfirmPassword = (passWord) => {
    if (passWord !== null && passWord !== "") {
      if (password === passWord) setvalidConfPwd(true);
      else setvalidConfPwd(false);
    } else {
      setvalidConfPwd(false);
    }
  };

  const handleEmail = (emailID) => {
    if (emailID !== null || emailID !== "") {
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      setvalidEmail(regex.test(emailID));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUsername("firstname", firstname);
    handleUsername("lastname", lastname);
    handlePassword(password);
    handleConfirmPassword(confirmPassword);
    handleEmail(email);
    handleTnC(tnc);
    setOpen(false);
    async function authenticateUser() {
      await axios.post(user_registration_api,
        {}, { headers: { 'firstname': firstname, 'lastname': lastname, 'email': email, 'password': password, 'otp': '000000' } })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setSuccess(true);
            console.log('Registration successful!');
            sessionStorage.setItem('markit-email', email);
            setisRegister(true);
          } else if (response.status === 409) {
            console.log('User already exists');
            setuserExists(true);
            setOpen(true);
          }
        }).catch((error) => {
          console.log(error);
          setOpen(true);
        });
    }
    authenticateUser();
  };

  const handleSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    history.push('/home');
  };

  const handleTnC = (tncValue) => {
    settnc(tncValue);
    setvalidTnC(tncValue);
  };
  return (
    <div >
      <Grid container spacing={3}>
        <Grid item lg={3} md={3}></Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Card style={cardStyle}>
            <Grid align="center">
              <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
              <Typography variant="body1" gutterBottom >
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                  REGISTRATION
                </Box>
              </Typography>
            </Grid>

            <form>
              <div>
                <TextField
                  label="Firstname"
                  placeholder="Enter first name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="firstname"
                  id="firstname"
                  error={!validFirstname}
                  helperText={
                    validFirstname
                      ? ""
                      : "Only alpha numeric characters are allowed!"
                  }
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Lastname"
                  placeholder="Enter last name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="lastname"
                  id="lastname"
                  error={!validLastname}
                  helperText={
                    validLastname
                      ? ""
                      : "Only alpha numeric characters are allowed!"
                  }
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Email"
                  placeholder="Email address"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="email"
                  id="email"
                  error={!validEmail}
                  helperText={validEmail ? "" : "Enter a valid email address."}
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  variant="outlined"
                  margin="normal"
                  error={!validPassword}
                  helperText={
                    validPassword
                      ? ""
                      : "Minimum 8 characters with one uppercase, one lowercase, one number and a special character!"
                  }
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  placeholder="Enter password"
                  name="confirmPassword"
                  id="confirmPassword"
                  variant="outlined"
                  margin="normal"
                  error={!validConfPwd}
                  helperText={validConfPwd ? "" : "Passwords do not match!"}
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <Grid align="center">
                  <Box fontSize={12} m={1}>
                    <Checkbox
                      name="tnc"
                      checked={tnc}
                      onChange={handleInput}
                      color="primary"
                    ></Checkbox>
                    <Link href="https://3912.cupe.ca/documents/collective-agreements/">
                      Agree to Terms and Conditions.
                    </Link>
                  </Box>
                </Grid>
              </div>
              <p
                className={validTnC ? "hidden" : "text-danger p-tag-alert"}
                style={{ color: "red", "font-size": "x-small" }}
              >
                Agree to the terms and conditions to register!
              </p>
              <div>
                <Grid align="center">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.margin}
                    endIcon={<Icon>send</Icon>}
                  >
                    Sign up
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                      User already registered!
                    </Alert>
                  </Snackbar>
                  <Snackbar open={success} autoHideDuration={750} onClose={handleSuccess}>
                    <Alert onClose={handleSuccess} severity="success">
                      Registration successfull!
                    </Alert>
                  </Snackbar>
                </Grid>
              </div>
              <div>
                Existing user?
                <Link to="/login">
                  <span> Sign in!</span>
                </Link>
              </div>
            </form>
          </Card>
        </Grid>

        <Grid item lg={3} md={3}></Grid>
      </Grid>
    </div>
  );
}

export default Register;
