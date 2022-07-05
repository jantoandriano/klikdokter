import React, { useState } from "react";

const UpdateUser = (props) => {
  const [product, setProduct] = useState(props.currentProduct);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const cancel = (event) => {
    event.preventDefault();
    props?.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props?.handleSubmit(product);
      }}
    >
      <div className="form-group">
        <label>SKU</label>
        <input
          type="text"
          name="sku"
          value={product?.sku}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          name="product_name"
          value={product?.product_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Qty</label>
        <input
          type="text"
          name="qty"
          value={product?.qty}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={product?.price}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Unit</label>
        <input
          type="text"
          name="unit"
          value={product?.unit}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input
          type="text"
          name="status"
          value={product?.status}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUser;
