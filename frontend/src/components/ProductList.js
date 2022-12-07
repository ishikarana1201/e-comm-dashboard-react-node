import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    let result = await fetch("http://localhost:4500/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4500/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();

      toast.error("Record is deleted !!", {
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
  };
  const handleSearch = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4500/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });

      result = await result.json();
      setProducts(result);
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>All Products</h4>
        </div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Serach Prodct Here.."
            onChange={(e) => handleSearch(e)}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <img
                          src={`http://localhost:4500/${item.image}`}
                          alt={item.name}
                          width="50"
                          height="50"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(item._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>

                        <Link
                          to={`update/${item._id}`}
                          className="btn btn-success  m-2"
                        >
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </Link>
                        {/* <Link to={"update" + item._id}>Update</Link> */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <h2 className="p-2">No Record Found</h2>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default ProductList;
