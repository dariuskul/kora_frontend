import { baseUrl } from "services/middleware"

export const USER_ENDPOINT = {
  LOGIN: '/users/login',
  VERIFY_ACCOUNT: (token: string) => `/users/verification/${token}`,
  REGISTER: '/users',
  GET_ALL: '/users',
  INVITE_USER: '/users/add',
  GET_DASHBOARD: '/users/dashboard',
  UPDATE: '/users',
}

export const TRACKING_ENDPOINT = {
  GET_PROJECTS: (status = 'Active', access = 'All') => `/projects?status=${status}&access=${access}`,
  CREATE_PROJECT: '/projects',
  GET_PROJECT: (projectId: number) => `/projects/${projectId}`,
  START_TIME: `/timers/start`,
  STOP_TIME: (userId?: number) => `/timers/stop${userId ? `/${userId}` : ''}`,
  GET_TASKS: '/tasks',
  TIME_ENTRIES: '/timers',
  GET_CURRENT_TIMER: '/timers/current',
  CREATE_TASK: '/tasks',
  UPDATE_PROJECT: (projectId: number) => `/projects/${projectId}`,
  GET_USER_TASKS: (userId?: number) => `/tasks/user-tasks/${userId}`,
  UPDATE_TIMER: (timerId: number) => `/timers/${timerId}`,
  CHECK_CSV: '/tasks/check',
}

export const EVENTS_ENDPOINT = {
  STOP_TIMER_EVENT: `${baseUrl}/timers/events`,
  DASHBOARD: `${baseUrl}/users/admin/dashboard`,
}

export const ADMIN_ENDPOINT = {
  DASHBOARD: '/users/admin/dashboard',
  REPORT: (project: string, dateFrom: string, dateTo: string) =>  `/reports?project=${project}&dateFrom=${dateFrom}&dateTo=${dateTo}`,
}
