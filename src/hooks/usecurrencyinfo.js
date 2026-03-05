import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`;
    const fallbackURL = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

    fetch(primaryURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Primary failed");
        }
        return res.json();
      })
      .then((res) => {
        setData(res[currency]);
      })
      .catch(() => {
        // Try fallback if primary fails
        fetch(fallbackURL)
          .then((res) => res.json())
          .then((res) => {
            setData(res[currency]);
          })
          .catch(() => {
            setData({});
          });
      });

  }, [currency]);

  return data;
}

export default useCurrencyInfo;