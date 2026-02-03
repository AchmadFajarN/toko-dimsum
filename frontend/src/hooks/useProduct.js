import { useState, useEffect } from "react";
import { getProducts } from "../utils/api/product";

export const useProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const getProductsHandler = async() => {
        setLoading(true);
        const products = await getProducts();
        if (products.success) {
            setProducts(products.data)
            setLoading(false);
        } else {
            setError(products.message);
            setLoading(false);
        }
        
    }

    useEffect(() => {
        getProductsHandler();
    }, []);

    return {
        products, loading, error
    }
}
