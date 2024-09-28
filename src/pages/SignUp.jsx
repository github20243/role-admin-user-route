import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Link,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/api";
import Spinner from "../components/Spinner"; 

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      console.log('Успешная регистрация:', result);
      
      localStorage.setItem("userInfo", JSON.stringify(result));
      localStorage.setItem("token", result.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", result.role || "user");
      
      navigate("/user", { replace: true });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <StyledContainer maxWidth="xs">
        <Typography component="h1" variant="h4" gutterBottom align="center">
          Создать аккаунт
        </Typography>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            fullWidth
            label="Имя пользователя"
            variant="outlined"
            {...register("username", {
              required: "Имя пользователя обязательно",
              minLength: {
                value: 3,
                message: "Минимум 3 символа",
              },
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <StyledTextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("email", {
              required: "Email обязателен",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Неверный формат email",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            fullWidth
            label="Пароль"
            type="password"
            variant="outlined"
            {...register("password", {
              required: "Пароль обязателен",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <StyledButton type="submit" fullWidth variant="contained" size="large" disabled={isLoading}>
            {isLoading ? <Spinner isLoading={isLoading}/> : "Зарегистрироваться"}
          </StyledButton>
        </StyledForm>
        <StyledTypography>
          Уже есть аккаунт?{" "}
          <Link component={RouterLink} to="/signin" color="#0366d6">
            Войти
          </Link>
        </StyledTypography>
      </StyledContainer>
    </PageWrapper>
  );
};

export default SignUp;

const PageWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: "url('https://github.com/github20243/anime-web-site-nurs/blob/master/src/assets/img/ai-generated-8750166_1920.jpg?raw=true')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(2),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(3),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "100%",
  maxWidth: "400px",
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    bottom: "60px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Sofadi One, system-ui",
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#e1e4e8",
    },
    "&:hover fieldset": {
      borderColor: "#0366d6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0366d6",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#24292e",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#2ea44f",
  color: "white",
  "&:hover": {
    backgroundColor: "#2c974b",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: "#586069",
  fontSize: "14px",
  textAlign: "center",
}));
