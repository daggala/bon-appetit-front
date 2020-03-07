import React, { useState, createRef } from 'react';
import styled from 'styled-components';
import Card from './card.js';
import { Masonry } from 'gestalt';

const Container = styled.div`
  /* margin: 20px 20px; */
  overflow: scroll;
  background-color: red;
  overflow-y: scroll;
  height: 300px;
`;

const Recipes = ({ recipes, loadMore }) => {
  const [offset, setOffset] = useState(0);
  const domValue = createRef();
  return (
    <Container ref={domValue}>
      <Masonry
        comp={Card}
        items={recipes}
        scrollContainer={() => domValue.current}
        loadItems={() => {
          console.log('loadItems ');
          setOffset(offset + 5);
          loadMore(offset + 5);
        }}
        minCols={1}
        virtualize
      />
    </Container>
  );
};

export default Recipes;
