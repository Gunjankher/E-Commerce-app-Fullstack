import {createSlice} from '@reduxjs/toolkit'


const initialState = {
loading:false,
cartItems :[],
subtotal :0,
tax :0,
shippingCharges:0,
discount:0,
total :0,
shippingInfo:{
    adress:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
}
}


 export const cartReducer = createSlice({
    name :"cartReducer",
    initialState,
    reducers:{
addToCart :(state,action)=>{
state.loading = true
const index = state.cartItems.findIndex((i)=> i.productId === action.payload.productId)
if(index !== -1) state.cartItems[index] = action.payload
else{

state.cartItems.push(action.payload)
state.loading = false
}
    
},

removeCartItem :(state,action)=>{
    state.loading = true
    state.cartItems= state.cartItems.filter((i)=> i.productId !== action.payload)
    state.loading = false;

    if (state.cartItems.length === 0) {
      state.subtotal = 0;
      state.tax = 0;
      state.shippingCharges = 0;
      state.discount = 0;
      state.total = 0;
    }
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
      );
  
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subtotal * 0.18);
      

      // console.log('Subtotal:', state.subtotal);
      // console.log('Tax:', state.tax);
      // console.log('Shipping Charges:', state.shippingCharges);
      // console.log('Discount:', state.discount);


      // Ensure discount is a valid number
      const discountValue = typeof state.discount === 'number' ? state.discount : 0;
      state.total = subtotal + state.tax + state.shippingCharges - discountValue;
  },
  
  discountApplied: (state, action) => {
 state.discount = action.payload  
  },

  saveCoupon: (state, action) => {
    state.coupon = action.payload;
  },
  saveShippingInfo: (state, action) => {
    state.shippingInfo = action.payload;
  },
  resetCart: () => initialState,
},

   
})

export const {addToCart,removeCartItem,calculatePrice,discountApplied,saveShippingInfo,resetCart} = cartReducer.actions

