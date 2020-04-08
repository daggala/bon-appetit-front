import React, { createRef } from "react";
import styled from "styled-components";
import Card from "./card.js";
import { Masonry } from "gestalt";
import { usePaginatedFetch } from "../actions/usePaginatedFetch";
import useViewport from "../shared/hooks/useViewport.js";
import { breakpoints } from "../shared/variables";

const Container = styled.div`
  height: 100vh;
  margin: 100px 15px 30px 15px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 130px;
  }
`;

function CardList({ data }) {
  return (
    <>
      {data && data.length > 0
        ? data.map((item) => <Card data={item} />)
        : null}
    </>
  );
}

const Recipes = () => {
  //can also add isFetching like so: const [{ data, isFetching }
  const [{ data }, fetchItems] = usePaginatedFetch();

  const domValue = createRef();
  const { width } = useViewport();

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
