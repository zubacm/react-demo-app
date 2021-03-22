import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Redirect } from 'react-router-dom';
import Login from './Signup/Login';


export default function PrivateRoute({component: Component, roles, hideSidebar, ...rest}) {
    const {currentUser } = useAuth()

    function arraysHaveCommonElements(arr1, arr2) { 
        return arr1.some(item => arr2.includes(item)) 
    } 

    return (
        <Route
        {...rest}
        render = {props => {
            if(!currentUser) {
                hideSidebar(true)
                return  <Login {...props} />
            }
            //check if route is restricted by role
            if(roles && (!arraysHaveCommonElements(roles, currentUser.roles))) {
                console.log('not -auth')
                hideSidebar(true)
                 return <Redirect to = {{ pathname: '/not-authorised'}}/>
            }
            hideSidebar(false)
            return <Component {...props}/>
        }}
        >

        </Route>
    )
}
