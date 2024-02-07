import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./pages/home/home";
import Edit from "./pages/edit";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
