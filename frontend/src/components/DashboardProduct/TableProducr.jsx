/* eslint-disable react/prop-types */

const TableProduct = ({ data }) => {
  return (
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
              <td>{item.img_url ? item.img_url : "/hero-example.png"}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>Rp {item.price}</td>
              <td>{ item.stock }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
