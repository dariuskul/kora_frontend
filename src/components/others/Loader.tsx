import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
  styled,
} from "@mui/material";
import React from "react";

interface ILoader {
  loading: boolean;
  size?: string;
}

interface StyledBoxProps extends BoxProps {
  loading?: boolean;
}

export const Loader: React.FC<ILoader> = ({ loading, size }) => {
  return (
    <StyledBox
      position="absolute"
      right="0"
      loading={loading}
      left="0"
      top="0"
      width="100vw"
      height="100vh"
      bgcolor="rgba(0,0,0,0.5)"
      zIndex="99999"
    >
      <StyledLoader size={size} />
    </StyledBox>
  );
};

const StyledLoader = styled(CircularProgress)<CircularProgressProps>({
  color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
});

const StyledBox = styled(Box)<StyledBoxProps>(({ loading }) => ({
  transition: 'opacity 400ms',
  ...(!loading && {
    opacity: 0,
    pointerEvents: 'none',
  })
}));
