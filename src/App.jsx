import "./App.css";
import AuthContext from "./context/AuthContext";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationSidebar from "./components/NavigationSidebar";
import ActivityFeed from "./components/ActivityFeed";
import InfoSidebar from "./components/InfoSidebar";
import RecordActivity from "./components/RecordActivity";
import Leadeboard from "./components/Leaderboard"
import axios from 'axios';
import { useState, useEffect } from 'react';

const USERSURL = `http://localhost:4000/users`;

function App() {
  const [leaders, setLeaders] = useState({});

  useEffect(() => {
    const getData = async () => {
      setLeaders(await getLeaders());
    }
    getData();
  }, []);

  const getLeaders = async () => {
    try {
      const res = await axios.get(USERSURL);
      return res.data.length ? ({ leaders: res.data }) : ({ error: `There are no leaders` });
    }
    catch (e) {
      setGetError(`Data not available from server: ${e.message}`)
      return ({ error: `Data not available from server: ${e.message}` });
    }
  };

  return (
    <AuthContext.Provider value={{ user_id: 1, user_name: "TestUser123" }}>
      <Router>
        <div className="App flex h-screen w-screen">
          <NavigationSidebar />
          <div className="h-full min-w-0 flex-grow">
            <Routes>
              <Route path="/" element={<ActivityFeed />} />
              <Route path="/record" element={<RecordActivity />} />
              <Route path="/compete" element={<Leadeboard data={leaders} />} />
            </Routes>
          </div>
          <InfoSidebar />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
