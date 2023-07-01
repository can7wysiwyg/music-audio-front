import React from "react";
import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";


function BookDeleteAll() {
   const {id} = useParams()
  const state = useContext(GlobalState)
  const token = state.token

  const deleteAll = async() => {
    await axios.delete(`/audio/delete_authors_all/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    window.location.href = "/books"

  }
  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row>
        <Col>
          <p className="text-center">this is a point of no return! you are about to delete all the Author's books...</p>
          <Button variant="danger" className="d-block mx-auto" onClick={deleteAll}>
            Delete Books
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default BookDeleteAll;
