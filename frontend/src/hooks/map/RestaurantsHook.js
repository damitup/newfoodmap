import { useEffect, useState } from "react";
import apiClient from "../api/MapApiClient";

export default function useRestaurants(endpoint) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient.get(endpoint)
      .then((res) => setData(res.data))
      .catch((err) => setError(err));
  }, [endpoint]);

  return { data, error };
}
