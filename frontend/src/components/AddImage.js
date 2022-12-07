import React, { Component } from "react";

const AddImage = () => {
  return (
    <form className="signUpForm">
      <h3>Add New Image</h3>
      <hr />
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Add Image
        </label>
        <input type="file" className="form-control" id="image" name="image" />
      </div>

      <button type="submit" className="btn btn-primary">
        Add Image
      </button>
    </form>
  );
};
export default AddImage;
