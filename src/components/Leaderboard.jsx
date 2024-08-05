import React from "react";
import sampleLeaders from '../data/sampleLeaders.json'
import LeaderModel from './utils/Leader.model';
import Leader from "./Leader";

const Leaderboard = () => {
    const leaders = sampleLeaders.map(currentLeader => {
        const leader = new LeaderModel(currentLeader.name, currentLeader.score, currentLeader._id);
        return <Leader leader={leader} key={leader._id} />
    });
    return (
        <div className="container">
        <div className="row">
            <h3>Leaderboard</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>{leaders}</tbody>
            </table>
        </div>
        </div>
    );
};

export default Leaderboard;
