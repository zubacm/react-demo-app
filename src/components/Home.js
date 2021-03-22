import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from '../Sidebar'
import { Container } from 'react-bootstrap'


export default function Home() {
    const { currentUser, currentUserRoles } = useAuth()
 useEffect(() => {
     
 }, [])
    return (
        <>
        
        <div>
        <h1>Home page </h1>
            <br/>
            User: {currentUser.username}
            <br/>
            User role: {currentUser.roles}
        </div>
        
        </>
    )
}
