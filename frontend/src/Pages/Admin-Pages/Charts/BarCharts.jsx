import React from 'react'

import AdminSideBar from './../../../components/Admin-components/AdminSideBar'
import { BarChart } from "../../../components/Admin-components/Chart";
import {getLastMonths} from '../../../utilis/feature'
import { useSelector } from 'react-redux';
import { useBarQuery } from '../../../redux/api/dashBoardApi'
import toast from 'react-hot-toast';

 const months = []

const {last12Months,last6Months} = getLastMonths()



const BarCharts= () => {
  const { user } = useSelector((state) => state.userReducer);

const {isLoading,data,isError} = useBarQuery(user?._id)

console.log(`data log`, data);

const products = data?.data?.products || []
const orders =   data?.data?.orders || []
const users = data?.data?.users || []

if(isError){
  toast.error(`something went wrong`)
}


  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main className="chartContainer">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_1={products}
            data_2={users}
            lables= {last6Months}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
          <h2>Top Selling Products & Top Customers</h2>
        </section>
        <section>
          <BarChart
            horizontal={true}
            data_1={orders}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels = {last12Months}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts