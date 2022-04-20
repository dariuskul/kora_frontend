import { ADMIN_ENDPOINT } from "constants/api";
import { apiCall } from "services/middleware";

export const fetchUsersDashboard = async () => {
  const response = await apiCall('GET', `${ADMIN_ENDPOINT.DASHBOARD}`, true);
  return response;
}

export const getReport = async (project: string, dateFrom: string, dateTo: string) => {
  const response = await apiCall('GET', `${ADMIN_ENDPOINT.REPORT(project, dateFrom, dateTo)}`, true, null, 'application/pdf', null, 'blob');
  return response;
}

export const removeUser = async (userId: string) => {
  const response = await apiCall('DELETE', `${ADMIN_ENDPOINT.REMOVE_USER(Number(userId))}`, true);
  return response;
}
