import { useMediaQuery } from "@mui/material"

// make query for breakpoints
export const useQuery = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  return { isMobile, isTablet };
}