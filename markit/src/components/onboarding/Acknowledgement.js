import React from 'react';
import { Typography, TextField, Button } from "@material-ui/core"
import './style-css/StepStyles.css';


export default class Acknowledgement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acknowledged: false
        };
    }

    fnValidateCheck = (event) => {
        let value = event.target.checked;
        this.setState({ acknowledged: value });
    }


    render() {

        return (

            <div class="stepDiv" style={{"color":"black"  }}>
                <br /><br />
                <b>
                    <Typography className="stepTypos" variant="h5">
                        Acknowledgement
                    </Typography>
                </b>
                <br />
                <form className="stepForm">
                <p><input type="checkbox" onClick={this.fnValidateCheck}></input> &nbsp;
                        I hereby declare, that all of the information I have provided is complete and true to the best of my knowledge 
                        <font color="red">*</font>
                </p>

                <br /><br /><br/>

                
                <div class="row">
                <div class="col-6 stepButtonClass" >

                    <input type="button"  class="btn stepButtonCls "                      
                        style={{"width": '80%',"background-color":"black" ,"color":"rgb(255,200,0)"  }}                                                                        
                        onClick={this.props.backFunction} 
                        value={"Go Back "} 
                     />

                </div>
                <div class="col-6 stepButtonClass"> 

                <input type="button" class="btn stepButtonCls "                    
                    style={{ width: '80%',"background-color":"rgb(255,200,0)" ,"color":"black"  }}
                    disabled={(!this.state.acknowledged)}
                    onClick={this.props.nextFunction} value={this.props.currentStep === this.props.steps.length - 1 ? "Submit" : "Go to Next Step "}
                />

                <br/><br/>

                </div></div>
            
            </form>
            </div>
        );
    }

}

