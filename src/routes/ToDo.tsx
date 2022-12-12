import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atom";
import CategorySelectBox from "../Components/CategorySelectBox";

const Li = styled.div`
  background-color: whitesmoke;  
  border-radius: 15px;
  padding: 10px 10px;
  margin-top : 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const BtnDel = styled.span`
  cursor: pointer;
  margin-left:10px;
`;
const food = ["pizza", "mango", "kimchi", "kimbab"];

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const getSelectValue = (selectValue: string) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: selectValue as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const chToDo = oldToDos.filter((toDo) => id !== toDo.id);
      return chToDo;
    })
  }
  return (
    <Li>
      <span>{text}</span>
      <CategorySelectBox getSelectValue={getSelectValue} itemAll={false} />
      <BtnDel onClick={onDelete}>
        ❌
      </BtnDel>
    </Li>
  );
}

export default ToDo;