import { ADD_INGREDIENT, AUTH_LOADING, AUTH_LOGOUT, AUTH_SUCCESS, LOAD_ORDERS, ORDER_LOAD_FAILED, REMOVE_INGREDIENT, RESET_INGREDIENTS, UPDATE_PURCHASEABLE } from "./ActionType";

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
 orderLoading: true,
 orderErr: false,
 orders: [],
 token: null,
 userId: null,
 authLoading: false,
 authFailed: null,
}

const BurgerReducer = (state = initialState, action) => {
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
  
  case RESET_INGREDIENTS:
   return {
    ...state,
    ingredients: [
     { type: 'salad', amount: 0 },
     { type: 'cheese', amount: 0 },
     { type: 'meat', amount: 0 }
    ],
    totalPrice: 80,
    purchaseable: false,
   }
  case LOAD_ORDERS:
   let orders=[]
   for (let key in action.payload) {
    orders.push({
     ...action.payload[key],
     id:key
    })
   }
   return {
    ...state,
    orders: orders,
    orderLoading:false,
   }
  
  case ORDER_LOAD_FAILED:
   return {
    ...state,
    orderErr: true,
    orderLoading: false,
   }
  case AUTH_SUCCESS:
   return {
    ...state,
    token: action.payload.token,
    userId: action.payload.userId
   }
  case AUTH_LOGOUT:
   return {
    ...state,
    token: null,
    userId:null
   }
  case AUTH_LOADING:
   return {
    ...state,
    authLoading:action.payload
   }
  
  default: return state;
 }
}

export default BurgerReducer;