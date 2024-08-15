import { useMemo } from "react";
import { DATABASE_URL, STATIC_DATABASE_URL } from "../config";
import axios from "axios";

const useApi = (auth) => {
  const { token } = auth;
  const { userId } = auth;
  const api = useMemo(() => {
    return {
      queryRegister: async (query) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/users/register`, query
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      queryAuthenticate: async (query) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/authenticate`, query
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getLocations: async () => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/locations?userId=${userId}`,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      queryLocation: async (query) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/locations/search?query=${query}&userId=${userId}`,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveLocation: async (name, lat, lng) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/locations?userId=${userId}`,
            { name, lat, lng },
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveActivity: async (activity) => {
        try {
          activity = { ...activity, userId };
          await axios.post(`${STATIC_DATABASE_URL}/activities`, activity);
          return { data: "ok" };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getRoute: async (start, end) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/routes/start/${start}/end/${end}?userId=${userId}`,
          );
          const route = response.data;
          if (!route) {
            return { error: "No route found" };
          }
          return { data: route };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getUsers: async () => {
        try {
          const response = await axios.get(`${DATABASE_URL}/users/getAll?`, { headers: {
            'Authorization': `Bearer ${token}`
            
        } });
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getRewardsActive: async () => {
        try {
          const res = await axios.get(`${DATABASE_URL}/users_rewards/user/${auth.user_id}`, { headers: {
            'Authorization': `Bearer ${token}`
            
        } });
          //   console.log(res);
          return res.data.length
            ? { rewards: res.data }
            : { error: `There are no rewards claimed` };
        } catch (e) {
          return { error: `Data not available from server: ${e.message}` };
        }
      },
    };
  }, [userId]);
  return api;
};

export default useApi;
