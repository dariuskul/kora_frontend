import { TApiProjectItem } from "store/types/Project"

export enum GetTasks {
  GetTasks = 'tasks/GetTasks',
}

export enum GetTimeEntries {
  GetTimeEntries = 'tasks/GetTimeEntries'
}

export enum StartTimer {
  StartTimer = 'tasks/StartTime',
}

export enum StopTimer {
  StopTimer = 'tasks/StopTimer',
}

export enum GetCurrentTimer {
  GetCurrentTimer = 'tasks/GetCurrent'
}

export enum CreateNewTask {
  CreateNewTask = 'tasks/CreateNewTask'
}


export type TApiTimer = {
  id: number;
  startDate: string;
  endDate: string | null;
  time?: number;
}

export type TCreateTask = {
  description: string;
  projectId?: number;
}

export type TApiTaskItem = {
  id: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  projectId: number;
  project: TApiProjectItem,
  timers: Array<ITimeEntry>
}

interface ICurrentTimer {
  id: number;
  startDate: string;
  task: TApiTaskItem;
}

export interface ITimeEntry {
  time: number,
  id: number,
  startDate: string;
  endDate: string;
  taskId: number;
  task: TApiTaskItem;
  forced: boolean | null;
}

export type UpdateTimer = Partial<ITimeEntry>;

export interface IProjectEntry {
  id: number;
  endDate: string;
  startDate: string;
  task: TApiTaskItem,
  project: string;
  forced: boolean | null;
}

export interface IDayEntry {
  day: string;
  projectEntries: Array<IProjectEntry>
}

export interface IWeeklyTimeEntry {
  week: string;
  startDate: string;
  endDate: string;
  projectEntries: Array<IDayEntry>;
}


export interface ITasks {
  tasks: Array<TApiTaskItem>;
  currentTimer?: ICurrentTimer,
  timeEntries: Array<IWeeklyTimeEntry>;
}



export const initialTaskState: ITasks = {
  tasks: [],
  currentTimer: undefined,
  timeEntries: [],
}