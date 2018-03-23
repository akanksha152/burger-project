import * as actionTypes from '../actions/actionsTypes.js';
import { updatedObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const purchaseInit = (state, action) => {
  return updatedObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
  return updatedObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
  const newData = {
    ...action.orderData,
    id: action.id
  };
  return updatedObject(state, {
    loading: false,
    orders: state.orders.concat(newData),
    purchased: true
  });
}

const fetchOrderStart = (state, action) => {
  return updatedObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
  return updatedObject(state, {
    orders: action.orders,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
    default:
      return { ...state };

  }

}

export default reducer;
