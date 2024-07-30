import "./App.css";
import AuthContext from "./context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationSidebar from "./components/NavigationSidebar";
import ActivityFeed from "./components/ActivityFeed";
import InfoSidebar from "./components/InfoSidebar";
import RecordActivity from "./components/RecordActivity";

function App() {
  return (
    <AuthContext.Provider value={{ userid: null, username: null }}>
      <Router>
        <div className="App flex h-screen w-screen">
          <NavigationSidebar />
          <div className="flex-grow min-w-0 h-full">
            <Routes>
              <Route path="/" element={<ActivityFeed />} />
              <Route path="/record" element={<RecordActivity />} />
            </Routes>
          </div>
          <InfoSidebar />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
