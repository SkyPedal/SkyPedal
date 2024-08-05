import React from 'react';
import PropTypes from 'prop-types';
import LeaderModel from './utils/Leader.model';

const Leader = ({ leader }) => {
    return (
        <tr>
            <td className='leaders'>{leader.name}</td>
            <td className='leaders'>{leader.score}</td>
        </tr>
    );
};

Leader.propTypes = {
    leader: PropTypes.instanceOf(LeaderModel)
}

export default Leader;

