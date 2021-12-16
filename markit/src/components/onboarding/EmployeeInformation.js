import React, { Component, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Typography, TextField, FormControl, Button, Grid,Checkbox, InputLabel } from "@material-ui/core"
import './style-css/StepStyles.css';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Container } from '@material-ui/core';


export default class EmployeeInformation extends React.Component {

    constructor (props) {
        super(props);
        this.state = {      
          firstname: this.props.mainValues['firstname'],
          lastname: this.props.mainValues['lastname'],
          email:this.props.mainValues['email'],    
          phone:this.props.mainValues['phone'],
          address:this.props.mainValues['address'],
          country: this.props.mainValues['country'], 
          province: this.props.mainValues['province'],

          firstNameErr:'',
          lastNameErr:'',
          emailErr:'',    
          phoneErr:'',          
          addressErr:'',    
          countrtyErr:'',
          provinceErr:''

        };
        this.timer = null;
      }


      

      /* This function is used to set country value */
      setCountry (e) {
        if(e=='undefined'|| e==null || e=='' || e.length==0){
          this.setState({countryErr: "Select a country"});                            
       }else{
          this.setState({countryErr: ""});                       
       } 
       this.setState({ country: e });
       
      }
     
      /* This function is used to set province details */
      setProvince (e) {
        if(e=='undefined'|| e==null || e=='' || e.length==0){
          this.setState({provinceErr: "Select a province"});                            
       }else{
          this.setState({provinceErr: ""});                       
       } 
        this.setState({ province: e });
      }  

      /* This function is used to validate first name */
      fnValidateFirstName =(triggerEvent)=>{
        let fname=triggerEvent.target.value;           
                    if(fname.match(/^[a-zA-Z]+$/)){
                        this.setState({firstname: fname});                        
                        this.setState({firstNameErr: ""});
                    }
                    else{
                    this.setState({firstname: ''});
                    if(fname=='undefined'|| fname==null || fname=='' || fname.length==0){
                        this.setState({firstNameErr: "First name should not be empty"});                            
                     }else{
                        this.setState({firstNameErr: "First name can contain only alphabets"});                       
                     }                                                              
          }   
            
     }

     /* This function is used to validate last name */
     fnValidateLastName =(triggerEvent)=>{
      let lname=triggerEvent.target.value;            
                  if(lname.match(/^[a-zA-Z]+$/)){                        
                      this.setState({lastname: lname});
                      this.setState({lastNameErr: ''});                                              
                  }
                  else{
                  this.setState({lastname: ''});
                  if(lname=='undefined'|| lname==null || lname=='' || lname.length==0){
                      this.setState({lastNameErr: 'Last name should not be empty'});
                  }else{
                      this.setState({lastNameErr: 'Last name should contain only alphabets'});
                  }                      
       }        
      }

      /* This function is used to validate email */
     fnValidateEmail=(triggerEvent)=>{
      let emailText=triggerEvent.target.value;
      clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                  if(emailText.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+/)){
                      this.setState({email: emailText});
                      this.setState({emailErr: ''});
                  }
                  else{
                    console.log(emailText)
                      this.setState({email: ''});                      
                      if(emailText=='undefined' || emailText==null || emailText=='' || emailText.length===0){                                                     
                          this.setState({emailErr: 'Email should not be empty'});
                      }else{                      
                          this.setState({emailErr: 'Invalid email'});
                      }
                  }
              }, 100); 
   }

   /* This function is used to validate phone number */
   fnValidatePhone=(triggerEvent)=>{
    let phoneText=triggerEvent;
    let number=phoneText.substring(3,phoneText.length);
    number=number.replace(/[^0-9.]/g, '');
                    if(phoneText==='undefined' || phoneText==null || phoneText=='' || phoneText.length===0){
                        this.setState({phone: ''});                                                 
                        this.setState({phoneErr: 'Phone should not be empty'});
                    }else{         
                      console.log(number+":::::"+number.length)   
                      if(number.length!=10){
                                                                       
                        this.setState({phoneErr: 'Invalid number'});
                      }else{
                      this.setState({phone: phoneText});
                      this.setState({phoneErr: ''});
                    }}           
 }


 /* This function is used to validate address information*/
 fnValidateAddress=(triggerEvent)=>{
   let addressText=triggerEvent.target.value;
 
                  if(addressText==='undefined' || addressText==null || addressText=='' || addressText.length===0){
                      this.setState({address: ''});                                                 
                      this.setState({addressErr: 'Address should not be empty'});
                  }else{
                    this.setState({address: addressText});
                    this.setState({addressErr: ''});
                  }
          
}


