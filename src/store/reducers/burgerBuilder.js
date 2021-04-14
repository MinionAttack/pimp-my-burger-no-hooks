import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.6,
};

const addIngredient = (state, action) => {
  const updatedAddIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedAddIngredients = updateObject(
    state.ingredients,
    updatedAddIngredient
  );
  const updatedAddState = {
    ingredients: updatedAddIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedAddState);
};

const removeIngredient = (state, action) => {
  const updatedRemoveIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedRemoveIngredients = updateObject(
    state.ingredients,
    updatedRemoveIngredient
  );
  const updatedRemoveState = {
    ingredients: updatedRemoveIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedRemoveState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ...state,
    // De esta manera las posiciones son siempre fijas según vienen de firebase
    // ingredients: action.ingredients,
    // De esta menera se pierde algo de flexibilidad y no se obtienen dinámicamente
    // pero al añadirlos se muestran en el orden correcto.
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // No es necesario el break porque en cada caso se hace un return.
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
