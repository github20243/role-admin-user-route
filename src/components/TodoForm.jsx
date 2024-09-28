import { Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRequest } from "../store/request/request";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const handlerSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      text,
      url,
    };
    dispatch(postRequest(newTask));
    setText("");
    setUrl("");
  };
  

  return (
    <FormContainer onSubmit={handlerSubmit}>
      <TextField
        label="New Text"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextField
        label="New Url"
        variant="outlined"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <StyledButton variant="contained" color="info" type="submit">
        Add Task
      </StyledButton>
    </FormContainer>
  );
};

export default TodoForm;

const FormContainer = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
  margin: 0 auto;
  height: 250px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 8px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  padding: 8px 70px;
`;