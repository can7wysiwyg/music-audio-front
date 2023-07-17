import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function BookUploadForm() {
  const { id } = useParams();
  const state = useContext(GlobalState);
  const token = state.token;
  const authorName = id;
  const [values, setValues] = useState({
    audioGenre: "",
    bookTitle: "",
    released: "",
    bookDescription: "",
  });
  const [audioBook, setAudioBook] = useState(false);
  const [audioImage, setAudioImage] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          "https://audiobooksapi.onrender.com/genre/show_all"
        );
        setCategories(response.data.results);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    getGenres();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setAudioImage(file);
  };

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setAudioBook(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("authorName", authorName);
    formData.append("bookTitle", values.bookTitle);
    formData.append("audioGenre", values.audioGenre);
    formData.append("released", values.released);
    formData.append("bookDescription", values.bookDescription);
    formData.append("audioImage", audioImage);
    formData.append("audioBook", audioBook);

    try {
      const response = await axios.post(
        "https://audiobooksapi.onrender.com/audio/create_audio",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.msg);
      window.location.href = "/books";
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  return (
    <Container style={{marginTop: "3rem"}}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group className="mb-3" controlId="formBasicBookImage">
              <Form.Label>Upload book image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageUpload}
                required
                 accept=".jpg"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookAudio">
              <Form.Label>Upload book audio</Form.Label>
              <Form.Control
                type="file"
                onChange={handleAudioUpload}
                required
                accept=".mp3"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookName">
              <Form.Control
                type="text"
                name="bookTitle"
                value={values.bookTitle}
                onChange={handleChange}
                placeholder="Book Title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookGenre">
              <Form.Select
                name="audioGenre"
                value={values.audioGenre}
                onChange={handleChange}
                required
              >
                <option value="">Select Book Genre</option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.bookGenre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
              <Form.Control
                as="textarea"
                rows="3"
                name="bookDescription"
                value={values.bookDescription}
                onChange={handleChange}
                placeholder="A short description of the book"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBookRelease">
              <Form.Control
                type="date"
                name="released"
                value={values.released}
                onChange={handleChange}
                placeholder="Book Release Date"
                required
              />
            </Form.Group>
            <Button variant="warning" type="submit">
              Upload book
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default BookUploadForm;
