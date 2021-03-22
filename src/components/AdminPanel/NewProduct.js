import React, {useEffect, useState } from 'react'
import { useProducts } from '../../contexts/ProductsContext'
import { Form, Button, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

export default function NewProduct({product, showEdit, onSubmit}) {
    const { productsCategories, addProduct, refresh, updateProduct } = useProducts()
    const [id, setId] = useState()
    const [idValidation, setIdValidation]=useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [categoryValidation, setCategoryValidation]=useState('')
    const [name, setName] = useState('')
    const [nameValidation, setNameValidation]=useState('')
    const [price, setPrice] = useState('')
    const [priceValidation, setPriceValidation]=useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl]=useState('')

    useEffect(() => {
        if(product) {
            setId(product.id)
            setName(product.name)
            setPrice(product.price)
            setCategoryId(product.categoryId)
            setDescription(product.description)
            setImageUrl(product.imageUrl)
        }
    }, [])


    function handleSubmit(e) {
        e.preventDefault()

        setIdValidation('')
        setNameValidation('')
        setPriceValidation('')
        setCategoryValidation('')

        let valid = true
        if(id === undefined) {
            setIdValidation('Id can not be empty')
            valid = false
        }
        if(name.trim() === '') {
            setNameValidation('Name can not be empty')
            valid = false
        }
        else if(name.length < 3) {
            setNameValidation('Name must be longer then 3 characters')
            valid = false
        }

        if(price.trim()=== '') {
            setPriceValidation('You must define the price')
            valid = false
        }
        if(categoryId === 0) {
           setCategoryValidation('Category must be set')
           valid = false
        }

        if(valid) {
            if(showEdit) {
                updateProduct(id, name, price, description, imageUrl, categoryId)
                //setshowedit
                onSubmit();
                toast.success("Product modified")

            } else {
                addProduct({id, name, price, description, imageUrl, categoryId})                          
                setName('')
                setId('')
                setPrice('')
                setCategoryId('')
                setImageUrl('')
                setDescription('')
                setCategoryId(0)
                toast.success("Product added!");
            }
        }
    }

    return (
        <>
        <Form>
            <Form.Row>
                <Form.Group as={Col} className="col-xs-12">
                    <Form.Label>Id</Form.Label>
                    {showEdit ?
                            <Form.Control disabled 
                            type="number" placeholder="Id" value={id} onChange={e => setId(Number(e.target.value))} />
                            :
                            <Form.Control  
                            type="number" placeholder="Id" value={id} onChange={e => setId(Number(e.target.value))} />
                        }
                        {idValidation !== '' && <span className="text-danger">{idValidation}</span>}
                    </Form.Group>
                <Form.Group as={Col} className="col-xs-12">
                    <Form.Label>name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                    {nameValidation !== '' && <span className="text-danger">{nameValidation}</span>}
                </Form.Group>

                <Form.Group as={Col} className="col-xs-12">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price"  value={price} onChange={e=> setPrice(e.target.value)} />
                    {priceValidation !== '' && <span className="text-danger">{priceValidation}</span>}
                    </Form.Group>
            </Form.Row>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control placeholder="Image Url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" value={categoryId}  onChange={e => setCategoryId(e.target.value)}>
                    <option value={0} disabled>Choose...</option>
                    {
                        productsCategories.map(prCat => <option value={prCat.id}>{prCat.category}</option>)
                    }
                </Form.Control>
                {categoryValidation !== '' && <span className="text-danger">{categoryValidation}</span>}
                </Form.Group>

            </Form.Row>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
        <ToastContainer />
        </>
    )
}
