import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import useApi from "../../repos/api";

const RewardsHeader = () => {
  const [user, setUser] = useState({});
  const [getError, setGetError] = useState(``);

  const auth = useAuth();
  const { userId, token, userPoints } = auth;
  const api = useApi(auth);

  useEffect(() => {
    const getData = async () => {
      const res = await api.queryUserById();
      setUser(res);
      auth.setUserPoints(user?.data?.rewardPoints);
      console.log("user: ", user);
      if (res.error)
        setGetError(`Data not available from server: ${res.error.message}`);
    };

    getData();
  }, []);

  return (
    <header
      className="m-5 mb-5 flex items-center justify-between rounded-2xl border-4 border-transparent shadow-lg"
      style={{
        background:
          "linear-gradient(white, white) padding-box, var(--sky-gradient-shape) border-box",
      }}
    >
      <h1 className="p-5 text-3xl font-bold">Rewards</h1>
      <p className="p-5">You have: {user?.data?.rewardPoints} points</p>
      {/* make it be on the same line lol */}
    </header>
  );
};

export default RewardsHeader;
