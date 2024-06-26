import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./route/Root";
import TicketQuery from "./component/TicketQuery";
import UserTickerList from "./component/UserTicketList";
import TrainList from "./component/TrainList";
import TicketPurchase from "./component/TicketPurchase";
import Home from "./route/Home";
import UserTicketListPage from "./route/UserTicketListPage";
import TicketPurchasePage from "./route/TicketPurchasePage";
import TicketCard from "./component/TicketCard";
import UserLoginPage from './route/UserLoginPage';
import UserRegisterInitPage from './route/UserRegisterInitPage';
import UserRegisterCompletePage from './route/UserRegisterCompletePage';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children:[
            {
                index:true,
                element:<Home/>,
            },
            {
                path:"user",
                element:<UserTicketListPage/>
            },{
                path:"train",
                element:<TrainList/>
            },{
                path:"purchase",
                element:<TicketPurchasePage/>
            },{
                path:"ticket",
                element: <TicketCard/>
            },{
                path:"login",
                element:<UserLoginPage/>
            },{
                path:"register/init",
                element:<UserRegisterInitPage/>
            },{
                path:"register/complete",
                element:<UserRegisterCompletePage/>
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
