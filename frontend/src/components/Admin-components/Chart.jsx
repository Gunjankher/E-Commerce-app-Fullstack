import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler
} from 'chart.js';
import { Bar,Doughnut,Pie,Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export const BarChart =({
data_1 =[],
data_2 = [],
title_1,
title_2,
bgColor_1,
bgColor_2, 
horizontal = false,
lables = "months"

})=> {

     const options = {
        responsive: true,
        indexAxis : horizontal ? "y":"x",
         
        plugins: {
          legend: {
            position: 'top',
            display : false,
           
            
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',

          },
        },

        scales :{
            y:{
                beginAtZero : true,
                grid:{
                    display : false
                },
            },
            x:{
              
                grid:{
                    display : false
                },
            },
        }


      };
      
      
       const data = {
        labels,
        datasets: [
          {
            label: title_1,
            data: data_1,
            backgroundColor : bgColor_1,
            barThickness:"flex",
            barPercentage : 1,
            categoryPercentage:0.4,
            
          },
          {
            label: title_2,
            data: data_2,
                backgroundColor :bgColor_2,
                barThickness:"flex",
                barPercentage : 1,
                categoryPercentage:0.4,
          },
        ],
      };
      


  return <Bar width={horizontal ?" 200%" : ""} options={options} data={data} />;
}



// import { ChartData, ChartOptions } from 'chart.js'; 

// Define the DoughnutChart component
export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}) => {
  // Define the data for the doughnut chart
  const doughnutData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  // Define the options for the doughnut chart
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: 'bottom',
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  // Render the Doughnut chart
  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

export const PieChart = ({ labels, data, backgroundColor, offset }) => {
  const pieChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const LineChart = ({ data, label, backgroundColor, borderColor, labels = months }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartData = {
    labels,
    datasets: [
      {
        fill: true,
        label,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };

  return <Line options={options} data={lineChartData} />;
};