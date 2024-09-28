import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../api/api";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Container,
	Box,
	IconButton,
	Tooltip,
	LinearProgress,
	AppBar,
	Toolbar,
	Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom"; 
import Spinner from "../components/Spinner";

const AdminPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [role, setRole] = useState(localStorage.getItem("userRole"));
	const { users, isLoading, error } = useSelector((state) => state.admin);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	useEffect(() => {
		const storedRole = localStorage.getItem("userRole");
		setRole(storedRole);
		if (storedRole !== "admin") {
			navigate("/");
		}
	}, [navigate, role]);

	const handleDelete = (userId) => {
		dispatch(deleteUser(userId));
	};

	const handleLogout = () => {
		setIsLoggingOut(true);
		setTimeout(() => {
			localStorage.removeItem('userToken');
			localStorage.removeItem('userRole');
			navigate('/signin');
		}, 3000);
	};

	if (isLoggingOut) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Spinner isLoading={true} />
			</Box>
		);
	}

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Панель администратора
					</Typography>
					<Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
						Выйти
					</Button>
				</Toolbar>
			</AppBar>
			<StyledContainer maxWidth="md">
				<Box sx={{ mt: 4, mb: 4 }}>
					{isLoading && <LinearProgress />}
					{error && (
						<Typography
							color="error"
							align="center"
							bgcolor="white"
							p={2}
							borderRadius={1}>
							{error}
						</Typography>
					)}

					{!isLoading && !error && (
						<StyledPaper elevation={3}>
							<TableContainer>
								<Table aria-label="user table">
									<StyledTableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Email</TableCell>
											<TableCell align="right">Действия</TableCell>
										</TableRow>
									</StyledTableHead>
									<TableBody>
										{users.map((user) => (
											<StyledTableRow key={user.id}>
												<TableCell component="th" scope="row">
													{user.id}
												</TableCell>
												<TableCell>
													<Box display="flex" alignItems="center">
														<PersonIcon sx={{ mr: 1 }} />
														{user.email}
													</Box>
												</TableCell>
												<TableCell align="right">
													<Tooltip title="Удалить пользователя">
														<IconButton
															color="error"
															onClick={() => handleDelete(user.id)}>
															<DeleteIcon />
														</IconButton>
													</Tooltip>
												</TableCell>
											</StyledTableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</StyledPaper>
					)}
				</Box>
			</StyledContainer>
		</>
	);
};

export default AdminPage;


const StyledContainer = styled(Container)(({ theme }) => ({
	padding: theme.spacing(4),
	background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
	borderRadius: theme.shape.borderRadius,
	boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	background: "rgba(255, 255, 255, 0.8)",
	backdropFilter: "blur(10px)",
	borderRadius: theme.shape.borderRadius,
	overflow: "hidden",
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
	background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
	"& th": {
		color: theme.palette.common.white,
		fontWeight: "bold",
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:hover": {
		backgroundColor: theme.palette.action.selected,
		transition: "background-color 0.3s ease",
	},
}));