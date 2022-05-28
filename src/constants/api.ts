import { baseUrl } from "services/middleware";

export const USER_ENDPOINT = {
  LOGIN: "/users/login",
  VERIFY_ACCOUNT: (token: string) => `/users/verification/${token}`,
  REGISTER: "/users",
  GET_ALL: "/users",
  INVITE_USER: "/users/add",
  GET_DASHBOARD: "/users/dashboard",
  UPDATE: (id?: number) => `/users/${id || ''}`,
  SEND_RESTORE_PASSWORD_LINK: "/users/restore-password",
  RESET_PASSWORD: `/users/reset-password`,
};

export const TRACKING_ENDPOINT = {
  GET_PROJECTS: (status = "Active", access = "All", client = -1) =>
    `/projects?status=${status}&access=${access}&client=${client}`,
  CREATE_PROJECT: "/projects",
  GET_PROJECT: (projectId: number) => `/projects/${projectId}`,
  START_TIME: `/timers/start`,
  STOP_TIME: (userId?: number) => `/timers/stop${userId ? `/${userId}` : ""}`,
  GET_TASKS: "/tasks",
  SYNC_DATA: `/timers/synchronize`,
  TIME_ENTRIES: "/timers",
  GET_CURRENT_TIMER: "/timers/current",
  CREATE_TASK: "/tasks",
  UPDATE_PROJECT: (projectId: number) => `/projects/${projectId}`,
  GET_USER_TASKS: (userId?: number) => `/tasks/user-tasks/${userId}`,
  UPDATE_TIMER: (timerId: number) => `/timers/${timerId}`,
  CHECK_CSV: "/tasks/check",
  GET_AVAILABLE_TASKS: (projectId?: number, assignee?: number, status?: string) =>
    `/tasks/available-tasks?projectId=${projectId || "All"}&assignee=${assignee || "All"
    }&status=${status || 'All'}`,
  UPDATE_TASK: (taskId: number) => `/tasks/${taskId}`,
  GET_PROJECT_STATISTICS: (projectId: number) => `/projects/${projectId}/statistics`,
};

export const EVENTS_ENDPOINT = {
  STOP_TIMER_EVENT: `${baseUrl}/timers/events`,
  DASHBOARD: `${baseUrl}/users/admin/dashboard`,
};

export const ADMIN_ENDPOINT = {
  DASHBOARD: "/users/admin/dashboard",
  REPORT: (project: string, dateFrom: string, dateTo: string) =>
    `/reports?project=${project}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
  REMOVE_USER: (userId: number) => `/users/${userId}`,
  REMOVE_TASK: (taskId: string) => `/tasks/${taskId}`,
  GET_USER_PERFORMANCE: `/reports/performance`,
  GET_CLIENTS: `/clients`,
  CREATE_CLIENT: `/clients`,
  DELETE_CLIENT: (id: number) => `/clients/${id}`,
  UPDATE_CLIENT: (id: number) => `/clients/${id}`,
  ADD_CLIENT_TO_PROJECT: (id: number) => `/clients/add-client/${id}`,
};
