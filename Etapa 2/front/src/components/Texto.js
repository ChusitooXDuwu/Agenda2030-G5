import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import "./styles/Texto.css";

function Texto() {
  const [formValues, setFormValues] = useState({
    texto_espanol: "",
    file: null,
  });
  const [validationState, setValidationState] = useState({
    texto_espanol: false,
    sdg: false,
    file: false,
    addFile: false,
  });
  const [prediction, setPrediction] = useState({});
  const [pfile, setPFile] = useState([]);

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
        setValidationState((prevState) => ({
          ...prevState,
          sdg: true,
        }));
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
      });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormValues({ ...formValues, file: e.target.files[0] });
      setValidationState((prevState) => ({
        ...prevState,
        addFile: true,
      }));
    }
  };

  const clickSubmitFile = async () => {
    if (!validationState.addFile) {
      return;
    }

    const URL = "http://localhost:8000/predict_file";
    console.log(formValues.file);
    const formData = new FormData();
    formData.append("file", formValues.file);

    try {
      const requestOptions = {
        method: "POST",
        body: formData,
      };

      const result = await fetch(URL, requestOptions);

      if (result.status === 200) {
        console.log("OK");
        const data = await result.json();
        setPFile(data);
        setValidationState((prevState) => ({
          ...prevState,
          file: true,
          addFile: true,
        }));
      } else {
        alert("Suba un archivo valido");
      }
    } catch (error) {
      console.error(error);
    }

    console.log(validationState.file);
  };

  const downloadCSV = () => {
    const API_URL = "http://localhost:8000/download_predictions_csv"; // Replace with your API endpoint for XLSX download
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to download XLSX");
        }
      })
      .then((blob) => {
        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "predictions.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading XLSX:", error);
      });
  };

  const downloadXLSX = () => {
    const API_URL = "http://localhost:8000/download_predictions_xlsx"; // Replace with your API endpoint for XLSX download
    fetch(API_URL)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Failed to download XLSX");
        }
      })
      .then((blob) => {
        // Create a link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "predictions.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading XLSX:", error);
      });
  };

  const sdgImageMap = {
    3: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Sustainable_Development_Goal-es-15.jpg",
    4: "https://upload.wikimedia.org/wikipedia/commons/7/74/Sustainable_Development_Goal-es-14.jpg",
    5: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Sustainable_Development_Goal-es-13.jpg",
  };

  const sdgTextMap = {
    3: "Salud y bienestar",
    4: "Educación de calidad",
    5: "Igualdad de género",
  };

  return (
    <div>
      <Row className="row">
        <Col xs={validationState.sdg ? 6 : 12}>
          <Container className="header">
            <h2 className="">Análisis de textos individuales</h2>
            <Row>
              <Form className="py-0 px-5 forms">
                <Row>
                  <Form.Label className="p">
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
                      id="submit"
                      size="lg"
                      onClick={clickSubmit}
                      disabled={!validationState.texto_espanol}
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
      <Row className="row">
        <Col xs={validationState.file ? 6 : 12}>
          <Container className="header">
            <h2 className="">Análisis de archivos</h2>
            <Row className="justify-content-center">
              <Form className="py-0 px-5 forms">
                <Row>
                  <Form.Label className="p">
                    Adjunte el archivo a clasificar
                  </Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFileChange}
                    accept=".xlsx,.csv"
                    className="form-control2"
                  />
                </Row>

                <br />
                <Row>
                  <Col>
                    <Button
                      className="button ingresar"
                      id="submit"
                      size="lg"
                      onClick={clickSubmitFile}
                      disabled={!validationState.addFile}
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
          {validationState.file && (
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
                  src="https://educowebmedia.blob.core.windows.net/educowebmedia/educospain/media/images/blog/agenda-2020-y-objetivos-de-desarrollo-sostenible.png"
                  style={{ height: "70%", width: "70%" }}
                />
                <br />
                <br />
                <Card.Link onClick={downloadCSV} className="download-link">Descargar CSV</Card.Link>
                <Card.Link onClick={downloadXLSX} className="download-link">Descargar XLSX</Card.Link>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Texto;
