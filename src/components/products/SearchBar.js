import React from 'react'
import { Form } from 'react-bootstrap'

export default function SearchBar({search}) {
    return (
        <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Search" onChange={(e) => {search(e.target.value)}} />
            <Form.Text className="text-muted">
                Search for products.
            </Form.Text>
        </Form.Group>
    </Form>
    )
}
