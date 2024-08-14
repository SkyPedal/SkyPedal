import { useState, useEffect } from "react";
import { DATABASE_URL } from "../../config.json";
import axios from "axios";
import { useParams } from "react-router-dom";

const Reward = () => {
  const [reward, setReward] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setReward(await getReward());
    };

    getData();
  }, [id]);

  const getReward = async () => {
    try {
      const res = await axios.get(`${DATABASE_URL}/rewards/${id}`);
        console.log(res);
      return res.data.usersRewards.length
        ? { rewards: res.data }
        : { error: `No information about this reward available` };
    } catch (e) {
      setError(`Data not available from server: ${e.message}`);
      return { error: `Data not available from server: ${e.message}` };
    }
  };

  if (error) {
    return <div className="mx-auto max-w-4xl p-4">Error: {error.message}</div>;
  }

  return (
    <>
        <h1>Hello!</h1>
        <p>{reward?.rewards?.name}</p>
    </>
  );
};

export default Reward;
