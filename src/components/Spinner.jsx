import React from "react";
import { styled, keyframes } from "@mui/system";

const Spinner = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <SpinnerOverlay>
      <SpinnerContainer>
        <SpinnerInner>
          <SpinnerCircle />
        </SpinnerInner>
      </SpinnerContainer>
      <SpinnerText>Загрузка...</SpinnerText>
    </SpinnerOverlay>
  );
};

export default Spinner;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  50% { transform: rotate(180deg) }
  100% { transform: rotate(360deg) }
`;

const SpinnerOverlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#0f0d0d",
  zIndex: 9999,
});

const SpinnerContainer = styled("div")({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});

const SpinnerInner = styled("div")({
  width: "220px",
  height: "220px",
  position: "relative",
});

const SpinnerCircle = styled("div")({
  position: "absolute",
  animation: `${spin} 1.61s linear infinite`,
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  boxShadow: "0 4px 0 0 #2fc024",
  transformOrigin: "50% 50%",
  boxSizing: "content-box",
});

const SpinnerText = styled("div")({
  marginTop: "20px",
  color: "#2fc024",
  fontSize: "18px",
  fontWeight: "bold",
});