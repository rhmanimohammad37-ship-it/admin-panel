import { useState, useCallback, useEffect } from "react";

export default function useFetching(apiAddres) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(apiAddres);
      if (response.ok) {
        const parsData = await response.json();
        setData(() => parsData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [apiAddres]);

  useEffect(() => {
    fetchData();
  }, []);
  return [data, error, isLoading];
}
