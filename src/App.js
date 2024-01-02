import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Menu from "./components/Menu";
import ErrorBoundary from "./util/ErrorBoundary";

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <ErrorBoundary>
      {!user.estaLogado ? <Login /> : <Menu />}
    </ErrorBoundary>
  );
};


export default App;