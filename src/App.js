import React from "react";
import { useSelector } from "react-redux";
//import { store } from "./store";
import Login from "./components/Login";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) 
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
      <h1>App</h1>    
    </div>
  );
};

export default App;