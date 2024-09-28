import {
	Box,
	Button,
	styled,
	TextField,
	Typography,
	Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		const ids = todos.map((item) => item.id);
		const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
		if (duplicateIds.length) {
			console.warn("Duplicate IDs found:", duplicateIds);
		}
	}, [todos]);

	return (
		<StyledContainer>
			{isLoading && <Spinner />}
			{error && (
				<Typography color="error" align="center">
					Ошибка: {error}
				</Typography>
			)}
			{!isLoading &&
				!error &&
				todos?.map((item) => (
					<StyledPaper key={item.id} elevation={3}>
						{editId === item.id ? (
							<StyledEditForm>
								<TextField
									variant="outlined"
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									label="Редактировать текст"
									fullWidth
								/>
								<TextField
									variant="outlined"
									value={editUrl}
									type="url"
									onChange={(e) => setEditUrl(e.target.value)}
									label="Редактировать URL"
									fullWidth
								/>
								<StyledButtonBox>
									<Button
										onClick={saveEdit}
										variant="contained"
										color="primary">
										Сохранить
									</Button>
									<Button
										onClick={() => setEditId(null)}
										variant="outlined"
										color="secondary">
										Отмена
									</Button>
								</StyledButtonBox>
							</StyledEditForm>
						) : (
							<StyledTodoItem>
								<Typography variant="body1" align="center">
									{item.text}
								</Typography>
								{item.url && (
									<StyledImageBox>
										<StyledImage src={item.url} alt="" />
									</StyledImageBox>
								)}
								<StyledButtonBox>
									<Button
										variant="outlined"
										color="error"
										onClick={() => deleteFn(item.id)}>
										Удалить
									</Button>
									<Button
										onClick={() => editFn(item.id)}
										variant="outlined"
										color="primary">
										Редактировать
									</Button>
								</StyledButtonBox>
							</StyledTodoItem>
						)}
					</StyledPaper>
				))}
		</StyledContainer>
	);
};

export default TodoList;

const StyledContainer = styled(Box)`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
`;

const StyledPaper = styled(Paper)`
	margin-bottom: 16px;
	overflow: hidden;
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	}
`;

const StyledTodoItem = styled(Box)`
	padding: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledEditForm = styled(Box)`
	display: flex;
	flex-direction: column;
	gap: 16px;
	padding: 16px;
`;

const StyledButtonBox = styled(Box)`
	display: flex;
	justify-content: center;
	gap: 12px;
	margin-top: 12px;
	width: 100%;
`;

const StyledImageBox = styled(Box)`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 12px;
`;

const StyledImage = styled("img")`
	max-width: 100%;
	height: auto;
	border-radius: 4px;
`;
