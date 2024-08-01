import { DATABASE_URL } from "../config";
import axios from "axios";

const getLocations = async (user_id) => {
  try {
    const response = await axios.get(
      `${DATABASE_URL}/locations?user_id=${user_id}`,
    );
    return { data: response.data };
  } catch (error) {
    return { error: `Error fetching data: ${error}` };
  }
};

const saveActivity = async (activity, user_id) => {
  try {
    activity = { ...activity, user_id };
    await axios.post(`${DATABASE_URL}/activities`, activity);
    return { data: "ok" };
  } catch (error) {
    return { error: `Error fetching data: ${error}` };
  }
};

const getRoute = async (start, end) => {
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
};

export { getLocations, saveActivity, getRoute };
