import React from "react";

const DeleteUser = (props) => {
  const cancel = (event) => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.handleSubmit(props?.currentProduct?.sku);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {props?.currentProduct?.product_name}?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteUser;
