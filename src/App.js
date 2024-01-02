import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";

const App = () => {
  const user = useSelector((state) => state.user);

  if (!user.estaLogado)
  {
    return <Login />;
  }

  /*return (
    <div>
      <h1>App</h1>
      <Principal />
    </div>
  );*/

  return (
    <div>
      <h1>{user.documento}</h1>    
    </div>
  );
};

export default App;