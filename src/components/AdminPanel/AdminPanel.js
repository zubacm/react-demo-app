import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import NewProduct from './NewProduct';

export default function AdminPanel() {

    const [showNewProduct, setShowNewProduct] = useState(false)


    return (
        <div>
            <br></br>
            <Button variant={showNewProduct ? "outline-danger" : "outline-success"} onClick={() => setShowNewProduct(!showNewProduct)}>{showNewProduct ? 'Cancel' : 'Add New Product'}</Button>
            <br></br><br></br>
            {showNewProduct && <NewProduct />}  
        </div>
    )
}
