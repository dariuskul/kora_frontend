import React from "react";
import { Container, styled } from "@mui/material";

const StyledContainer = styled(Container)({
  margin: "0 auto",
  minHeight: '100vh',
});

export const PageContainer: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
