import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, TextField, FormControl, Button, Grid,Checkbox, InputLabel } from "@material-ui/core"
import './style-css/StepStyles.css';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';



export default class Bank extends React.Component {

    constructor (props) {
        super(props);
        this.state = { 
        name:'' ,
        nameErr:'',

        accountNo:'',
        validAccountNo: false,
        accountNoErr:'' ,
        confrmAccountNoErr: '',

        bankName:'',
        bankNameErr:''

        };
      }

      setCountry (e) {
        this.setState({ country: e });
      }
     
      setProvince (e) {
        this.setState({ province: e });
      }  


      /* This function is used to validate account name */
      fnValidateName =(triggerEvent)=>{
        let nameText=triggerEvent.target.value;           
                    if(nameText.match(/^[a-zA-Z]+$/)){
                        this.setState({name: nameText});
                        this.setState({nameErr: ""});
                    }
                    else{
                    this.setState({name: ''});
                    if(nameText=='undefined'|| nameText==null || nameText=='' || nameText.length==0){
                        this.setState({nameErr: "Account name should not be empty"});                            
                     }else{
                        this.setState({nameErr: "Account name should contain only alphabets"});                       
                     }                                                              
          }   
            
     }


       /* This function is used to validate account number */
       fnValidateAccountNo=(triggerEvent)=>{
        let accountText=triggerEvent.target.value;
        clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if(accountText.match(/^[0-9]+$/)){      
                        
                        
                        if(accountText.length!=16){
                            this.setState({accountNoErr: 'Account number should be 16 digit and only numeric values are accepted'});
                            this.setState({accountNo: ''});
                        }else{

                        this.setState({accountNo: accountText});
                        this.setState({accountNoErr: ''});
                        }

                                                                   
                    }
                    else{
                        this.setState({accountNo: ''});
                        if(accountText=='undefined'|| accountText==null || accountText=='' || accountText.length==0){
                            this.setState({accountNoErr: 'Account number should not be empty'});
                        }else{
                            this.setState({accountNoErr: 'Account number should be 16 digit and only numeric values are accepted'});
                        }
                    }
                }, 100);      

     }    


     /* This function is used to validate if the account numbers match */
     fnValidateConfirmAccountNo=(triggerEvent)=>{
        let accountText=triggerEvent.target.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {  
                    if(accountText===this.state.accountNo){
                        
                        this.setState({validAccountNo: true});
                        this.setState({confrmAccountNoErr: ''});
                        this.state.confrmAccountNoErr='';
                    }
                    else{
                        this.setState({validAccountNo: false});
                        if(accountText=='undefined'|| accountText==null || accountText=='' || accountText.length==0){
                            this.setState({confrmAccountNoErr: 'Account number should not be empty'});
                            
                        }else{
                            this.setState({confrmAccountNoErr: 'Account number does not match'});
                            
                        }
                    }
                }, 100);
                          
       
    }  


render(){
    const { country, province } = this.state;
return(

    <div class="stepDiv">
        <br/><br/>
        <Typography className="stepTypos"  variant="h5"> 
            Enter Banking Information
        </Typography><br/>
        <form className="stepForm">
            <TextField className="stepText" label="Account Holder Name" variant="outlined" required  onChange={this.fnValidateName}></TextField>
                <span className="text-danger">{this.state.nameErr}</span>
            <br/><br/>

            <TextField className="stepText" type="password" label="Account Number" variant="outlined" required onChange={this.fnValidateAccountNo}></TextField>
                <span className="text-danger">{this.state.accountNoErr}</span>            
            <br/><br/>


            <TextField className="stepText" type="password" label="Re-Enter Account Number" required variant="outlined" onChange={this.fnValidateConfirmAccountNo}></TextField>
                <span className="text-danger">{this.state.confrmAccountNoErr}</span>            
            <br/><br/>
           
            <TextField className="stepText" label="Bank Name" variant="outlined"></TextField><br/><br/>
            <TextField className="stepText" label="Beneficiary Email " variant="outlined"></TextField><br/><br/>
            <TextField className="stepText" label="Bank Branch Code" variant="outlined"></TextField><br/><br/>

            <MuiPhoneNumber className="phoneNumber" variant="outlined" label="Phone" defaultCountry={'ca'}/><br/><br/>
            <br></br>
            <div class="row">
                <div class="col-6 stepButtonClass" >

                    <input type="button"  class="btn "    style={{"width": '80%',"background-color":"black" ,"color":"rgb(255,200,0)"  }}
                                                                        
                        onClick={this.props.backFunction} value=
                        {"Go Back "} 
                     />
                    </div>
                    <div class="col-6 stepButtonClass"> 
                     <input type="button"  class="btn "    style={{"width": '80%',"background-color":"rgb(255,200,0)" ,"color":"black"  }}
                        disabled={(!this.state.validAccountNo || !this.state.name )}                                                 
                        onClick={this.props.nextFunction} value=
                        {this.props.currentStep === this.props.steps.length -1  ? "Submit"  :  "Go to Next Step "} 
                     />

            </div></div>
            <br/><br/>
        
        </form>


    </div>
);
}

}

