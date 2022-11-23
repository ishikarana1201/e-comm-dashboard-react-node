import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  const auth = localStorage.getItem("user");

  return (
    <nav className="nav">
      <ul className="nav-ul">
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/add">Add Product</Link>
        </li>
        <li>
          <Link to="/update">Update Product</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {auth ? (
            <Link to="/logout">Logout</Link>
          ) : (
            <Link to="/signup">Sign Up</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
