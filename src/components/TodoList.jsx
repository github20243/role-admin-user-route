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
	const [isAdding, setIsAdding] = useState(false);

	const deleteFn = (id) => {
		setIsAdding(true);
		dispatch(deleteRequest(id)).finally(() => setIsAdding(false));
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
			setIsAdding(true);
			dispatch(patchRequest({ id: editId, text: editText, url: editUrl }))
				.then(() => {
					setEditId(null);
					setEditText("");
					setEditUrl("");
				})
				.finally(() => setIsAdding(false));
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
		<>
			{(isLoading || isAdding) && <Spinner isLoading={isLoading} />}
			<StyledContainer>
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
		</>
	);
};

export default TodoList;

const StyledContainer = styled(Box)(({ theme }) => ({
	maxWidth: 600,
	margin: "0 auto",
	padding: theme.spacing(2.5),
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	overflow: "hidden",
	transition: "all 0.3s ease",
	"&:hover": {
		boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
	},
}))

const StyledTodoItem = styled(Box)(({ theme }) => ({
	padding: theme.spacing(2),
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
}))

const StyledEditForm = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	gap: theme.spacing(2),
	padding: theme.spacing(2),
}))

const StyledButtonBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	gap: theme.spacing(1.5),
	marginTop: theme.spacing(1.5),
	width: "100%",
}))

const StyledImageBox = styled(Box)(({ theme }) => ({
	display: "flex",
	justifyContent: "center",
	width: "100%",
	marginTop: theme.spacing(1.5),
}))

const StyledImage = styled("img")(({ theme }) => ({
	maxWidth: "100%",
	height: "auto",
	borderRadius: theme.shape.borderRadius,
}))