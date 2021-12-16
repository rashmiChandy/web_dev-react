import "./App.css";
import { React } from "react";
import Login from "./components/user-profile/Login";
import Register from "./components/user-profile/Register";
import Profile from "./components/user-profile/Profile";
import ResetPassword from "./components/user-profile/ResetPassword";
import Home from "./components/pages/Home";
import { Switch, Route } from "react-router-dom";
import JobApplicationStepper from "./components/jobApplication/JobApplicationStepper";
import ApplicationTabs from "./components/myApplication/tab"
import NavigationBar from './navbar';
import Course from './components/courses/Course';
import CourseDetail from './components/courses/CourseDetail';
import OnBoadingProcess from "./components/onboarding/OnBoardingProcess";
import HiringManagment from './components/hiring-management/HiringManagment';
import JobPosting from './components/jobPosting/JobPosting'
import ProtectedRoute from "./components/pages/ProtectedRoute";
import InvalidURL from "./components/pages/403";

function App() {

  return (
    <div className="App">
      <header>
        <NavigationBar></NavigationBar>
      </header>

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/home" component={Home} />

        <Route exact path="/login" component={Login} />

        <Route path="/register">
          <Register></Register>
        </Route>

        <Route path="/reset">
          <ResetPassword></ResetPassword>
        </Route>

        <ProtectedRoute path="/profile"
          component={Profile} />

        <ProtectedRoute exact path="/myApplication" component={ApplicationTabs} />

        <ProtectedRoute exact path="/jobApplication/:courseName/:jobPosition" component={JobApplicationStepper} />

        <ProtectedRoute
          exact path={"/courses"}
          component={() => <Course />}
        />
        <ProtectedRoute
          exact path={"/courses"}
          component={() => <Course />}
        />
        <ProtectedRoute
          exact path={"/courses/:id"}
          component={() => <CourseDetail />}
        />

        <ProtectedRoute path="/onboarding"
          component={OnBoadingProcess} />

        <ProtectedRoute path="/hiring-management"
          component={HiringManagment} />

        <ProtectedRoute path="/jobPosting/:course" exact component={JobPosting} />

        <Route path="/*">
          <InvalidURL></InvalidURL>
        </Route>

      </Switch>
    </div >
  );
}

export default App;