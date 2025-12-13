import { useState } from "react";
export default function useFetching(apiAddres) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(apiAddres);
      if (response.ok) {
        const parsData = response.json();
        setData(() => parsData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();

  return [data, error, isLoading];
  
}
