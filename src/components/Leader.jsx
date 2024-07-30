import React from 'react';
import PropTypes from 'prop-types';
import LeaderModel from './utils/Leader.model';

const Leader = ({ leader }) => {
    return (
        <tr>
            <td>{leader.name}</td>
            <td>{leader.score}</td>
        </tr>
    );
};

Leader.propTypes = {
    leader: PropTypes.instanceOf(LeaderModel)
}

export default Leader;

