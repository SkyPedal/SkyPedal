import ActiveVouchers from "./rewardsPage/ActiveVouchers";
import AvailableVouchers from "./rewardsPage/AvailableVouchers";
import Header from "./rewardsPage/Header";
import { STATIC_DATABASE_URL, DATABASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import useApi from "../repos/api";

const RewardsPage = () => {
  const [rewardsAvailable, setRewardsAvailable] = useState({});
  const [rewardsActive, setRewardsActive] = useState({});
  const [getError, setGetError] = useState(``);

  // how do I set this to realise what user it is? //
  const auth = useAuth();
  const api = useApi(auth);

  // get active user rewards: (identical to available rewards code snippet below this one)
  useEffect(() => {
    const getData = async () => {
      const res = await api.getRewardsActive()
      setRewardsActive(res);
      if (res.error) setGetError(`Data not available from server: ${res.error.message}`);
    };

    getData();
  }, []);


  // get available rewards to the user:
  useEffect(() => {
    const getData = async () => {
      setRewardsAvailable(await getRewardsAvailable());
    };

    getData();
  }, []);

  const getRewardsAvailable = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/rewards/getActive`);
      //   console.log(res.data);
      return res.data.length
        ? { rewards: res.data }
        : { error: `There are no rewards available` };
    } catch (e) {
      setGetError(`Data not available from server: ${e.message}`);
      return { error: `Data not available from server: ${e.message}` };
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
};

export default RewardsPage;