fnHandleNextClick=()=>{
 
  this.props.mainValues['firstname']=this.state.firstname;
  this.props.mainValues['lastname']=this.state.lastname;
  this.props.mainValues['email']= this.state.email;
  this.props.mainValues['phone']=this.state.phone;
  this.props.mainValues['address']=this.state.address;
  this.props.mainValues['country']=this.state.country; 
  this.props.mainValues['province']=this.state.province;

  this.props.nextFunction();
}

render(){
    return(

    <div class="stepDiv">
        <br/><br/>
        <Typography className="stepTypos"  variant="h5">
            Employee Personal Data
        </Typography><br/>

        <form className="stepForm">

            <TextField className="stepText required" label="First Name" variant="outlined"  required  onChange={this.fnValidateFirstName} defaultValue={this.state.firstname}></TextField>
              <span className="text-danger">{this.state.firstNameErr}</span>
            <br/><br/>

            <TextField className="stepText" label="Last Name" variant="outlined" required onChange={this.fnValidateLastName} defaultValue={this.state.lastname}></TextField>
              <span className="text-danger">{this.state.lastNameErr}</span>
            <br/><br/>

            <TextField className="stepText" label="Email" variant="outlined"  required onChange={this.fnValidateEmail} defaultValue={this.state.email}></TextField>
              <span className="text-danger">{this.state.emailErr}</span>
            <br/><br/>
           
           <div>
            <MuiPhoneNumber className="phoneNumber" variant="outlined" label="Phone" required  onChange={this.fnValidatePhone} value={this.state.phone}  defaultCountry={'ca'}/>
                <span className="text-danger">{this.state.phoneErr}</span>
            <br/>
            </div>
            <TextField className="stepText" label="Address" type="textarea" variant="outlined" required onChange={this.fnValidateAddress} defaultValue={this.state.address}></TextField>
                <span className="text-danger">{this.state.addressErr}</span>
            <br/><br/>         


            <div class="row">
                <div class="form-group stepSelect required form-outline col-md-6">
                    <label class="form-label" >Country *</label>
                    <CountryDropdown class="form-control" variant="outlined" label="Country" required  value={this.state.country} onChange={(e) => this.setCountry(e)} value={this.state.country} />
                    <span className="text-danger">{this.state.countryErr}</span>
                    <br/><br/>
                </div>              
                <div class="form-group stepSelect required  form-outline col-md-6">        
                  <label class="form-label" >Province * </label>
                  <RegionDropdown  class="form-control" variant="outlined" label="Province" required  country={this.state.country}  value={this.state.province}  onChange={(e) => this.setProvince(e)} value={this.state.province} />
                  <span className="text-danger">{this.state.provinceErr}</span>                  
                </div>        
            </div>
        
        <div class="row">
        <div class="col-12 stepButtonClass" >
            <input type="button"  class="btn stepButtonCls "   style={{"width": '50%',"background-color":"rgb(255,200,0)" ,"color":"black"  }}
                 disabled={(!this.state.firstname || 
                                !this.state.lastname ||
                                       !this.state.email || 
                                            this.state.phoneErr ||
                                                !this.state.address ||
                                                  !this.state.country ||
                                                   !this.state.province )} 
                                                  
                  onClick={this.fnHandleNextClick} value=
                {this.props.currentStep === this.props.steps.length -1  ? "Submit"  :  "Go to Next Step " } 
                
            />
            </div>
        </div>

        
          <br/><br/>
        </form>


    </div>
);
}

}

