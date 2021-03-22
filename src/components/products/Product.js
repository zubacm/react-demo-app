import React, { useState } from 'react'
import { Card, Button, Modal, Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import '../../assets/styles/product.css'
import NewProduct from "../AdminPanel/NewProduct"
import DeleteModal from './DeleteModal';
import { ToastContainer, toast } from 'react-toastify';
import { useProducts } from '../../contexts/ProductsContext'

export default function Product({product}) {
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const { deleteProduct } = useProducts()

    const onDelete = () => {
        deleteProduct(product.id)
        setShowDelete(false)
        toast.success("Product deleted")
    }

    return (
        <>
        <Card className="text-center overflow" className="card">
            <div className="overflow">
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body className="text-dark">
                <Card.Title>
                    {product.name}
                    <span className="float-right text-success">{product.price}</span>
                </Card.Title>
                <Card.Text className="text-secondary">
                    {product.description}
                </Card.Text>
                <Button type="button" variant="outline-success">Add to Cart</Button>
                <span className="float-right">
                <i className='fa fa-2x fa-pencil-square-o text-primary' onClick={() => setShowEdit(!showEdit)}></i>&nbsp;&nbsp;
                <i className="fa fa-2x fa-trash-o text-danger" onClick={() => setShowDelete(!showDelete)} aria-hidden="true"></i>
                </span>
            </Card.Body>
            </div>
        </Card>
        {showEdit && 
            <>
            <Modal show={showEdit} onHide={() => {setShowEdit(false)}} >
                    {
                        <Container style={{padding:"40px"}}>
                        <div style={{position:"absolute", top: "10px", right:"10px"}}>
                            <i onClick={() => {setShowEdit(false)}} 
                            style={{cursor:"pointer"}} class="fa fa-2x fa-times float-right " aria-hidden="true"></i>
                        </div>
                         <NewProduct product={product} onSubmit={() => {setShowEdit(false)}} showEdit={showEdit} /> 
                        </Container>
                    }
            </Modal>
            </>
        }
        {showDelete && 
            <Modal show={showDelete} onHide={() => {setShowDelete(false)}}>
                <Container style={{padding:"40px"}}>
                    <div style={{position:"absolute", top: "10px", right:"10px"}}>
                        <i onClick={() => {setShowDelete(false)}} 
                        style={{cursor:"pointer"}} class="fa fa-2x fa-times float-right " aria-hidden="true"></i>
                    </div>
                    <DeleteModal onDelete={onDelete} onCancel={() => {setShowDelete(false)}} />
                    </Container>
            </Modal>
        }
                <ToastContainer />
        </>
    )
}
