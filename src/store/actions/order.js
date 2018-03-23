import * as actionTypes from './actionsTypes';
import axios from '../../axios_orders.js';

export const purchaseBurger = (id, orderData) =>{
    return{
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      id: id,
      orderData: orderData
    }
}

export const purchaseBurgerStart = (orderData) => {
   return{
     type: actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger1 = (orderData, token) =>{
   return dispatch => {
     dispatch(purchaseBurgerStart());
     axios.post('/orders.json?auth='+ token, orderData)
         .then(response => {
            dispatch(purchaseBurger(response.data.name, orderData))
         })
         .catch(error => {
           console.log(error);
         });
   }
}

export const purchaseInit = () =>{
  return{
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrderSuccess = (orders) =>{
  return{
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrderStart =()=>{
  return{
    type: actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrders = (token, userId)=>{

  return dispatch =>{
    dispatch(fetchOrderStart());
    const queryParams = '?auth='+ token +'&orderBy="userId"&equalTo="'+userId+'"';
    axios.get('/orders.json'+queryParams)
    .then(res=>{
        const fetchData=[];
        for(let key in res.data){
            fetchData.push({
                ...res.data[key],
                id: key
            });
        }
        dispatch(fetchOrderSuccess(fetchData));
    }).catch(err=>{
        console.log(err);
    });
  }
}
