import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, patchRequest } from "../store/request/request";
import Spinner from "./Spinner";

const TodoList = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const deleteFn = (id) => {
    dispatch(deleteRequest(id));
  };

  const editFn = (id) => {
    const itemToEdit = todos.find((item) => item.id === id);
    if (itemToEdit) {
      setEditId(id);
      setEditText(itemToEdit.text);
      setEditUrl(itemToEdit.url);
    }
  };

  const saveEdit = () => {
    if (editId && editText) {
      dispatch(patchRequest({ id: editId, text: editText, url: editUrl }));
      setEditId(null);
      setEditText("");
      setEditUrl("");
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <Typography color="error" align="center">
          Error: {error}
        </Typography>
      )}
      {!isLoading && !error && todos?.map((item) => (
        <StyledListItem key={item.id}>
          {editId === item.id ? (
            <>
              <TextField
                variant="outlined"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                label="Edit Text"
              />
              <TextField
                variant="outlined"
                value={editUrl}
                type="url"
                onChange={(e) => setEditUrl(e.target.value)}
                label="Edit URL"
              />
              <Button onClick={saveEdit} variant="contained" color="primary">
                Save
              </Button>
              <Button
                onClick={() => setEditId(null)}
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p>{item.text}</p>
              <img src={item.url} alt="" style={{ maxWidth: "100%" }} />
              <StyledButtonBox>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteFn(item.id)}
                >
                  Delete
                </Button>
                <Button onClick={() => editFn(item.id)} variant="outlined">
                  Edit
                </Button>
              </StyledButtonBox>
            </>
          )}
        </StyledListItem>
      ))}
    </>
  );
};

export default TodoList;

const StyledListItem = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 400px;
  background-color: bisque;
  margin: 0 auto;
  padding: 30px;
  transition: all 0.3s;
  &:hover {
    background-color: whitesmoke;
  }
`;

const StyledButtonBox = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 20px;
`;