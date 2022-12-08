import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Application from "./screens/Application";
import Homepage from "./screens/Homepage";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { UserContext } from "./context/userContext";
import Projects from "./screens/Projects";

function App() {
  const { currentUser } = useContext(UserContext)

  return (
    <div className="App bg-background h-screen">
      <Router>
        <Routes>
          {!currentUser ? (
            <>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} /> 
            </>
            ) : (
            <Route exact path="/" element={<Application />}>
              <Route path="/projects" element={<Projects />} />
            </Route>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
