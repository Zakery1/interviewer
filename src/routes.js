import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Dashboard from './Component/Dashboard/Dashboard';

export default function routes(){
    return <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path='/Register' component={Register}/> 
            <Route path='/Login' component={Login}/>
        </Switch>
}


