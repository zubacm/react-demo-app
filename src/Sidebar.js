import React from 'react'
// import { Tab, Button, Modal } from "react-bootstrap";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from './contexts/AuthContext';

export default function Sidebar() {
    const { logout, currentUser, checkIfUserHasRole } = useAuth()
    const selected = window.location.pathname
    const  history  = useHistory()
    
    return (
        <SideNav className="sidebar"
    onSelect={(selected) => {
        switch(selected) {
            case '/logout': {
                console.log('log')
                logout()
                break;
            }
            default: {
                console.log('default')
                history.push(selected)
            }
                
        }
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected={selected}>
   
        <NavItem eventKey="/">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>         
            <NavText>
            <Link to="/"  className="no-decoration">
                Home
            </Link>
            </NavText>          
        </NavItem>
        <NavItem eventKey="/products">           
            <NavIcon> 
                <i className="fa fa-fw fa-cube" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Products
            </NavText>
            <NavItem eventKey="/products">
                <NavText>
                    All Products
                </NavText>
            </NavItem>    
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
        </NavItem>
        { (currentUser && checkIfUserHasRole("Admin")) &&
        <NavItem eventKey="/admin-panel">
            <NavIcon>
                <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                 Admin Panel
            </NavText>
        </NavItem> 
        }

        <NavItem eventKey="/logout">
            <NavIcon>
                <i className="fa fa-fw fa-sign-out" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Logout
            </NavText>
        </NavItem>

    </SideNav.Nav>
</SideNav>

    )
}
