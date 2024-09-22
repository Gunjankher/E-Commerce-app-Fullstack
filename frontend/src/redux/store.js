import { configureStore } from '@reduxjs/toolkit'
import { productAPI } from './api/productApi'
import { userAPI } from './api/userApi'
import { userReducer } from './reducer/userReducer'
import { cartReducer } from './reducer/cartReducer'



export const server = import.meta.env.VITE_SERVER



export const store = configureStore({
    reducer :{
    [userAPI.reducerPath] : userAPI.reducer,
    [productAPI.reducerPath] : productAPI.reducer,
    [userReducer.name] :userReducer.reducer,
    [cartReducer.name] :cartReducer.reducer
    },
    middleware :(mid)=>[...mid(),userAPI.middleware,productAPI.middleware]
})

