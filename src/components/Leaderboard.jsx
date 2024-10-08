import { useState, useEffect } from "react";
import LeaderModel from "./utils/Leader.model";
import Leader from "./leaderboard/Leader";
import "./css/Leaderboard.css";
import { useAuth } from "../context/AuthContext";
import useApi from "../repos/api";

const Leaderboard = () => {
  const auth = useAuth();
  const api = useApi(auth);

  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getUsers().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLeaders(data.data);
      }
    });
  }, [api]);

  var curr;

  const populateTable = () => {
    var currPosition = 1;
    if (leaders.length > 0) {
      console.log(leaders);
      const sampleLeaders = leaders.sort(function (a, b) {
        return b.rewardPoints - a.rewardPoints;
      });
      return sampleLeaders.map((currentLeader) => {
        const leader = new LeaderModel(
          currPosition,
          currentLeader.firstName,
          currentLeader.lastName,
          currentLeader.rewardPoints,
          currentLeader.id,
        );
        if (currentLeader.id === auth.userId) {
          const userScore = new LeaderModel(
            currPosition,
            "you",
            "",
            currentLeader.rewardPoints,
            currentLeader.id,
          );
          curr = <Leader leader={userScore} />;
        }
        currPosition++;
        return <Leader leader={leader} key={leader.id} />;
      });
    }
    return (
      <tr>
        <td colSpan="3">{error}</td>
      </tr>
    );
  };

  return (
    <>
      <div className="leaderboardScroll flex flex-col justify-start">
        <h3 className="text-3xl">Leaderboard</h3>
        <table className="leaderTable">
          <tbody>{populateTable()}</tbody>
        </table>
      </div>
      <div className="userLeaderboard flex flex-col justify-start">
        <table className="leaderTableUser">
          <tr>{curr}</tr>
        </table>
      </div>
    </>
  );
};

export default Leaderboard;
