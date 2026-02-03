import { useState, useEffect } from "react";
import { getProductById } from "../utils/api/product";
import { useParams } from "react-router";

export const useProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    
    useEffect(() => {
        const getProductDetailHandler = async() => {
            setLoading(true)
            const result = await getProductById(id);
            if (result.success) {
                setProduct(result.data);
            } else {
                setError(true);
            }
    
            setLoading(false);
        }
        getProductDetailHandler();
    }, [id]);

    return { product, loading, error }
}