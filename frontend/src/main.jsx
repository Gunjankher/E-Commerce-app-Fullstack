import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createBrowserRouter,createRoutesFromElements,Routes,RouterProvider,Route} from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Loader from './components/Loader.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>\


    <Route 
    path='/'
    element ={
      <Suspense fallback={<Loader />}>
  
    </Suspense>
    }
    />
    



    
    
    </>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
