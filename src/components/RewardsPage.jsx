import ActiveVouchers from "./rewardsPage/ActiveVouchers";
import AvailableVouchers from "./rewardsPage/AvailableVouchers";
import Header from "./rewardsPage/Header";
import { DATABASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from 'axios';


const RewardsPage = () => {
    const [rewardsAvailable, setRewardsAvailable] = useState({});
    const [rewardsActive, setRewardsActive] = useState({});
    const [getError, setGetError] = useState(``);

    //TO DO: rename to active and available rewards!!


    // get active user rewards:
    useEffect(() => {
        const getData = async () => {
            setRewardsActive(await getRewardsActive());
        }

        getData();
      }, []);

    const getRewardsActive = async () => {
        try {
          const res = await axios.get(`${DATABASE_URL}/users_rewards`);
          return res.data.length ? ({ rewards: res.data }) : ({ error: `There are no rewards claimed` });
        }
        catch (e) {
          setGetError(`Data not available from server: ${e.message}`)
          return ({ error: `Data not available from server: ${e.message}` });
        }
      };

    // get available rewards to the user:
    useEffect(() => {
        const getData = async () => {
            setRewardsAvailable(await getRewardsAvailable());
        }

        getData();
      }, []);

    const getRewardsAvailable = async () => {
        try {
          const res = await axios.get(`${DATABASE_URL}/rewards`);
          return res.data.length ? ({ rewards: res.data }) : ({ error: `There are no rewards available` });
        }
        catch (e) {
          setGetError(`Data not available from server: ${e.message}`)
          return ({ error: `Data not available from server: ${e.message}` });
        }
      };


    return (
        <>
            {/* {getError && <Modal handleClose={() => setGetError(``)} message={getError} />} */}
            {/* Rewards header */}
            <Header />
            {/* Active Vouchers Table */}
            <ActiveVouchers data={rewardsActive} />
            {/* Available Vouchers Table */}
            <AvailableVouchers data={rewardsAvailable} />
        </>
    );
}

export default RewardsPage;