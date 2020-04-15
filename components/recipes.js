import React, { createRef } from "react";
import styled from "styled-components";
import Card from "./card.js";
import { Masonry } from "gestalt";
import { usePaginatedFetch } from "../actions/usePaginatedFetch";
import useViewport from "../shared/hooks/useViewport.js";

const Container = styled.div``;

function CardList({ data }) {
  return (
    <>
      {data && data.length > 0
        ? data.map((item) => <Card data={item} />)
        : null}
    </>
  );
}

const Recipes = ({ url }) => {
  //can also add isFetching like so: const [{ data, isFetching }
  const [{ data }, fetchItems] = usePaginatedFetch(url);

  const domValue = createRef();
  const { width } = useViewport();
  console.log("data ", data);
  return (
    <Container ref={domValue}>
      {width > 515 ? (
        <Masonry
          comp={Card}
          items={data.items}
          scrollContainer={() => domValue.current}
          loadItems={fetchItems}
          minCols={1}
          virtualize
        />
      ) : (
        <CardList data={data.items} />
      )}
    </Container>
  );
};

export default Recipes;
