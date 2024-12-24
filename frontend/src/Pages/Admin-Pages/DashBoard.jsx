 
import React from 'react'
import CategoryItem from "../../components/Admin-components/CategoryItem"
import { BarChart, DoughnutChart } from "../../components/Admin-components/Chart"
import DashBoardTable from "../../components/Admin-components/DashBoardTable"
import Input from "../../components/Admin-components/Input"
import Widget from "../../components/Admin-components/Widget"
import AdminSideBar from './../../components/Admin-components/AdminSideBar'
import { BiMaleFemale } from "react-icons/bi"
import { BsSearch } from "react-icons/bs"
import { FaRegBell } from "react-icons/fa"
import { useSelector } from 'react-redux'
import { useStatsQuery } from '../../redux/api/dashBoardApi'
import { Navigate } from 'react-router-dom'
import {getLastMonths} from '../../utilis/feature'




const userImg = "img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
const { last6Months:months } = getLastMonths();

function DashBoard() {

  const { user } = useSelector((state) => state.userReducer);

  const { isLoading, data, isError } = useStatsQuery(user?._id);


const stats = data?.data
console.log(`stats`, stats);
console.log(`stats transction`, stats?.chart?.transactions);


  return (
    <div className='adminContainer'>
      <AdminSideBar />
      <main className='dashboard'>


        <div className='bar'>
          <BsSearch />
          <Input
            type="text"
            placeholder="Search for data,users,docs"
          />
          <FaRegBell />
          <img src={user?.photo || userImg} alt="User" />

        </div>


        <section className='WidgetContainer'>

          <Widget
            heading="Revenue"
            value={stats?.count?.revenue}
            percent={stats?.ChangePercent?.revenue}
            color="rgb(0, 115, 255)"
            amount={true}

          />
          <Widget
           percent={stats?.ChangePercent?.user}
           value={stats?.count?.user}
           color="rgb(0 198 202)"
           heading="Users"

          />
          <Widget
            percent={stats?.ChangePercent?.order}
            value={stats?.count?.order}
            color="rgb(255 196 0)"
            heading="Transactions"

          />
          <Widget
            percent={stats?.ChangePercent?.product}
            value={stats?.count?.product}
            color="rgb(76 0 255)"
            heading="Products"

          />


        </section>



        <section className='graph-container'>
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
               labels={months}
               data_1={stats?.chart?.revenue}
               data_2={stats?.chart?.order}
              title_1='revenue'
              title_2='Transaction'
              bgColor_1='rgb(0,115,255)'
              bgColor_2='rgba(53,162,235,0.8)'

            />



          </div>





          <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
            {stats?.categoryCount?.map((i) => {
                    const [heading, value] = Object.entries(i)[0];
                    return (
                      <CategoryItem
                        key={heading}
                        value={value}
                        heading={heading}
                        color={`hsl(${value * 4}, ${value}%, 50%)`}
                      />
                    );
                  })}
            </div>
          </div>



        </section>



        <section className='transation-container'>
        <div className="gender-chart">
                <h2>Gender Ratio</h2>
                <DoughnutChart
                  labels={["Female","Male"]}
                  data={[stats?.chart?.userRatio?.female, stats?.Chart?.userRatio?.male]}
                  backgroundColor={[
                    "hsl(340, 82%, 56%)",
                    "rgba(25, 162, 235, 0.8)",
                  ]}
                  cutout={90}
                />
              </div>
                <p>
                  <BiMaleFemale />
                </p>
        
          {/* Table */}
          {stats?.chart?.transactions && (
  <DashBoardTable data={stats?.chart?.transactions}  />
)}




        </section>



      </main>

    </div>
  )
}

export default DashBoard 