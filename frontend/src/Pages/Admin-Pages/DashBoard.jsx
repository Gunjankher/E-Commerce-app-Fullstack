import React from 'react'


import AdminSideBar from '../components/AdminSideBar'
import Input from "../components/Input"
import Widget from '../components/Widget'
import CategoryItem from '../components/CategoryItem'
import data from '../assets/data.json'
import { BarChart,DoughnutChart } from '../components/Chart'
import DashBoardTable from '../components/DashBoardTable'

import userImg from "../assets/profile.jpg"
import { FaRegBell } from "react-icons/fa"
import { BsSearch } from "react-icons/bs"
import { BiMaleFemale } from "react-icons/bi"

function DashBoard() {
  const userImg = "img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"

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
          <img src={userImg} alt="" />
          <FaRegBell />

        </div>


        <section className='WidgetContainer'>

          <Widget
            heading="Revenue"
            value={1000000}
            percent={30}
            color="blue"
            amount={500}

          />
          <Widget
            heading="Revenue"
            value={1000}
            percent={-30}
            color="aquamarine"
            amount={false}

          />
          <Widget
            heading="Revenue"
            value={1000}
            percent={30}
            color="orange"
          //  amount={500}

          />
          <Widget
            heading="Revenue"
            value={100000}
            percent={30}
            color="purple"
          //  amount={500}

          />


        </section>



        <section className='graph-container'>
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_1={[300, 144, 433, 655, 237, 755, 190]}
              data_2={[200, 444, 553, 675, 127, 345, 490]}
              title_1='revenue'
              title_2='Transaction'
              bgColor_1='rgb(0,115,255)'
              bgColor_2='rgba(53,162,235,0.8)'

            />



          </div>





          <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
              {data.categories.map((i) => (
                <CategoryItem
                  key={i.heading}
                  heading={i.heading}
                  value={i.value}
                  color={`hsl(${i.value * 4},${i.value}%,50%)`}
                />
              ))}
            </div>
          </div>



        </section>



        <section className='transation-container'>

          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            {/* chart */}
            <DoughnutChart 
            labels={['female,male']}
            data={[12,19]}
            backgroundColor={['hsl(340,82%,56%)','rgba(53,162,235,0.8)']}
            cutout={90}
            />
<p>
  <BiMaleFemale/>
   </p>
          </div>

          {/* Table */}
          <DashBoardTable data={data.transaction}  />






        </section>



      </main>

    </div>
  )
}

export default DashBoard 