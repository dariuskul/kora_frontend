import { TRACKING_ENDPOINT, USER_ENDPOINT } from "constants/api";
import { apiCall } from "services/middleware";
import { TApiProjectItem } from "store/types/Project";
import { UpdateTask, UpdateTimer } from "store/types/Task";

export const getAllProjects = async (filters?: any) => {
  if (filters) {
    const response = await apiCall("GET", TRACKING_ENDPOINT.GET_PROJECTS(filters.status, filters.access), true);
    return response;
  }
  const response = await apiCall("GET", TRACKING_ENDPOINT.GET_PROJECTS(), true);
  return response;
};

export const updateTask = async (taskId: number, payload: UpdateTask) => {
  const response = await apiCall("PATCH", TRACKING_ENDPOINT.UPDATE_TASK(taskId), true, payload);
  return response;
};

export const postProject = async (name: string, isPublic?: boolean) => {
  const response = await apiCall(
    "POST",
    TRACKING_ENDPOINT.CREATE_PROJECT,
    true,
    {
      name,
      isPublic
    }
  );
  return response;
};

export const startTimer = async (taskId: number) => {
  const response = await apiCall("POST", TRACKING_ENDPOINT.START_TIME, true, {
    taskId: taskId,
  });
  return response;
};

export const getTasks = async () => {
  const response = await apiCall("GET", TRACKING_ENDPOINT.GET_TASKS, true);
  return response;
};

export const fetchTimeEntries = async () => {
  const response = await apiCall("GET", TRACKING_ENDPOINT.TIME_ENTRIES, true);
  return response;
};

export const stopTimer = async (userId?: number) => {
  const response = await apiCall("POST", TRACKING_ENDPOINT.STOP_TIME(userId), true);
  return response;
};

export const getCurrent = async () => {
  const response = await apiCall(
    "GET",
    TRACKING_ENDPOINT.GET_CURRENT_TIMER,
    true
  );
  return response;
};

export const getProject = async (projectId: number) => {
  return await apiCall("GET", TRACKING_ENDPOINT.GET_PROJECT(projectId), true);
};

export const createTask = async (description: string, projectId?: number) => {
  return await apiCall("POST", TRACKING_ENDPOINT.CREATE_TASK, true, {
    description,
    projectId
  })
}

export const updateProject = async (projectId: number, projectInfo: Partial<TApiProjectItem>) => {
  return await apiCall("PUT", TRACKING_ENDPOINT.UPDATE_PROJECT(projectId), true, {
    users: projectInfo.users,
    isPublic: projectInfo.isPublic,
    isArchived: projectInfo.isArchived,
  })
}

export const fetchUserTasks = async (userId?: number) => {
  return await apiCall("GET", TRACKING_ENDPOINT.GET_USER_TASKS(), true);
}


export const getDashBoard = async () => {
  return await apiCall("GET", USER_ENDPOINT.GET_DASHBOARD, true);
}

export const updateTimer = async (timerId: number, timerInfo: Partial<UpdateTimer>) => {
  return await apiCall("PATCH", TRACKING_ENDPOINT.UPDATE_TIMER(timerId), true, {
    endDate: timerInfo.endDate,
  })
}

export const fetchAvailableTasks = async (projectId?: number, assignee?: number) => {
  return await apiCall("GET", TRACKING_ENDPOINT.GET_AVAILABLE_TASKS(projectId, assignee), true);
}


export const checkCsv = async (file: any) => {
  return await apiCall("POST", TRACKING_ENDPOINT.CHECK_CSV, true, file, 'multipart/form-data')
}
