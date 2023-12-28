import React from "react";
import Navbar from "./components/Navbar/Navbar";
import TodoApplication from "./components/TodoApplication";

function App() {
  return (
    <div>
      <Navbar
        Home="Home"
        SignIn="SignIn"
        Logout="Logout"
        Dashboard="Dashboard"
      />
      <TodoApplication />
    </div>
  );
}

export default App;
