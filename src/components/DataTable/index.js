import React from "react";
import "./style.scss";

const DataTable = (props) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>
              <span className="column-sort">SKU</span>
            </th>
            <th>
              <span className="column-sort">Product Name</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.length ? (
            props.items.map((item) => (
              <tr key={item.id}>
                <td>{item.sku}</td>
                <td>{item.product_name}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => props.updateModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteModal(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
