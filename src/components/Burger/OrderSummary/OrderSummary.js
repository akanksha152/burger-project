import React, {Component} from 'react';
import Aux from '../../../hoc/Aux1/Aux1';
import Button from '../../UI/Button/Button'
class Order extends Component{
    render(){
           const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
        return(
            <li key={igKey}>
                <span style={{transform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li>
        )
    });
        return (
           <Aux>
            <h3> Your Order Summary </h3>
            <p> A delicious burger with following ingredients </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p> continue to checkout </p>
            <Button btnType='Danger' clicked={this.props.purChaseCancle}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.purChaseContinue}>Continue</Button>
        </Aux>
        )
    }
}

 export default Order;