import { useState, useEffect } from 'react';
import LeaderModel from './utils/Leader.model';
import Leader from "./Leader";
import './css/Leaderboard.css';


const Leaderboard = ({data}) => {


    const [dataStatus, setDataStatus] = useState({ name: `loading`, message: `Data is loading...` });

    useEffect(() => {
        if (data?.error) {
            setDataStatus({ name: `error`, message: data.error });
        }
        else if (data?.leaders) {
            const ds = data.leaders.length > 0 ? { name: `data`, message: null } : { name: `nodata`, message: `There were no todos previously saved` };
            setDataStatus(ds);
        }
        else {
            setDataStatus({ name: `loading`, message: `Data is loading...` });
        }
    }, [data]);

    const populateTable = () => {
        var currPosition = 1;
        if (data?.leaders?.length > 0) {
            const sampleLeaders = data.leaders.sort(function(a, b){
                return b.score - a.score;
            });
            return sampleLeaders.map(currentLeader => {
                const leader = new LeaderModel(currPosition, currentLeader.firstname, currentLeader.lastname, currentLeader.score, currentLeader.id);
                currPosition++;
                return <Leader leader={leader} key={leader.id} />
            });
        }

        return (
            <tr><td id={dataStatus.name} colSpan="3">{dataStatus.message}</td></tr>
        );
    }

    return (
        <div lassName="leaderboard">
            <h3 className="pt-5 text-3xl margin-top-30px">Leaderboard</h3>
            <table className="leaderTable center">
                <tbody>{populateTable()}</tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
