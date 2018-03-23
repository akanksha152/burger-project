import React, {Component} from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends Component{

    // state={
    //     ingredients: null,
    //     price: 0
    // }
    // componentWillMount(){
    //     console.log('in checkout', this.props.location.search);
    //     const query= new URLSearchParams(this.props.location.search);
    //     console.log(query);
    //     const ingredient = {};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0]=='price'){
    //             price=param[1];
    //         }
    //       else{
    //        ingredient[param[0]] = +param[1];
    //       }
    //     }

    //     console.log("frrr",ingredient);
    //     this.setState({ingredients: ingredient, price: price});
    //     console.log('dfgh',this.state.ingredients);
    // }
    checkoutCancelledHandler=()=>{
   this.props.history.goBack();
    }

    checkoutContinueHandler = () =>{
     this.props.history.replace('/checkout/contact-data');
    }

   render(){
     let summary = <Redirect to ="/" />
     if(this.props.ings){
      const purchsedRedirect = this.props.purchased ? <Redirect to= '/'/>: null;
      summary =(
         <div>
                {purchsedRedirect}
               <CheckoutSummary ingredients={this.props.ings}
                         checkoutCancelled={this.checkoutCancelledHandler}
                         checkoutContinue={this.checkoutContinueHandler}
                />
               <Route path={this.props.match.path+'/contact-data'}
                  //   render ={(props)=>(<ContactData ingredients={this.props.ings} price={this.state.price} {...props}/>)}
                  component ={ContactData}
                  />
        </div>)
     }
       return(
           summary
       )
   }

}
const mapStateToProps = state =>{
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout);
