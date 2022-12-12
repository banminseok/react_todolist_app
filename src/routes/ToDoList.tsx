import { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryListState, categoryState, toDoSelector, toDoState } from "../atom";
import CategorySelectBox from "../Components/CategorySelectBox";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const SubTitle = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
`;
const ToDoContainer = styled.div`
  background-color: ${(props) => props.theme.cardBgColor};
  color: #2f3640;
  border-radius: 15px;
  padding: 10px 10px;
  margin-top : 20px;
`;


const ToDoUl = styled.div`
  
`;
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const getSelectValue = (selectValue: string) => {
    setCategory(selectValue);
  }
  return (
    <Container>
      <Helmet>
        <title>ToDoList</ title>
      </Helmet>
      <div>
        <Header>
          <Title>ToDoList</Title>
        </Header>
        <CreateCategory />
        <hr />
        <SubTitle>카테고리 선택 : </SubTitle><CategorySelectBox getSelectValue={getSelectValue} itemAll={true} />
        <ToDoContainer>
          <CreateToDo />
          <ToDoUl>
            {toDos?.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ToDoUl>
        </ToDoContainer>
      </div>
    </Container>
  )

}

export default ToDoList;