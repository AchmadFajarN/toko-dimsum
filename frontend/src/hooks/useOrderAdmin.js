import { useState, useEffect } from "react";

export const useOrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOrderForAdmin = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const response = await fetch("http://localhost:4000/orders", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      setOrders(result.data);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getOrderForAdmin();
  }, []);

  return { orders, error, loading };
};
