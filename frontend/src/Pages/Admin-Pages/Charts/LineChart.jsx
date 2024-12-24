import React from 'react'

import AdminSideBar from "../../../components/Admin-components/AdminSideBar"
import { LineChart } from "../../../components/Admin-components/Chart";
import {getLastMonths} from "../../../utilis/feature"
import { useSelector } from 'react-redux';
import { useLineQuery } from '../../../redux/api/dashBoardApi';
import toast from 'react-hot-toast';





const { last12Months:months } = getLastMonths();



const LineCharts = () => {
  const { user } = useSelector((state) => state.userReducer);
  
    const { isLoading, data, error, isError } = useLineQuery(user?._id);

    const products = data?.data?.products || [];
    const users = data?.data?.users || [];
    const revenue = data?.data?.revenue || [];
    const discount = data?.data?.discount || [];

    
    if (isError) {
toast.error(`Something Went Wrong`)
    }
  


  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main className="chartContainer">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={users}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={months}
          />
          <h2>Active Users</h2>
        </section>
        <section>
          <LineChart
            data={products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>

        <section>
          <LineChart
            data={discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;