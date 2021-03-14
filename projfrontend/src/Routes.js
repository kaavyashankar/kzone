// eslint-disable-next-line no-unused-vars
import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom";

import PrivateRoutes from "./auth/helper/PrivateRoutes";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Cart from "./core/Cart";


import UserDashboard from "./user/UserDashboard";


const Routes =  () => {
    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/cart" exact component={Cart} />

            <PrivateRoutes path ="/user/dashboard" exact component={UserDashboard} />
           
            
        </Switch>
        </BrowserRouter>
    )
};

export default Routes;
