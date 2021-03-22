import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'

const ProductsContext = React.createContext()

export function useProducts() {
    return useContext(ProductsContext)
}

export function ProductsProvider({children}) {
    const [productsCategories, setProductsCategories] = useState([])
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true)//has more
    const [isFetchingProducts, setIsFetchingProducts] = useState(false);
	const [productsPage, setProductsPage] = useState(1);
    const porductsLimit = 15

   
    const [loading, setLoading] = useState(true)
    const [loadingCategories, setLoadingCategories] = useState(true)
    const [refresh, setRefresh] = useState(0)

    const [query, setQuery] = useState('')

    useEffect(() => {
        const getProductsCategories = async () => {
            const productsCatFromSerer = await fetchProductsCategories();
            setProductsCategories(productsCatFromSerer)
            setLoadingCategories(false)
        };
        getProductsCategories(); 
    }, [])



    useEffect(() => {
        console.log('refreš')
        const getProducts = async () => {
            const productsFromServer = await fetchProducts(1);
            // setProductsPage(productsPage+1)
            setProductsPage(2)
            setProducts( () => {
                return [...productsFromServer]
            })
            setHasMore(productsFromServer.length>0)
            setLoading(false)
        };
        
        getProducts()
    }, [query, refresh])


    useEffect(() => {
		if (!isFetchingProducts) return;
		fetchMoreProductItems();
	}, [isFetchingProducts]);

	const fetchMoreProductItems = () => {
		const getProducts = async () => {
            const productsFromServer = await fetchProducts(productsPage);
            setProductsPage(productsPage+1)
            setProducts( () => {
                setHasMore(productsFromServer.length>0)
                //setHasMore(false)
                return [...products, ...productsFromServer]
            })
        };

        getProducts()
		setIsFetchingProducts(false);
	};

    const fetchProductsCategories = async () => {
        const res = await fetch('http://localhost:5000/products-categories')
        const data = await res.json();

        return data;
    }

    const fetchProducts = async (prPage) => {
        let getQuery = `http://localhost:5000/products?_page=${prPage}&_limit=${porductsLimit}`;
        if(query !== '')
          getQuery = `http://localhost:5000/products?name=${query}&_page=${prPage}&_limit=${porductsLimit}`
        const res = await fetch(getQuery)
        const data = await res.json();
        console.log(data)
        return data;
    }

    const addProduct = async(product) => {
        console.log(product);
        const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
             body: JSON.stringify(product)
        });

        const data = res.json();

         setRefresh(prev => prev + 1);
    }

    const deleteProduct = async (id) => {
        console.log('deleted '+id);
        await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        });

        setProducts(products.filter((product) => product.id !== id));
    }

    const updateProduct = async (id, name, price, description, imageUrl, categoryId ) => {
        const productToChange = await fetchProduct(id);
        const updProduct = {...productToChange, name: name, price: price, description: description, imageUrl: imageUrl, categoryId: categoryId }

        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updProduct)
        });
        console.log(res);

        const data = await res.json();

        setProducts(products.map((product) => 
        product.id === id ? {...product, name: name, description: description, price: price, imageUrl: imageUrl, categoryId: categoryId} : product));
    }

    const fetchProduct = async (id) => {
        const res = await fetch(`http://localhost:5000/products/${id}`)
        const data = await res.json();

        return data;
    }

    const value = {
        products,
        productsCategories,
        isFetchingProducts,
        setIsFetchingProducts,
        hasMore,
        setQuery,
        addProduct,
        refresh: setRefresh,
        updateProduct,
        deleteProduct
    }

    return (
        <ProductsContext.Provider value={value}>
            { (!loading && !loadingCategories) && children }
        </ProductsContext.Provider>
    )
}
