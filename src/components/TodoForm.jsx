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

const FormContainer = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2.5), 
  width: "400px",
  margin: "0 auto",
  height: "250px",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2.5), 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 8.75),
}));