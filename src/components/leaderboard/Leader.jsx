import PropTypes from "prop-types";
import LeaderModel from "../utils/Leader.model";

const Leader = ({ leader }) => {
  return (
    <tr className="scoreItem">
      <td className="leaderboardPosition">{leader.position}</td>
      <td className="userName">
        {leader.firstname} {leader.lastname}
      </td>
      <td className="userScore">{leader.score}</td>
    </tr>
  );
};

Leader.propTypes = {
  leader: PropTypes.instanceOf(LeaderModel),
};

export default Leader;
