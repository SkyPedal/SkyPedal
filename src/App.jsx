import "./App.css";
import AuthContext from "./context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationSidebar from "./components/NavigationSidebar";
import ActivityFeed from "./components/ActivityFeed";
import InfoSidebar from "./components/InfoSidebar";
import RecordActivity from "./components/RecordActivity";

function App() {
  return (
    <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
      <Router>
        <div className="App flex h-screen w-screen">
          <NavigationSidebar />
          <div className="h-full min-w-0 flex-grow">
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
