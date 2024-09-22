import {createSlice} from '@reduxjs/toolkit'


const initialState = {
loading:false,
CartItems :[],
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
state.CartItems.push(action.payload)
state.loading = false
},

removeCartItem :(state,action)=>{
    state.loading = true
    state.CartItems= state.CartItems.filter((i)=> i.productId !== action.payload)
    state.loading = false;
    },


    }
})

export const {addToCart,removeCartItem} = cartReducer.actions

