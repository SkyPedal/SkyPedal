import { useState, useEffect } from "react";
import { DATABASE_URL } from "../../config.json";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import RewardHeader from "./RewardHeader";
import { useAuth } from "../../context/AuthContext";

// add value which tracks whether reward needs to be activated or moved from available to activatable
const Reward = () => {
  const [reward, setReward] = useState({});
  const [error, setError] = useState(null);

  const { rewardId, rewardStatus, urId } = useParams();
  const auth = useAuth();
  const { userId, token } = auth;
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setReward(await getReward());
    };

    getData();
  }, [rewardId]);

  const getReward = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/rewards/${rewardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(res);
      return res.data.usersRewards.length
        ? { rewards: res.data }
        : { error: `No information about this reward available` };
    } catch (e) {
      setError(`Data not available from server: ${e.message}`);
      return { error: `Data not available from server: ${e.message}` };
    }
  };

  const redeemUserReward = async () => {
    try {
      const response = await axios.post(
        `${DATABASE_URL}/users_rewards/redeem/${rewardId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return { data: response.data };
    } catch (error) {
      return { error: `Error fetching data: ${error}` };
    }
  };

  const activateUserReward = async () => {
    try {
      const response = await axios.patch(
        `${DATABASE_URL}/users_rewards/${urId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return { data: response.data };
    } catch (error) {
      return { error: `Error fetching data: ${error}` };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("IM SUBMITTING");
    handleSave();
  };

  const handleSave = async () => {
    setError("");
    console.log("made it to handleSave!");
    console.log("urId = ", urId);

    let success;
    if (rewardStatus == "redeem") {
      success = await redeemUserReward();
    } else if (rewardStatus == "activate") {
      success = await activateUserReward();
    } else {
      setError(`reward status failed to be set successfully: ${rewardStatus}`);
    }
    console.log("Submit: ", success, error);

    if (error == null && success.data) {
      navigate("/rewards");
    } else {
      setError(success.error);
    }
  };

  const addButton = () => {
    if (rewardStatus == "activate") {
      return (
        <button
          name="save"
          type="submit"
          className="mt-5 max-h-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
        >
          Activate Reward
        </button>
      );
    } else if (rewardStatus == "redeem") {
      return (
        <button
          name="save"
          type="submit"
          className="mt-5 max-h-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-red-300"
        >
          Redeem Reward
        </button>
      );
    } else setError(`Error setting reward status`);
  };

  if (error) {
    return <div className="mx-auto max-w-4xl p-4">Error: {error}</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md"
    >
      <RewardHeader rewardName={reward?.rewards?.name} />

      <table className="w-full border-separate border-spacing-2 p-5">
        <tbody>
          <tr>
            <td className="rounded-l-lg bg-slate-200">
              {reward?.rewards?.name}
            </td>
            <td rowSpan="4" className="rounded-r-lg bg-slate-200">
              <img
                src={reward?.rewards?.imageLink}
                className="m-auto w-2/3"
              ></img>
            </td>
          </tr>
          <tr>
            <td className="rounded-l-lg bg-slate-200">
              {reward?.rewards?.description}
            </td>
          </tr>
          <tr>
            <td className="rounded-l-lg bg-slate-200">
              Cost: {reward?.rewards?.pointCost}
            </td>
          </tr>
          <tr>
            <td className="rounded-l-lg bg-slate-200">
              Number available: {reward?.rewards?.numberAvailable}
            </td>
          </tr>
        </tbody>
      </table>

      {addButton()}
    </form>
  );
};

export default Reward;
