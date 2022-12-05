import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    // console.log(name, price, category, company);
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4500/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userID }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      toast.info("Product added successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(result);
  };

  return (
    <>
      <form className="productForm">
        <h3>Add Product</h3>
        <hr />
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="validate">Please enter valid product name</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <span className="validate">Please enter valid product price</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Product Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {error && !category && (
            <span className="validate">
              Please enter valid product category
            </span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Product Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {error && !company && (
            <span className="validate">Please enter valid product company</span>
          )}
        </div>
        <button
          type="submit"
          onClick={(e) => addProduct(e)}
          className="btn btn-primary"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </>
  );
};
export default AddProduct;
