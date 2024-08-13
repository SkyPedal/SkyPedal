import { useMemo } from "react";
import { DATABASE_URL, STATIC_DATABASE_URL } from "../config";
import axios from "axios";

const useApi = (auth) => {
  const { user_id } = auth;
  const api = useMemo(() => {
    return {
      getLocations: async () => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/locations?userId=${user_id}`,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      queryLocation: async (query) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/locations/search?query=${query}&userId=${user_id}`,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveLocation: async (name, lat, lng) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/locations?userId=${user_id}`,
            { name, lat, lng },
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveActivity: async (activity) => {
        try {
          activity = { ...activity, user_id };
          await axios.post(`${STATIC_DATABASE_URL}/activities`, activity);
          return { data: "ok" };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getRoute: async (start, end) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/routes/start/${start}/end/${end}?userId=${user_id}`,
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
          const response = await axios.get(`${STATIC_DATABASE_URL}/users`);
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
    };
  }, [user_id]);
  return api;
};

export default useApi;
