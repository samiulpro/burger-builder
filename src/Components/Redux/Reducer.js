import { ADD_INGREDIENT, REMOVE_INGREDIENT, UPDATE_PURCHASEABLE } from "./ActionType";

const INGREDIENT_PRICES = {
 salad: 20,
 cheese: 40,
 meat: 90,
}

const initialState = {
 ingredients: [
  { type: 'salad', amount: 0 },
  { type: 'cheese', amount: 0 },
  { type: 'meat', amount: 0 }
 ],
 totalPrice: 80,
 purchaseable: false,
}

const Reducer = (state = initialState, action) => {
 const ingredients = [...state.ingredients];
 switch (action.type) {
  case ADD_INGREDIENT:
   for (let item of ingredients) {
    if (item.type === action.payload) item.amount++;
   }
   return {
    ...state,
    ingredients: ingredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
   }
  
  case REMOVE_INGREDIENT:
   for (let item of ingredients) {
    if (item.type === action.payload) {
     if (item.amount <= 0) return;
     item.amount--;
    }
   }
   return {
    ...state,
    ingredients: ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
   }
  
  case UPDATE_PURCHASEABLE:
   const sum = state.ingredients.reduce((sum, element) => {
    return sum+element.amount
   }, 0)
   return {
    ...state,
    purchaseable:sum>0
  }
  default: return state;
 }
}

export default Reducer;