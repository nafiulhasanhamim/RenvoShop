import React from "react";

const Table = ({ data }) => {
  console.log(data);
  const renderTable = () => {
    const rows = data.map((row, index) => (
      <tr key={index}>
        {index === 0 && <td rowSpan={data.length}>{row.order_id}</td>}
        <td>{row.product_id}</td>
        <td>{row.user_id}</td>
      </tr>
    ));

    return rows;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Product ID</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>{renderTable()}</tbody>
    </table>
  );
};

export default Table;
