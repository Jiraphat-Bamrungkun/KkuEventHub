import { BrowserRouter as Router } from "react-router-dom";
import Mainlayout from "./layout/Mainlayout";
import { SearchFilterProvider } from "./contexts/SearchContext";

function App() {
  console.log("App Component Rendered"); // Debug log
  return (
    <Router basename="/">
      <SearchFilterProvider>
        <Mainlayout />
      </SearchFilterProvider>
    </Router>
  );
}

export default App;

