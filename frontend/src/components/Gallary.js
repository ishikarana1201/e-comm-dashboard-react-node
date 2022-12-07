import React, { Component } from "react";
import { Link } from "react-router-dom";

const Gallary = () => {
  return (
    <>
      <div className="addImage">
        <div className="titlediv">Image Gallary</div>
        <div className="btndiv">
          <Link className="btn btn-primary" to="/add-image">
            Add New Image
          </Link>
        </div>
      </div>

      <div className="wrap-box">
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </>
  );
};
export default Gallary;
