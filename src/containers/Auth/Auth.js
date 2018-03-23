import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
    componentDidMount(){

        if(!this.props.burgerBuilding && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirect();
        }
    }
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: 'true',
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: 'true',
                    minlength: 7
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

   switchAutoModeHandler = () =>{
       this.setState(prevState=>{
           return {isSignUp: !prevState.isSignUp}
       })
   }
     
    inputChangeHandler = (event, controlName) =>{
        const updatedControl ={
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        }
        this.setState({controls: updatedControl});
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

    }

    render() {
        let authRedirect =null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to= {this.props.authRedirectPath}/>
        }

        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
     

        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={(event) => this.inputChangeHandler(event, formElement.id)} />
        ));
       
         
        if(this.props.loading){
            form = <Spinner/>
        }
        let errormessage = null;
        if(this.props.error){
            errormessage = this.props.error.message;
        }

        return (
                <div className={classes.Auth}>
                    {authRedirect}
                        {errormessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit </Button>
                </form>
                <Button clicked= {this.switchAutoModeHandler}
                 btnType ="Danger">Switch to {this.state.isSignUp? 'SignUp' :'SignIn'}  </Button>
            </div>
 
        
        )
    }
}

const mapStateToProps = state =>{
    return{
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token!==null,
    burgerBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToprops = dispatch =>{
    return{
       onAuth: (email, password, isSignUp) =>dispatch(actionCreators.auth(email, password, isSignUp)),
       onSetAuthRedirect : () => dispatch(actionCreators.reDirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToprops)(Auth); 