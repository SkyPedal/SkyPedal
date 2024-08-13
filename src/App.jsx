import "./App.css";
import "./index.css";
import AuthContext from "./context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationSidebar from "./components/NavigationSidebar";
import ActivityFeed from "./components/ActivityFeed";
import InfoSidebar from "./components/InfoSidebar";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import Profile from "./components/Profile";
import Activity from "./components/Activity";

import RecordActivity from "./components/RecordActivity";
import Leaderboard from "./components/Leaderboard";
import RewardsPage from "./components/RewardsPage";

function App() {
  return (
    <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
      <Router>
        <div className="App flex h-screen w-screen">
          <NavigationSidebar />
          <div className="h-full min-w-0 flex-grow">
            <Routes>
              <Route path="/" element={<ActivityFeed />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />}/>
              <Route path="/profile" element={<Profile />} />
              <Route path="/record" element={<RecordActivity />} />
              <Route path="/compete" element={<Leaderboard />} />
              <Route path="/rewards" element={<RewardsPage />} />
              <Route path="/activity/:id" element={<Activity />}/>
            </Routes>
          </div>
          <InfoSidebar />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;
