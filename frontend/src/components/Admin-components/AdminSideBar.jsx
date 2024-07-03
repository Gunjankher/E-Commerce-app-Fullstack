import React, { useState,useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { RiDashboardFill,RiShoppingBag3Fill,RiCoupon3Fill} from 'react-icons/ri';
import {AiFillFileText} from 'react-icons/ai'
import {IoIosPeople} from 'react-icons/io'
import {FaChartBar,FaChartLine,FaChartPie,FaStopwatch,FaGamepad} from 'react-icons/fa'
import { HiMenuAlt4 } from 'react-icons/hi';


function AdminSideBar() {
    const location = useLocation();

const [showModel,setShowModel] = useState(false)
const [phoneActive ,setPhoneActive] = useState(window.innerWidth<1100)




const dashItems = [
    {
            icon: <RiDashboardFill />,
            name: "Dashboard",
            path: "/admin/dashboard",
        },
        {
            icon: <RiShoppingBag3Fill />,
            name: "Products",
            path: "/admin/products",
        },
        {
            icon: <AiFillFileText />,
            name: "Customer",
            path: "/admin/customer",
        },
        {
            icon: <IoIosPeople />,
            name: "Transaction",
            path: "/admin/transaction",
        },
    ];
    const chartItems = [
        {
            icon: <FaChartBar />,
            name: "Bar",
            path: "/admin/chart/bar",
        },
        {
            icon: <FaChartPie />,
            name: "Pie",
            path: "/admin/chart/pie"
        },
        {
            icon: <FaChartLine />,
            name: "Line",
            path: "/admin/chart/line",
        },
        
    ];
    
    const appItems = [
        {
            icon: <FaStopwatch />,
            name: "Stopwatch",
            path: "/admin/apps/stopwatch",
        },
        {
            icon: <RiCoupon3Fill />,
            name: "Coupon",
            path: "/admin/apps/coupon",
        },
        {
            icon: <FaGamepad />,
            name: "Toss",
            path: "/admin/apps/toss",
        },
       
    ];

    const resizeHandler = () => {
        setPhoneActive(window.innerWidth < 1100);
      };
    

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
    
        return () => {
          window.removeEventListener('resize', resizeHandler);
        };
      }, []);

    return (

        <>
{
    phoneActive && (
        <button id='hamburger' onClick={()=> setShowModel(true)}>
<HiMenuAlt4 />
        </button>
    )
}

        <aside
         style={
            phoneActive
              ? {
                  width: '20rem',
                  height: '100vh',
                  position: 'fixed',
                  top: 0,
                  left: showModel ? '0' : '-20rem',
                  transition: 'all 0.5s',
                }
              : {}
            }
        >
            <h2>Logo</h2>
            <div>


                <h5>Dashboard</h5>
                <ul>
                    {dashItems.map((item, index) => (
                        <li
                        key={index}
                        style={{
                            backgroundColor : location.pathname.includes(item.path)
                            ? "rgba(0,115,255,0.1)"
                            : "white"
                        }}
                        >
                            <Link to={item.path}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>


                <h5>Chart</h5>
                <ul>
                    {chartItems.map((item, index) => (
                        <li
                        key={index}
                        style={{
                            backgroundColor : location.pathname.includes(item.path)
                            ? "rgba(0,115,255,0.1)"
                            : "white"
                        }}
                        >
                            <Link to={item.path}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                

                <h5>Apps</h5>
                <ul>
                    {appItems.map((item, index) => (
                        <li
                        key={index}
                        style={{
                            backgroundColor : location.pathname.includes(item.path)
                            ? "rgba(0,115,255,0.1)"
                            : "white"
                        }}
                        >
                            <Link to={item.path}>
                                {item.icon}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>


            </div>

            {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModel(false)}>
            Close
          </button>
        )}
        </aside>

        
                    </>
    );
}

export default AdminSideBar;
