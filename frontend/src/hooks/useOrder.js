import { useState, useEffect } from "react";
import { getOrdersUsers } from "../utils/api/orders";
export const useOrderUser = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getOrdersHandler = async() => {
        setLoading(true);
        const orders = await getOrdersUsers();
        if (orders.success) {
            setOrders(orders.data);
        } else {
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        getOrdersHandler();
    }, []);

    return { orders, loading, error };
}