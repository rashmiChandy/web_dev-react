import React from 'react';
import {Typography, TextField , Button} from "@material-ui/core"
import './style-css/StepStyles.css';


export default class SIN extends React.Component {

    constructor (props) {
        super(props);
        console.log(this.props.mainValues);
        this.state = { 
            password:'',
            validPassword:false,
            pwdErr:'',
            confirmPwdErr:'',
        };
        this.timer = null;
      }

     /* This function is used to validate SIN number */
     fnValidateSIN=(triggerEvent)=>{
        let pwd=triggerEvent.target.value;
        
        clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if(pwd.match(/^[0-9]+$/)){      
                        
                        if(pwd.length!=16){
                            this.setState({pwdErr: 'SIN should be 16-digit'});
                            this.setState({password: ''});
                        }else{

                        this.setState({password: pwd});
                        this.setState({pwdErr: ''});
                        }
                                             
                    }
                    else{
                        this.setState({password: ''});
                        if(pwd=='undefined'|| pwd==null || pwd=='' || pwd.length==0){
                            this.setState({pwdErr: 'SIN should not be empty'});
                        }else{
                            if(pwd.length!=16){
                                this.setState({pwdErr: 'SIN should be 16-digit'});
                            }else{
                                this.setState({pwdErr: 'Invalid SIN'});
                            }
                        }
                    }
                }, 100);      

     }    


     /* This function is used to validate if the SIN match */
     fnValidateConfirmSIN=(triggerEvent)=>{
        let pwd=triggerEvent.target.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {  
                    if(pwd===this.state.password){
                        
                        this.setState({validPassword: true});
                        this.setState({confirmPwdErr: ''});
                        this.state.confirmPwdErr='';
                    }
                    else{
                        this.setState({validPassword: false});
                        if(pwd=='undefined'|| pwd==null || pwd=='' || pwd.length==0){
                            this.setState({confirmPwdErr: 'SIN should not be empty'});
                            
                        }else{
                            this.setState({confirmPwdErr: 'SIN values does not match'});
                            
                        }
                    }
                }, 100);
                          
       
    }    


render(){
    
return(

    <div class="stepDiv">
        <br/><br/>
        <Typography className="stepTypos" variant="h5">
            Social Insurance Number Details 
        </Typography><br/>
        <form className="stepForm">
            <TextField className="stepText" type="password" label="Enter SIN value" required variant="outlined" onChange={this.fnValidateSIN} ></TextField>
                <span className="text-danger">{this.state.pwdErr}</span> 
            <br/><br/>

            <TextField className="stepText" type="password" label="Re-Enter SIN value" required variant="outlined" onChange={this.fnValidateConfirmSIN}></TextField>
                <span className="text-danger">{this.state.confirmPwdErr}</span> 
            <br/><br/><br/>
            
            <div class="row">
                <div class="col-6 stepButtonClass" >

                    <input type="button"  class="btn "    style={{"width": '80%',"background-color":"black" ,"color":"rgb(255,200,0)"  }}
                                                                        
                        onClick={this.props.backFunction} value=
                        {"Go Back "} 
                     />
                    </div>
                    <div class="col-6 stepButtonClass">  
                     <input type="button"  class="btn "     style={{"width": '80%',"background-color":"rgb(255,200,0)" ,"color":"black"  }}
                        disabled={(!this.state.validPassword )}                                                 
                        onClick={this.props.nextFunction} value=
                        {this.props.currentStep === this.props.steps.length -1  ? "Submit"  :  "Go to Next Step "} 
                     />
                     </div>

            </div>        

            <br/><br/>
        </form>


    </div>
);
}

}

