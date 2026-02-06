/* eslint-disable react/prop-types */

import { useShowForm } from "../../hooks/useShowForm";
import FormAddProduct from "./FormAddProduct";

const TableProduct = ({ data, handleSubmit, form, handleChange }) => {
  const { toogle, show, close } = useShowForm();
  return (
    <>
    {
      show && <FormAddProduct close={close} handleSubmit={handleSubmit} handleChange={handleChange} form={form} />    
    }
    <div className="button-container">
      <button onClick={() => toogle()}>Tambah Product</button>
    </div>
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="table-image">
                  <img src={item.img_url ? item.img_url : "/hero-example.png"} alt="" />
                </div>
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>Rp {item.price}</td>
              <td>{ item.stock }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TableProduct;
