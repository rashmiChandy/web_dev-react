import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Banner from "./Banner"
import Footer from './Footer'
import Content from "./Content"

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));


const Home = () => {
  const classes = useStyles();


  return (
    <div style={{"display":"flex", "flex-direction":"column"}}>
      
      <div >
        <Banner></Banner>
      </div>

      <div  style={{background: "#343a40"}}>
        <section style={{"display":"flex",  "margin":"10px","justifyContent": "space-evenly"}}>
          <Content></Content>
        </section>

      </div>
      

      <section>
        <Footer></Footer>
      </section>
      

    </div>
   

      
  );
};

export default Home;
