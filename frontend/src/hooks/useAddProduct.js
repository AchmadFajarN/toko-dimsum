import { useState } from "react";
import { createProduct } from "../utils/api/product";

export const useAddProduct = (addProduct) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    img_url: "",
    is_active: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : type === 'file' ? files[0] : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    if (form.stock !== "") formData.append("stock", Number(form.stock));
    if (form.img_url) formData.append("img_url", form.img_url);
    formData.append('is_active', form.is_active);
    formData.forEach((value, key) => {
        console.log(key, value)
    })
    const result = await createProduct(formData);
    console.log(result);
    if (result.success) {
      await addProduct();
    } else {
      setErr(true);
    }

    setLoading(false);
  };

  return {
    handleChange, handleSubmit, loading, err, form
  }
};
