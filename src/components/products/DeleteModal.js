import React from 'react'
import { Form, Button, Col } from "react-bootstrap";

export default function DeleteModal({onCancel, onDelete}) {
    return (
        <Form>
            <Form.Row>
                <h4>Are you sure you want do delete this product?</h4>
            </Form.Row>
            <br/>
            <Form.Row>
            <Col md={6}>
            <Button onClick={onDelete} 
                variant="warning" type="button" className="text-white" style={{width:"100%"}} >
                Delete
            </Button>
            </Col>
            <Col md={6}>
            <Button onClick={onCancel} 
            variant="danger" type="button" style={{width:"100%"}} >
                Cancel
            </Button>
            </Col>
            </Form.Row>
        </Form>
    )
}
