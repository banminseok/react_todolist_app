import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atom";

interface IForm {
  toDo: string;
}


const ToDoAddContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction : row;
`;
const Input = styled.input`
  width: 80%;
  font-size: 20px;
  border-radius: 10px 0 0 10px;
  padding : 5px 10px;
`;
const Button = styled.button`
  width: 20%;
  font-size: 20px;
  border-radius: 0 10px 10px 0;
  padding : 5px 10px;
`;
const ErrMsg = styled.div`
  padding: 5px;
  color : tomato;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <>
      <ToDoAddContainer>
        <form onSubmit={handleSubmit(handleValid)} style={{ width: "100%" }}>
          <Input
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do"
          />
          <Button>Add</Button>
        </form>

      </ToDoAddContainer>
      {errors.toDo && <ErrMsg>{errors.toDo.message}</ErrMsg>}
    </>
  );
}

export default CreateToDo;