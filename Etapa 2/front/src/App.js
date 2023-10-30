import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Texto from "./components/Texto";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Texto />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
