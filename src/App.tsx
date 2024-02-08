import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { getUsersListAsync } from "./store/user.slice";
import Home from "./pages/home/home";
import Edit from "./pages/edit";
import "./App.css";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUsersListAsync());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<h3>No Page</h3>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
