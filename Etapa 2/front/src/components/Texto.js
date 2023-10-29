import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./styles/Texto.css";

function Texto() {
  const [formValues, setFormValues] = useState({ texto_espanol: "" });
  const [validationState, setValidationState] = useState({
    texto_espanol: false,
    sdg: false,
  });
  const [prediction, setPrediction] = useState({});

  const handleTextChange = (e) => {
    const placeholder = e.target.placeholder;
    const texto_espanol_e = e.target.value;
    setFormValues({ ...formValues, texto_espanol: texto_espanol_e });

    setValidationState((prevState) => ({
      ...prevState,
      texto_espanol:
        texto_espanol_e !== placeholder &&
        texto_espanol_e !== null &&
        texto_espanol_e !== undefined &&
        texto_espanol_e.length > 0,
    }));
  };
  const clickSubmit = () => {
    if (!validationState.texto_espanol) {
      return;
    }

    const URL = "http://localhost:8000/predict";

    const data = {
      Textos_espanol: formValues.texto_espanol,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPrediction(data);
        setValidationState({ sdg: true });
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      });
  };

  const sdgImageMap = {
    3: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Sustainable_Development_Goal-es-15.jpg",
    4: "https://upload.wikimedia.org/wikipedia/commons/7/74/Sustainable_Development_Goal-es-14.jpg",
    5: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Sustainable_Development_Goal-es-13.jpg"
  };

  const sdgTextMap = {
    3: "Salud y bienestar",
    4: "Educación de calidad",
    5: "Igualdad de género"
  };

  return (
    <Row>
      <Col xs={validationState.sdg ? 6 : 12}>
        <Container className="containerr">
          <h2 className="">Análisis de textos individuales</h2>
          <Row className="justify-content-center">
            <Form className="py-4 px-5 mt-5 forms">
              <Row>
                <Form.Label className="formLabel">
                  Inserte el texto a clasificar
                </Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={handleTextChange}
                  style={{ height: "100px", whiteSpace: "normal" }}
                />
              </Row>

              <br />
              <Row>
                <Col>
                  <Button
                    className="button ingresar"
                    size="lg"
                    onClick={clickSubmit}
                  >
                    Clasificar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          <Row></Row>
        </Container>
      </Col>
      <Col xs={6}>
        {validationState.sdg && (
          <Card
            border="dark"
            style={{
              backgroundColor: "rgba(224, 187, 187, 0.2)",
              marginTop: "10%",
            }}
            className="cards"
          >
            <Card.Body>
              <Card.Title className="title">Predicción</Card.Title>
              <Card.Img
                src={sdgImageMap[prediction.sdg]}
                style={{ height: "20%", width: "20%" }}
              />
              <br />
              <br />
              <Card.Text className="text">
                {prediction.Textos_espanol}
              </Card.Text>
              <Card.Text className="text">
                <b>ODS: </b>
                {prediction.sdg} - {sdgTextMap[prediction.sdg]}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
}

export default Texto;
