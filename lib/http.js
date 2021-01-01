import { useEffect, useState } from "react";

function formatBody(data) {
  if (!data || typeof data?.body === "string") {
    return;
  }
  data.body = JSON.stringify(data.body);
}

export const useHttp = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(async () => {
    formatBody(options);
    setLoading(true);
    const res = await window.fetch(url, options);
    if (res.ok) {
      console.log;
      setData(await res.json());
    } else {
      setError(res.statusText);
    }
    setLoading(false);
  }, []);

  return { loading, error, data };
};
