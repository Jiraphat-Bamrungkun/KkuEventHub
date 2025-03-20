import { BrowserRouter as Router } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";

function App() {
  console.log("App Component Rendered"); // Debug log
  return (
    <Router basename="/">
      <Mainlayout />
    </Router>
  );
}

export default App;

