import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";


const BookDateUpdate = () => {
    const {id} = useParams()
    const state = useContext(GlobalState)
    const token = state.token
  return (
    <div className="container">
      <h1>Login Form</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default BookDateUpdate
