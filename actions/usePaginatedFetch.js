import { useState, useEffect } from "react";

const usePaginatedFetch = () => {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(true);

  const fetchMore = () => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 6);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
        console.log('page ', page);
      const response = await fetch(
        `http://localhost:3003/recipe/recipe?offset=${page}`
      );
      const json = await response.json();
      console.log('json ', json);
      setData(prevData => ({ items: [...prevData.items, ...json] }));
      setFetching(false);
    };

    fetchData();
  }, [page]);

  return [{ data, isFetching }, fetchMore];
};

export { usePaginatedFetch };
