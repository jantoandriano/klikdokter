import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  deleteItem,
  updateItem,
  addItem,
  getProductListBySku,
} from "../features/products";

// Styles
import "../app.scss";
import MySwal from "../index";

// Components
import Header from "../components/Header";
import DataTable from "../components/DataTable";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";
import Modal from "../components/Modal";
import Search from "../components/Search";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsStore = useSelector((store) => store.productsStore);

  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    sku: "",
    product_name: "",
    qty: 0,
    price: "",
    unit: "",
    status: "",
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const setModal = (modal) => {
    setActiveModal({ name: modal, active: true });
  };

  const searchProduct = async (query) => {
    dispatch(getProductListBySku(query));
  };

  const addProduct = async (product) => {
    setActiveModal(false);
    try {
      const res = await addItem(product);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (product) => {
    setActiveModal(false);
    try {
      const res = await updateItem(product);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    setActiveModal(false);
    try {
      const res = await deleteItem(currentProduct);
      if (res.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: `${error?.response?.data?.error}`,
      });
    }
  };

  const deleteModal = (product) => {
    setModal("delete");
    setCurrentProduct(product);
  };

  const updateModal = (product) => {
    setModal("update");
    setCurrentProduct(product);
  };

  const addModal = () => {
    setModal("add");
  };

  const handleNavigate = (event) => {
    const { id } = event.target;
    navigate(`/${id}`);
  };

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          <div className="content-wrapper">
            <div className="login-wrapper">
              <div id="register" onClick={handleNavigate}>
                Register
              </div>
              |
              <div id="login" onClick={handleNavigate}>
                Login
              </div>
            </div>
            <div className="toolbar">
              <Search search={searchProduct} />
              <button className="primary-btn" onClick={() => addModal()}>
                Add Product
              </button>
            </div>

            <DataTable
              items={productsStore.items}
              deleteModal={deleteModal}
              updateModal={updateModal}
            />
          </div>
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "add" && (
            <AddProduct
              currentProduct={currentProduct}
              handleSubmit={addProduct}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "update" && (
            <UpdateProduct
              currentProduct={currentProduct}
              handleSubmit={updateProduct}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "delete" && (
            <DeleteProduct
              currentProduct={currentProduct}
              handleSubmit={deleteProduct}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
