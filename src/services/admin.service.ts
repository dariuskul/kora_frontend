import { ADMIN_ENDPOINT } from "constants/api";
import { apiCall } from "services/middleware";

export const fetchUsersDashboard = async () => {
  const response = await apiCall('GET', `${ADMIN_ENDPOINT.DASHBOARD}`, true);
  return response;
}