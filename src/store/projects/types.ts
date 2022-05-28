
/* istanbul ignore next */
import { TApiProjectItem } from "store/types/Project";
import { IUser } from "store/types/User";

export interface ICreateProjectValues {
  name: string;
  isPublic?: boolean;
}

export interface IAddUsersToProjectValues {
  users: Array<IUser>;
}

export interface IUpdateProject {
  projectId: number;
  projectInfo: Partial<TApiProjectItem>;
}