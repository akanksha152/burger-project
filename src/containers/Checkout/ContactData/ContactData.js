import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actionCreators from '../../../store/actions/index';
import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required: 'true'
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: ' E-mail'
                },
                value: '',
                validation:{
                    required: 'true'
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: ' Street'
                },
                value: '',
                validation:{
                    required: 'true'
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation:{
                    required: 'true',
                    minlength: 5,
                    maxlength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: 'true'
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement].value;
        }

        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.totalPrice,
            userInfo: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);

    }

    onChangeHandler = (event, eventIden) => {

        const updateOrderElement = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updateOrderElement[eventIden]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched =true
        updatedFormElement.valid=checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updateOrderElement[eventIden] = updatedFormElement;

        let formIsValid= true;
        for( let inputIdent in updateOrderElement){
            formIsValid= updateOrderElement[inputIdent].valid&& formIsValid;
        }
        this.setState({ orderForm: updateOrderElement, formIsValid: formIsValid})
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.onChangeHandler(event, formElement.id)} />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} >Order</Button>

            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h1>Enter ur details</h1>
                {form}

            </div>
        )
    }
}
const mapStateToProps = state =>{
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
       onOrderBurger : (orderData, token) => dispatch(actionCreators.purchaseBurger1(orderData, token))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
