import { useAppSelector } from "store/selectors";

export const useAdmin = () => {
  const { role } = useAppSelector(s => s.userState);
  if (role !== "admin") {
    return false;
  }
  return true;
}