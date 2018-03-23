import React, {Component} from 'react';
import Aux1 from '../../hoc/Aux1/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary.js';
import axios from '../../axios_orders.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';





class BurgerBuilder extends Component{
  state={
    purchasing: false,
    loading: false
  }
  componentDidMount(){
  this.props.onInitIngredients();

}

updatePurchasable = (ingredients) =>{

  const sum = Object.keys(ingredients)
  .map(igKey=>ingredients[igKey])
  .reduce((sum , el)=>{
     return sum+ el;}, 0)
    return sum>0;
}

// addIngredientHandler = (type) => {
//  const oldIngredientHandlerCount =this.state.ingredients[type];
//  const newCount = oldIngredientHandlerCount+1;
//  const updatedIngredients ={...this.state.ingredients};
//   updatedIngredients[type]=newCount;
//   console.log("updatedIngredients", updatedIngredients);
//  const newCost= this.state.totalPrice+INGREDIENT_COST[type];
//   this.setState({totalPrice: newCost, ingredients:updatedIngredients});
//   this.updatePurchasable(updatedIngredients);
// }

// removeIngredientHandler=(type)=>{
//    const oldIngredientHandlerCount =this.state.ingredients[type];
//    if(oldIngredientHandlerCount<0){ return }
//  const newCount = oldIngredientHandlerCount-1;
//  const updatedIngredients ={...this.state.ingredients};
//   updatedIngredients[type]=newCount;
//   console.log("updatedIngredients", updatedIngredients);
//  const newCost= this.state.totalPrice-INGREDIENT_COST[type];
//   this.setState({totalPrice: newCost, ingredients:updatedIngredients});
//     this.updatePurchasable(updatedIngredients);

// }
purchaseHandler = ()=>{
  if(this.props.isAuthenticated){
    this.setState({purchasing: true});
  }
  else{
    this.props.onSetAuthRedirect('/checkout');
     this.props.history.push('/auth');
  }
  
}
modalClosedHandler= ()=>{
  this.setState({purchasing: false});
}
purChaseContinueHandler =() =>{
  // console.log(this.state.loading);
  //  //alert("you want to continue");

  // const queryParams = [];
  //  for(let i in this.state.ingredients){
  //       queryParams.push(encodeURIComponent(i)+"="+encodeURIComponent(this.state.ingredients[i]));
  //  }
  //  queryParams.push('price='+ this.state.totalPrice);
  // const queryString = queryParams.join('&');
  // this.props.history.push({
  //   pathname: '/checkout',
  //   search: '?'+queryString
  // });
  this.props.onInitPurchase();
  this.props.history.push('/checkout');
}
purChaseCancleHandler =() =>{
  this.setState({purchasing: false});
}

  render(){
    let orderSummary = null;
    let disableInfo=null;

    let burger=<Spinner />
    if(this.props.ings){
       disableInfo={
    ...this.props.ings
    }
        
              burger= ( <Aux1>
                <Burger ingredients ={this.props.ings} />
                <BuildControls
                ingredientsAdded = {this.props.onIngredientsAdded}
                ingredientsRemoved={this.props.onIngredientsRemoved}
                disabled={disableInfo}
                isAuthenticated={this.props.isAuthenticated}
                price={this.props.totalPrice}
                purchase={this.updatePurchasable(this.props.ings)}
                ordered={this.purchaseHandler}/>
                </Aux1>)
                orderSummary= <OrderSummary ingredients={this.props.ings}
                            purChaseContinue={this.purChaseContinueHandler}
                            purChaseCancle={this.purChaseCancleHandler}
                            price={this.props.totalPrice}/>

    }


  if(this.state.loading){
    orderSummary = <Spinner/>
  }
  for( let key in disableInfo){
    disableInfo[key]=disableInfo[key]<=0
  }

    return(
      <Aux1>
        <Modal show={this.state.purchasing} modalclosed={this.modalClosedHandler}>
            {orderSummary}
          </Modal>
        {burger}

      </Aux1>
    )
  }
}

const mapStateToProps = state =>{
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    isAuthenticated: state.auth.token!==null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
     onIngredientsAdded: (ingName) => dispatch(actionCreators.addIngredients(ingName)),
     onIngredientsRemoved: (ingName) => dispatch(actionCreators.removeIngredients(ingName)),
     onInitIngredients: () => dispatch(actionCreators.initIngredients()),
     onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
     onSetAuthRedirect : (path) => dispatch(actionCreators.reDirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
