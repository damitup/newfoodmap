import { useEffect, useState } from "react";
import apiClient from "../../api/MapApiClient";
//지도에 핑찍어주는 것 ( 마커는 별개)
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
