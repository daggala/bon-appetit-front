import React, { useContext, useState, createRef } from "react";
import styled from "styled-components";
import Card from "./card.js";
import { Masonry } from "gestalt";
import { usePaginatedFetch } from "../actions/usePaginatedFetch";
import useViewport from "../shared/hooks/useViewport.js";
import { UserContext } from "../utils/context";
import Login from "./login.js";
import Register from "./register.js";
import ClickableWrapper from "./buttons/clickableWrapper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-bottom: 30px;
  margin-top: 10px;
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

const Recipes = ({ url, myRecipes = false }) => {
  const { user } = useContext(UserContext);
  const [isLoginDialogOpen, toggleLoginDialog] = useState(false);
  const [isRegisterDialogOpen, toggleRegisterDialog] = useState(false);

  //can also add isFetching like so: const [{ data, isFetching }
  const [{ data }, fetchItems] = usePaginatedFetch(url);

  const domValue = createRef();
  const { width } = useViewport();
  return (
    <>
      <Container ref={domValue}>
        {isLoginDialogOpen ? (
          <Login
            message="You have to be logged to be able to create recipes or view your recipes"
            onClickOutside={toggleLoginDialog}
            openRegisterForm={() => {
              toggleLoginDialog(false);
              toggleRegisterDialog(true);
            }}
          />
        ) : null}
        {isRegisterDialogOpen ? (
          <Register
            onClickOutside={toggleRegisterDialog}
            openLoginForm={() => {
              toggleRegisterDialog(false);
              toggleLoginDialog(true);
            }}
          />
        ) : null}

        <ButtonContainer>
          <div style={{ marginRight: "10px" }}>
            <ClickableWrapper
              type={user ? "link" : "button"}
              url="/create-recipe"
              onClick={toggleLoginDialog}
            >
              Create Recipe
            </ClickableWrapper>
          </div>
          {myRecipes ? null : (
            <ClickableWrapper
              type={user ? "link" : "button"}
              url={{ pathname: "/my-recipes/[id]" }}
              as={user ? `/my-recipes/${user.id}` : null}
              onClick={toggleLoginDialog}
            >
              My recipes
            </ClickableWrapper>
          )}
        </ButtonContainer>
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
    </>
  );
};

export default Recipes;
