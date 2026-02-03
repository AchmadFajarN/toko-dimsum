/* eslint-disable react/prop-types */

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.items[0].product_name}</td>
              <td>{item.items[0].quantity}</td>
              <td>Rp {item.items[0].price}</td>
              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>Rp {item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;