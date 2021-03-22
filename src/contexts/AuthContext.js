import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {     
        async function setUser(id) { 
            const res = await fetch(`http://localhost:5000/users/${id}`)
                const data = await res.json();
                setCurrentUser(data)
                setLoading(false)
        }
        var id = localStorage.getItem('userid')
        if(id) {
            setUser(id)
        } else {
            setLoading(false)
        }
            
    }, [])
    
    async function login(username, password) {
        const user = await fetchUser(username, password);
        setCurrentUser(user[0])
        console.log(currentUser)
        localStorage.setItem('userid', currentUser.id)
    }

    function logout() {
        //history.push('login')
        setCurrentUser()
        localStorage.removeItem('userid')
        console.log(history)
        history.push('/login')
    }

    const fetchUser = async (username, password) => {
        const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`)
        const data = await res.json();

        return data;
    }

    function checkIfUserHasRole(role) {
        if(currentUser.roles) {
            return  currentUser.roles.includes(role)
        }
        return false     
    }


    const value = {
        currentUser,
        login,
        logout, //check
        checkIfUserHasRole
    }
 
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
