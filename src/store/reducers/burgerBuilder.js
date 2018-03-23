import * as actionTypes from '../actions/actionsTypes.js';
import { updatedObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  building: false
}
const INGREDIENT_COST = {
  salad: 1.2,
  bacon: .7,
  cheese: 1.9,
  meat: 4.0
}

const addIngredients = (state, action) => {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_COST[action.ingredientName],
    building: true
  }
  return updatedObject(state, updateState);
}

const removeIngredients = (state, action) => {
  const updatedIngredient1 = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const updatedIngredients1 = updatedObject(state.ingredients, updatedIngredient1);
  const updateState1 = {
    ingredients: updatedIngredients1,
    totalPrice: state.totalPrice - INGREDIENT_COST[action.ingredientName],
    building: true
  }
  return updatedObject(state, updateState1);
}

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
      salad: action.ingredients.salad
    },
    totalPrice: 4,
    building: false
  })
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    default:
      return {
        ...state
      }
  }
}

export default reducers;
