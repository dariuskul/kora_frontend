import { ADMIN_ENDPOINT } from "constants/api";
import { apiCall } from "services/middleware";
import { IUpdateClient } from "store/clients/types";

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

export const removeTask = async (taskId: string) => {
  const response = await apiCall('DELETE', `${ADMIN_ENDPOINT.REMOVE_TASK(taskId)}`, true);
  return response;
}

export const getUsersPerformance = async (userId: number, projects: Array<number>, from: string, to: string) => {
  const response = await apiCall('GET', `${ADMIN_ENDPOINT.GET_USER_PERFORMANCE(userId, projects, from, to)}`, true);
  return response;
}

export const getClients = async () => {
  const response = await apiCall('GET', `${ADMIN_ENDPOINT.GET_CLIENTS}`, true);
  return response;
}

export const createClient = async (name: string) => {
  const response = await apiCall('POST', `${ADMIN_ENDPOINT.CREATE_CLIENT}`, true, {
    name
  });
  return response;
}

export const deleteClient = async (id: number) => {
  const response = await apiCall('DELETE', `${ADMIN_ENDPOINT.DELETE_CLIENT(id)}`, true);
  return response;
}

export const patchClient = async (client: IUpdateClient) => {
  const response = await apiCall('PATCH', `${ADMIN_ENDPOINT.UPDATE_CLIENT(client.id)}`, true, {
    name: client.name,
  });
  return response;
}

export const addClientToProject = async (projectId: number, clientId: number) => {
  const response = await apiCall('PATCH', `${ADMIN_ENDPOINT.ADD_CLIENT_TO_PROJECT(projectId)}`, true, {
    clientId
  });
  return response;
}