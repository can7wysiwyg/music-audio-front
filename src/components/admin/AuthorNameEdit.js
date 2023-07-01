import { useParams } from "react-router-dom"
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";


function AuthorNameEdit() {
    const{id} = useParams()

    const state = useContext(GlobalState);
  const token = state.token;
  const [AuthorName, setNewName] = useState("");

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(`/author/edit_profile_info/${id}`, { AuthorName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = `/author_single/${id}`;
  };


    return(<>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="mb-4">Update Author's Name</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="update author's name"
              className="form-control"
              id="AuthorName"
              name="AuthorName"
              value={AuthorName}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Author's Name
          </button>
        </form>
      </div>
    </div>

    
    
    
    </>)
}

export default AuthorNameEdit