import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUploader from "./components/FileUploader";
import MockTest from "./components/MockTest";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUploader />} />
        <Route path="/mock-test" element={<MockTest />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
