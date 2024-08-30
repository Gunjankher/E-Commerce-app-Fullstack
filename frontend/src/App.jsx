 // App.jsx
import React, { useEffect, useState, Suspense, lazy } from 'react';
// import { Outlet, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userApi';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/Protected-Route.jsx';
import { Toaster } from 'react-hot-toast';



// Admin Pages
const DashBoard = lazy(() => import('./Pages/Admin-Pages/DashBoard.jsx'));
const Transcation = lazy(() => import('./Pages/Admin-Pages/Transcation.jsx'));
const Products = lazy(() => import('./Pages/Admin-Pages/Products.jsx'));
const Customers = lazy(() => import('./Pages/Admin-Pages/Customers.jsx'));
const NewProduct = lazy(() => import('./Pages/Admin-Pages/management/NewProduct.jsx'));
const ProductMangement = lazy(() => import('./Pages/Admin-Pages/management/ProductMangement.jsx'));
const TransactionManagement = lazy(() => import('./Pages/Admin-Pages/management/TransactionManagement.jsx'));
const BarCharts = lazy(() => import('./Pages/Admin-Pages/Charts/BarCharts'));
const LineCharts = lazy(() => import('./Pages/Admin-Pages/Charts/LineChart.jsx'));
const PieCharts = lazy(() => import('./Pages/Admin-Pages/Charts/PieCharts.jsx'));
const Coupon = lazy(() => import('./Pages/Admin-Pages/apps/Coupon.jsx'));
const StopWatch = lazy(() => import('./Pages/Admin-Pages/apps/StopWatch'));
const Toss = lazy(() => import('./Pages/Admin-Pages/apps/Toss'));

// User Pages
const Home = lazy(() => import('./Pages/Home.jsx'));
const Cart = lazy(() => import('./Pages/Cart.jsx'));
const Search = lazy(() => import('./Pages/Search.jsx'));
const Shipping = lazy(() => import('./Pages/Shipping.jsx'));
const Login = lazy(() => import('./Pages/Login.jsx'));
const Orders = lazy(() => import('./Pages/Orders.jsx'));



function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getUser(user.uid);
        // console.log('getUser response:', response);

        if (response && response.data) {
          const dispatchedData = dispatch(userExist(response.data));
          // console.log('Dispatched data:', dispatchedData);
        } else {
          console.error('Invalid user data structure:', response);
        }
      } else {
        dispatch(userNotExist());
        console.log('logged out');
      }
    });
  }, [dispatch]);


  return (
    loading ? (
      <Loader />
    ) : (
      <Router>
        <Header user={user} />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductMangement />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={!user}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              element={<ProtectedRoute isAuthenticated={!!user} />}
            >
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/orders" element={<Orders />} />
              {/* <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/pay" element={<Checkout />} /> */}
            </Route>
            <Route
              element={
                <ProtectedRoute
                  isAuthenticated={!!user}
                  adminOnly={true}
                  admin={user?.role === "admin"}
                />
              }
            >
              <Route path="/admin/dashboard" element={<DashBoard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/customers" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transcation />} />
              {/* <Route path="/admin/discount" element={<Discount />} /> */}
              <Route path="/admin/chart/bar" element={<BarCharts />} />
              <Route path="/admin/chart/pie" element={<PieCharts />} />
              <Route path="/admin/chart/line" element={<LineCharts />} />
              <Route path="/admin/apps/coupon" element={<Coupon />} />
              <Route path="/admin/apps/stopwatch" element={<StopWatch/>} />
              <Route path="/admin/apps/toss" element={<Toss />} />
              <Route path="/admin/product/new" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<ProductMangement />} />
              <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
              {/* <Route path="/admin/discount/new" element={<NewDiscount />} />
              <Route path="/admin/discount/:id" element={<DiscountManagement />} /> */}
            </Route>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
        {/* <Footer /> */}
        <Toaster position="bottom-center" />
      </Router>
    )
  );
  

}


export default App;
