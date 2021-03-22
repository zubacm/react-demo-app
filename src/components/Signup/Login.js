import React, { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom";
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'

export default function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            let res = await login(usernameRef.current.value, passwordRef.current.value)
            console.log('rezultat')
            console.log(res)
            history.push("/")
        } catch (error) {
            console.log('error')
            setError('Failed to log in')
        }
        console.log('ok')
        setLoading(false)
    }

    return (
        <>
        <Container className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "100vh" }}>
         <div className="w-100" style={{ maxWidth: '400px'}}>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" required ref={usernameRef}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required ref={passwordRef}/>
                    </Form.Group>
                    <Button disabled={loading}
                     className="w-100" type="submit">Log In</Button>
                </Form>
                {/* <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div> */}
            </Card.Body>
        </Card>
        </div> 
        </Container>
        {/* <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div> */}
        </>
    )
}
