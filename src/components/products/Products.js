import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useProducts } from '../../contexts/ProductsContext'
import Product from './Product'
import { Container, Row, Col } from 'react-bootstrap'
import SearchBar from "./SearchBar";

export default function Products() {
    const { products, isFetchingProducts, setIsFetchingProducts, hasMore, setQuery } = useProducts()
    const observer = useRef()



    const lastElementRef = useCallback(node => {
       if(isFetchingProducts) return
       if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore) {
                setIsFetchingProducts(true)   
                console.log('visible')  
            }
                 
        })
        if(node) observer.current.observe(node)
   }, [hasMore])


    return (
        <div>
            <Container fluid className="d-flex justify-content-center">
                <Row>
                <Col md={12}></Col>
                <br/>
                <Col md={12}><SearchBar search={setQuery} /></Col>
                    
                    {products.map((product, index) => (                   
                    <>   
                       {products.length === index +1 ? 
                        <Col md={4} ref={lastElementRef}><Product key={product.id}  product = {product} /></Col> 
                       : <Col md={4}><Product key={product.id} product = {product} /></Col>}      
                    </>
                    ))}
                      {hasMore && <h1>Fetching more list items...</h1>}            
                </Row>
                
            </Container>
        </div>
    )
}