import React from "react";
import { styled, keyframes } from "@mui/system";
import { Container, Typography } from "@mui/material";

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      <StyledContainer>
        <SpinnerInner>
          <SpinnerCircle />
        </SpinnerInner>
        <SpinnerText variant="h6">Загрузка...</SpinnerText>
      </StyledContainer>
    </SpinnerOverlay>
  );
};

export default Spinner;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;

const SpinnerOverlay = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
  zIndex: 9999,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "300px",
}));

const SpinnerInner = styled("div")(({ theme }) => ({
  width: "100px",
  height: "100px",
  position: "relative",
  marginBottom: theme.spacing(2),
}));

const SpinnerCircle = styled("div")(({ theme }) => ({
  position: "absolute",
  animation: `${spin} 1.61s linear infinite`,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  boxShadow: `0 4px 0 0 ${theme.palette.common.white}`,
  transformOrigin: "50% 50%",
  boxSizing: "content-box",
}));

const SpinnerText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
}));