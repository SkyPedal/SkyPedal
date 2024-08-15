import { useMemo } from "react";
import { DATABASE_URL, STATIC_DATABASE_URL } from "../config";
import axios from "axios";

const useApi = (auth) => {
  const { userId, token } = auth;

  const api = useMemo(() => {
    return {
      queryRegister: async (query) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/users/register`,
            query,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error: ${error}` };
        }
      },
      queryAuthenticate: async (query) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/authenticate`,
            query,
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error: ${error}` };
        }
      },
      getLocations: async () => {
        try {
          const response = await axios.get(`${DATABASE_URL}/locations`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      queryLocation: async (query) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/locations/search?query=${query}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveLocation: async (name, lat, lng) => {
        try {
          const response = await axios.post(
            `${DATABASE_URL}/locations`,
            { name, lat, lng },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      saveActivity: async (activity) => {
        try {
          activity = { ...activity, userId };
          await axios.post(`${STATIC_DATABASE_URL}/activities`, activity, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return { data: "ok" };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      getRoute: async (start, end) => {
        try {
          const response = await axios.get(
            `${DATABASE_URL}/routes/start/${start}/end/${end}`,
            { headers: { Authorization: `Bearer ${token}` } },
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
      getCurrentUser: async (query) => {
        try {
          const response = await axios.get(`${DATABASE_URL}/users/whoami`, { headers: {
            'Authorization': `Bearer ${query}`
        } });
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
    },
      getUsers: async () => {
        try {
          const response = await axios.get(`${DATABASE_URL}/users/all?`, {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching data: ${error}` };
        }
      },
      queryUserById: async () => {
        try {
          const response = await axios.get(`${DATABASE_URL}/users/whoami`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          return { data: response.data };
        } catch (error) {
          return { error: `Error fetching user data: ${error}` };
        }
      },
      deleteAccount: async () => {
        try {
          let id = userId;
          if (!id) {
            const { data, error } = await api.queryUserById();
            if (error) {
              return { error: `Error fetching user ID: ${error}` };
            }
            id = data.id;
          }

          const response = await axios.delete(`${DATABASE_URL}/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          return { data: response.data };
        } catch (error) {
          return { error: `Error deleting account: ${error}` };
        }
      },
      
    };
  }, [token, userId]);
  return api;
};

export default useApi;
