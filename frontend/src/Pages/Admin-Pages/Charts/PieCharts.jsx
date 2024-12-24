import React from 'react'


import AdminSideBar from '../../../components/Admin-components/AdminSideBar'
import { PieChart,DoughnutChart } from "../../../components/Admin-components/Chart";
import {categories} from '../../../assets/data.json'
import { useSelector } from 'react-redux';
import { usePieQuery } from '../../../redux/api/dashBoardApi';



const PieCharts= () => {

  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data, isError } = usePieQuery(user?._id);

console.log(`pie data`, data);


const order = data?.data?.orderFullfillment;
const categories = data?.data?.productCategories;
const stock = data?.data?.stockAvailablity;
const revenue = data?.data?.revenueDistribution;
const ageGroup = data?.data?.usersAgeGroup;
const adminCustomer = data?.data?.adminCustomer;



    return (
        <div className="adminContainer">
          <AdminSideBar />
          <main className="chartContainer">
            <h1>Pie & Doughnut Charts</h1>
            <section>
              <div>
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[order?.processing, order?.shipped, order?.delivered]}
                  backgroundColor={[
                    `hsl(110,80%, 80%)`,
                    `hsl(110,80%, 50%)`,
                    `hsl(110,40%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Order Fulfillment Ratio</h2>
            </section>
    
            <section>
              <div>
                <DoughnutChart
                  labels={categories?.map((i) => i.heading)}
                  data={categories?.map((i) => i.value)}
                  backgroundColor={categories?.map(
                    (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
                  )}
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
              </div>
              <h2>Product Categories Ratio</h2>
            </section>
    
            <section>
              <div>
                <DoughnutChart
                  labels={["In Stock", "Out Of Stock"]}
                  data={[stock?.inStock,stock?.outOfStock]}
                  backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                  legends={false}
                  offset={[0, 80]}
                  cutout={"70%"}
                />
              </div>
              <h2>Stock Availability</h2>
            </section>
            <section>
              <div>
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenue?.marketingCost,
                    revenue?.discount,
                    revenue?.burnt,
                    revenue?.productionCost,
                    revenue?.netMargin,

                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
              </div>
              <h2>Revenue Distribution</h2>
            </section>
    
            <section>
              <div>
                <PieChart
                  labels={[
                    "Teenager(Below 20)",
                    "Adult (20-40)",
                    "Older (above 40)",
                  ]}
                  data={[ageGroup?.teen, ageGroup?.adult, ageGroup?.old]}
                  backgroundColor={[
                    `hsl(10, ${80}%, 80%)`,
                    `hsl(10, ${80}%, 50%)`,
                    `hsl(10, ${40}%, 50%)`,
                  ]}
                  offset={[0, 0, 50]}
                />
              </div>
              <h2>Users Age Group</h2>
            </section>
    
            <section>
              <div>
                <DoughnutChart
                  labels={["Admin", "Customers"]}
                  data={[adminCustomer?.admin, adminCustomer?.customer]}
                  backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                  offset={[0, 80]}
                />
              </div>
            </section>
          </main>
        </div>
      );
};

export default PieCharts