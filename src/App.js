import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./screens/Application";
import Homepage from "./screens/Homepage";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { UserContext } from "./context/userContext";

function App() {
  const { currentUser } = useContext(UserContext)

  return (
    <div className="App bg-background h-screen">
      <Router>
        <Routes>
          <Route path="/" element={!currentUser ? <Homepage /> : <Application />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} /> :
        </Routes>
      </Router>
    </div>
  );
}

export default App;
