import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../api/api"
import {
	Container,
	Box,
	Typography,
	Button,
	Paper,
	Avatar,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import Spinner from "../components/Spinner"
import TodoForm from "../components/TodoForm"
import TodoList from "../components/TodoList"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const User = () => {
	const [userInfo, setUserInfo] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const checkAuthentication = () => {
			const storedUserInfo = localStorage.getItem("userInfo")
			const isAuthenticated =
				localStorage.getItem("isAuthenticated") === "true"

			if (isAuthenticated && storedUserInfo) {
				setUserInfo(JSON.parse(storedUserInfo))
			} else {
				navigate("/signin", { replace: true })
			}

			setIsLoading(false)
		}

		checkAuthentication()
	}, [navigate])

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true)
			await dispatch(logoutUser()).unwrap()
			localStorage.removeItem("userInfo")
			localStorage.removeItem("token")
			localStorage.removeItem("isAuthenticated")
			localStorage.removeItem("userRole")
			navigate("/signin", { replace: true })
		} catch (error) {
			console.error("Ошибка при выходе:", error)
		} finally {
			setIsLoggingOut(false)
		}
	}

	if (isLoading || isLoggingOut) {
		return <Spinner isLoading={true} />
	}

	if (!userInfo) {
		return null
	}

	return (
		<Container maxWidth="md">
			<Box sx={{ my: 4 }}>
				<StyledPaper elevation={3}>
					<UserInfoContainer>
						<StyledAvatar>
							<AccountCircleIcon fontSize="large" />
						</StyledAvatar>
						<Box>
							<Typography variant="h4" component="h1" gutterBottom>
								Добро пожаловать, {userInfo.email}!
							</Typography>
							<Typography variant="subtitle1" gutterBottom>
								Роль: {userInfo.role || "Пользователь"}
							</Typography>
						</Box>
					</UserInfoContainer>
					<LogoutButton
						variant="contained"
						color="secondary"
						onClick={handleLogout}
						startIcon={<ExitToAppIcon />}>
						Выйти
					</LogoutButton>
				</StyledPaper>
				<TodoForm />
				<TodoList />
			</Box>
		</Container>
	)
}

export default User

const StyledPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(4),
	marginBottom: theme.spacing(4),
	borderRadius: theme.shape.borderRadius,
	boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
	background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: theme.spacing(7),
	height: theme.spacing(7),
	marginRight: theme.spacing(2),
	backgroundColor: theme.palette.secondary.main,
}))

const UserInfoContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	marginBottom: "20px",
})

const LogoutButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
	border: 0,
	borderRadius: 3,
	boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
	color: "white",
	height: 48,
	padding: "0 30px",
}))