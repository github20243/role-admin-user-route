import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { registerUser } from "../api/api";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await dispatch(registerUser(data));
      reset();
      navigate("/user");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BackgroundBox>
      <StyledBox>
        <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: "bold", color: "#333", fontFamily: "Sofadi One, system-ui" }}>
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            label="Электронная почта"
            {...register("email", { required: "Электронная почта обязательна" })}
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
            inputProps={{ autoComplete: "new-password" }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Подтвердите пароль"
            {...register("confirmPassword", {
              required: "Подтверждение пароля обязательно",
              validate: (value) => value === watch("password") || "Пароли не совпадают",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            inputProps={{ autoComplete: "new-password" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4, mb: 2, py: 1.5, fontSize: "1.1rem", fontWeight: "bold" }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "Зарегистрироваться"}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/signin")}
            sx={{ mt: 1, fontSize: "1rem" }}
          >
            Уже есть аккаунт? Войти
          </Button>
        </Box>
      </StyledBox>
    </BackgroundBox>
  );
};

export default SignUp;

const BackgroundBox = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url('https://github.com/github20243/anime-web-site-nurs/blob/master/src/assets/img/ai-generated-8750166_1920.jpg?raw=true')",
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