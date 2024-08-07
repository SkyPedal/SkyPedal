import { DATABASE_URL } from "../config";
import axios from "axios";

const useApi = (auth) => {
  const { user_id } = auth;
  return {
    getLocations: async () => {
      try {
        const response = await axios.get(
          `${DATABASE_URL}/locations?user_id=${user_id}`,
        );
        return { data: response.data };
      } catch (error) {
        return { error: `Error fetching data: ${error}` };
      }
    },
    saveActivity: async (activity) => {
      try {
        activity = { ...activity, user_id };
        await axios.post(`${DATABASE_URL}/activities`, activity);
        return { data: "ok" };
      } catch (error) {
        return { error: `Error fetching data: ${error}` };
      }
    },
    getRoute: async (start, end) => {
      try {
        const response = await axios.get(
          `${DATABASE_URL}/routes?start_id=${start}&end_id=${end}`,
        );
        const route = response.data[0];
        if (!route) {
          return { error: "No route found" };
        }
        return { data: route };
      } catch (error) {
        return { error: `Error fetching data: ${error}` };
      }
    },
  };
};

export default useApi;
