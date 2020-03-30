import React, { createRef } from "react";
import styled from "styled-components";
import Card from "./card.js";
import { Masonry } from "gestalt";
import { usePaginatedFetch } from "../actions/usePaginatedFetch";

const Container = styled.div`
  overflow: scroll;
  height: 100vh;
  margin: 0px 15px 30px 15px;
`;

const Recipes = () => {
  const [{ data, isFetching }, fetchItems] = usePaginatedFetch();

  const domValue = createRef();

  return (
    <Container ref={domValue}>
      <Masonry
        comp={Card}
        items={data.items}
        scrollContainer={() => domValue.current}
        loadItems={fetchItems}
        minCols={1}
        virtualize
      />
    </Container>
  );
};

export default Recipes;
