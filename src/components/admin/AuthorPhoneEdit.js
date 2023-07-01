import { useContext, useState } from "react";

import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import { useParams } from "react-router-dom";


function AuthorPhoneEdit() {
   const{id} = useParams()
   const state = useContext(GlobalState);
    const token = state.token;
    const[AuthorPhoneNumber, setNewNumber] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        await axios.put(`/author/edit_profile_info/${id}`, { AuthorPhoneNumber }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.href = `/author_single/${id}`;
      };
    
    


    return(<>
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h4>Update Author's Phone Number </h4>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                
               <PhoneInput placeholder="write your whatsapp number"  name="AuthorPhoneNumber"
                  value={AuthorPhoneNumber}
                  onChange={setNewNumber}  /> 

                
              </Form.Group>

              <Button variant="warning" type="submit">
                Update WhatsApp Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

    
    
    </>)
}

export default AuthorPhoneEdit