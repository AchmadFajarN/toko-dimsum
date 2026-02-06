import { useState } from "react";
import { checkout } from "../utils/api/orders";
import { useNavigate } from "react-router";

export const useCheckout = () => {
  const navigate = useNavigate();  
  const [qnty, setQnty] = useState(1);
  const [errMessage, setErrMessage] = useState("");

  const increaseQnty = () => {
    setQnty((prev) => prev + 1);
  };

  const decreaseQnty = () => {
    if (qnty > 1) {
      setQnty((prev) => prev - 1);
    }
  };

  const handleCheckout = async (productId) => {
    const data = {
      items: [
        {
          product_id: productId,
          quantity: qnty,
        },
      ],
    };

    const result = await checkout(data);
    console.log(result);
    if (result.success) {
        navigate('/')
    } else {
      setErrMessage(result.message);
    }
  };

  return {
    qnty, increaseQnty, decreaseQnty, handleCheckout, errMessage
  }
};
