import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryListState, categoryState, toDoState } from "../atom";

interface IForm {
  category: string;
}
const Container = styled.div`
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
function CreateCategory() {
  const [categores, setCategores] = useRecoilState(categoryListState);
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategores((oldCategores) => [
      { text: category, id: Date.now() },
      ...oldCategores,
    ]);
    setValue("category", "");
    setCategory(category);
  };
  const existsBoardId = (category: string) => {
    if (categores.findIndex(e => e.text.toUpperCase() === category.toUpperCase()) > 0) {
      return "현재 사용중인 Category 명 입니다.";
    }
    return true;
  }
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Container>
        <Input
          {...register("category", {
            required: "Please write a category",
            validate: existsBoardId
          })}
          placeholder="Write a category"
        />
        <Button>Add</Button>
      </Container>
      {errors.category && <ErrMsg>{errors.category.message}</ErrMsg>}
    </form>
  );
}

export default CreateCategory;