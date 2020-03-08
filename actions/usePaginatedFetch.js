import { useState, useEffect } from "react";

const usePaginatedFetch = () => {
  const [data, setData] = useState({ items: [] });
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(true);

  const fetchMore = () => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      console.log(`Fetching items...${Date.now()}"`);
    //   const response = await fetch(
    //     `https://picsum.photos/v2/list?page=${page}&limit=10`
    //   );
      const response = await fetch(
        `http://localhost:3003/recipe/recipe?offset=${page}`
      );
      const json = await response.json();
      setData(prevData => ({ items: [...prevData.items, ...json] }));
      setFetching(false);
    };

    fetchData();
  }, [page]);

  return [{ data, isFetching }, fetchMore];
};

export { usePaginatedFetch };
