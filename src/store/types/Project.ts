import { IClient } from "store/clients/types";
import { TApiTaskItem, TApiTimer } from "store/types/Task"
import { IUser } from "store/types/User";


export enum GetProjects {
  GetProjects = 'projects/GET_PROJECTS',
}

export enum CreateProject {
  CreateProject = 'projects/CREATE_PROJECT'
}

export enum UpdateProject {
  UpdateProject = 'projects/UPDATE_PROJECT'
}



export type TApiProjectItem = {
  id: number;
  name: string;
  tasks: Array<TApiTaskItem>;
  budget: number;
  createdAt: string;
  updatedAt: string;
  users: Array<IUser>;
  timers: Array<TApiTimer>;
  isPublic: boolean;
  isArchived: boolean;
  isJiraProject: boolean;
  client?: IClient;
  clientId?: number;
}


export type TInitialProjectState = {
  projects: Array<TApiProjectItem>;
}


export const initialProjectState: TInitialProjectState = {
  projects: []
}
