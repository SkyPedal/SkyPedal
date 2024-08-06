import React from 'react';
import PropTypes from 'prop-types';
import LeaderModel from './utils/Leader.model';

const Leader = ({ leader }) => {
    return (
        <div className="scoreItem">
            <span className="leaderboardPosition">{leader.position}</span>
            <span className="userName">{leader.firstname} {leader.lastname}</span>
            <span className="userScore">{leader.score}</span>
        </div>
    );
};

Leader.propTypes = {
    leader: PropTypes.instanceOf(LeaderModel)
}

export default Leader;

