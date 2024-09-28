import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import { Button, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Spinner from "../components/Spinner";

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { error } = useSelector((state) => state.auth || {});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = async (data) => {
		setIsLoading(true);
		try {
			const resultAction = await dispatch(loginUser(data)).unwrap();
			console.log("Успешный вход:", resultAction);

			localStorage.setItem("isAuthenticated", "true");
			localStorage.setItem("userRole", resultAction.role);
			localStorage.setItem("userInfo", JSON.stringify(resultAction));
			localStorage.setItem("token", resultAction.token);

			if (resultAction.role === "admin") {
				navigate("/admin", { replace: true });
			} else {
				navigate("/user", { replace: true });
			}
		} catch (err) {
			console.error("Ошибка входа:", err);
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("userRole");
			localStorage.removeItem("userInfo");
			localStorage.removeItem("token");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<BackgroundBox>
			<StyledBox>
				<Typography
					component="h1"
					variant="h4"
					sx={{
						mb: 4,
						fontWeight: "bold",
						color: "#333",
						fontFamily: "Sofadi One, system-ui",
					}}>
					Вход в систему
				</Typography>
				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						fullWidth
						margin="normal"
						label="Электронная почта"
						{...register("email", {
							required: "Электронная почта обязательна",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Неверный формат электронной почты",
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
						inputProps={{ autoComplete: "email" }}
					/>
					<TextField
						fullWidth
						margin="normal"
						type="password"
						label="Пароль"
						{...register("password", { required: "Пароль обязателен" })}
						error={!!errors.password}
						helperText={errors.password?.message}
						inputProps={{ autoComplete: "current-password" }}
					/>
					{error && (
						<Typography color="error" sx={{ mt: 2 }}>
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							mt: 4,
							mb: 2,
							py: 1.5,
							fontSize: "1.1rem",
							fontWeight: "bold",
						}}
						disabled={isLoading}>
						{isLoading ? "Загрузка..." : "Войти"}
					</Button>
					<Button
						fullWidth
						variant="outlined"
						onClick={() => navigate("/signup")}
						sx={{ mt: 1, fontSize: "1rem" }}>
						Нет аккаунта? Зарегистрироваться
					</Button>
				</Box>
			</StyledBox>
			{isLoading && (
				<SpinnerOverlay>
					<Spinner isLoading={isLoading} />
				</SpinnerOverlay>
			)}
		</BackgroundBox>
	);
};

export default SignIn;

const BackgroundBox = styled(Box)(() => ({
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundImage:
		"url('https://github.com/github20243/anime-web-site-nurs/blob/master/src/assets/img/ai-generated-8750166_1920.jpg?raw=true')",
	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
}));

const StyledBox = styled(Box)(({ theme }) => ({
	width: "100%",
	maxWidth: "400px",
	margin: "20px",
	padding: "30px",
	background: "rgba(255, 255, 255, 0.8)",
	backdropFilter: "blur(10px)",
	borderRadius: theme.shape.borderRadius,
	boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
	[theme.breakpoints.down("sm")]: {
		margin: "10px",
		padding: "20px",
	},
}));

const SpinnerOverlay = styled("div")({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "rgba(15, 13, 13, 0.5)",
	zIndex: 1000,
});
