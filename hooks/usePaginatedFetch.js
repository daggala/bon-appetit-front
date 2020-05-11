import { useState, useEffect } from "react";

const usePaginatedFetch = (url) => {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(true);

  const fetchMore = () => {
    if (!isFetching) {
      setPage((prevPage) => prevPage + 6);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      const response = await fetch(`${url}/${page}`);
      const json = await response.json();
      setData((prevData) => ({ items: [...prevData.items, ...json] }));
      setFetching(false);
    };

    fetchData();
  }, [page]);

  return [{ data, isFetching }, fetchMore];
};

export { usePaginatedFetch };
