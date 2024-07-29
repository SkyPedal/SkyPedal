import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AuthContext from "./context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationSidebar from "./components/NavigationSidebar";
import ActivityFeed from "./components/ActivityFeed";
import InfoSidebar from "./components/InfoSidebar";

function App() {
  return (
    <AuthContext.Provider value={{ userid: null, username: null }}>
      <Router>
        <div className="App">
          <NavigationSidebar />
          <div className="w-3/5 fixed top-0 bottom-0">
            <Routes>
              <Route path="/" element={<ActivityFeed />} />
              {/* TODO: add routes here */}
            </Routes>
          </div>
          <InfoSidebar />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
