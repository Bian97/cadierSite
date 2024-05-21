import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Menu from "./components/Menu";
import FichaFiliado from "./components/FichaFiliado";
import ErrorBoundary from "./util/ErrorBoundary";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Menu />} />
          <Route path="/fichaDeFiliado/:numeroRol" element={<FichaFiliado />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
