import * as actionTypes from './actionsTypes';
import axios from '../../axios_orders.js';

export const addIngredients = (ingre) =>{
  return{
     type: actionTypes.ADD_INGREDIENT,
     ingredientName: ingre
  }
}

export const removeIngredients = (ingre) =>{
  return{
     type: actionTypes.REMOVE_INGREDIENT,
     ingredientName: ingre
  }
}

export const setIngredients = (ingredients)=>{
  return{
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const initIngredients = () =>{
    return dispatch =>{
      axios.get('https://my-burger-project-abeb6.firebaseio.com/ingredients.json')
      .then(response=>{
         dispatch(setIngredients(response.data));
       })
       .catch(err=>console.log(err));
    }
}
