import React from 'react';
import { Typography, TextField, Button } from "@material-ui/core"
import './style-css/StepStyles.css';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone'


export default class Payroll extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            depositForm: '',
            voidCheque: '',
            photo: ''
        };
    }

    /* This function is used to validate deposit form */
    fnValidateDepositForm = (triggerEvent) => {
        let depositText = triggerEvent.target.value;

        if (depositText == 'undefined' || depositText == null || depositText == '' || depositText.length == 0) {
            this.setState({ depositForm: '' });
        } else {
            this.setState({ depositForm: depositText });
        }

    }

    /* This function is used to validate cheque details*/
    fnValidateVoidCheque = (triggerEvent) => {

        let voidChequeText = triggerEvent.target.value;

        if (voidChequeText == 'undefined' || voidChequeText == null || voidChequeText == '' || voidChequeText.length == 0) {
            this.setState({ voidCheque: '' });
        } else {
            this.setState({ voidCheque: voidChequeText });

        }


    }

    /* This function is used to validate the photo uploaded */
    fnValidatePhoto = (triggerEvent) => {
        let photoText = triggerEvent.target.value;

        if (photoText == 'undefined' || photoText == null || photoText == '' || photoText.length == 0) {
            this.setState({ photo: '' });
        } else {
            this.setState({ photo: photoText });
        }


    }


    render() {

        return (

            <div class="stepDiv">
                <br /><br />
                <Typography variant="h5" className="stepTypos">
                    Upload the following documents
        </Typography><br />
                <form className="stepForm">

                    <div class="row">
                        <div class="form-group required form-outline col-sm-12">
                            <label class="form-label" >Direct Deposit form *</label>
                            <input type="file" accept=".pdf" class="form-control" onChange={this.fnValidateDepositForm} required />
                        </div>


                    </div>

                    <div class="row ">
                        <div class="form-group required form-outline col-sm-12">
                            <label class="form-label" >Void Cheque * </label>
                            <input type="file" accept=".pdf" class="form-control" onChange={this.fnValidateVoidCheque} required />
                        </div>


                    </div>

                    <div class="row ">
                        <div class="form-group required form-outline col-sm-12">
                            <label class="form-label" for="form6Example4">Photo *</label>
                            <input type="file" accept="image/png, image/jpeg" class="form-control" onChange={this.fnValidatePhoto} />
                        </div>
                    </div>



                <div class="row">
                <div class="col-6 stepButtonClass" >

                    <input type="button"  class="btn "    style={{"width": '80%',"background-color":"black" ,"color":"rgb(255,200,0)"  }}                                                                
                        onClick={this.props.backFunction} value=
                        {"Go Back "} 
                     />
                    </div>

                    <div class="col-6 stepButtonClass"> 
                     <input type="button"  class="btn "     style={{"width": '80%',"background-color":"rgb(255,200,0)" ,"color":"black"  }}                    
                        disabled={(!this.state.depositForm || !this.state.voidCheque || !this.state.photo)}
                        onClick={this.props.nextFunction} value=
                        {this.props.currentStep === this.props.steps.length - 1 ? "Submit" : "Go to Next Step "}
                    />

                </div>
                </div>
                    <br /><br />


                </form>


            </div>
        );
    }

}

