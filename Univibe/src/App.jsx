import { BrowserRouter as Router } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";

function App() {
  return (
    <Router basename="/">
      <Mainlayout />
    </Router>
  );
}

export default App;
