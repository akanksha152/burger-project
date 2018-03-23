import React, {Component} from 'react';
import Order  from '../../components/Orders/Order';
import axios from '../../axios_orders.js';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{



    componentDidMount(){
       this.props.onOrderFetch(this.props.token, this.props.userId);
    }

    render(){
      let orders= <Spinner />
      if(!this.props.loading){
        orders=
        <div>
           {this.props.orders.map(order=>(
               <Order key={order.id}
               ingredients={order.ingredients}
               totalPrice={+order.totalPrice}/>
           ))}
         </div>
      }
        return(
       orders
        )
    }
}

const mapStateToProps = state =>{
  return{
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onOrderFetch : (token, userId)=> dispatch(actionCreators.fetchOrders(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
