import { useParams } from "react-router-dom"
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { useState } from "react";
import axios from "axios";


function AuthorEmailEdit() {
    const{id} = useParams()

    const state = useContext(GlobalState);
  const token = state.token;
  const [AuthorEmail, setNewEmail] = useState("");

  const handleChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.put(`https://audiobooksapi.onrender.com/author/edit_profile_info/${id}`, { AuthorEmail }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.href = `/author_single/${id}`;
  };


    return(<>
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className="mb-4">Update Author's Email</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="update author's email"
              className="form-control"
              id="AuthorEmail"
              name="AuthorEmail"
              value={AuthorEmail}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Author's Email
          </button>
        </form>
      </div>
    </div>

    
    
    
    </>)
}

export default AuthorEmailEdit