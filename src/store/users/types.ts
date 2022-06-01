import { IUser } from "store/types/User";

export interface ILoginValues {
  email: string;
  password: string;
}

export interface IRegisterValues {
  email: string;
  fullName: string;
  password: string;
  dateOfBirth: string;
}


export interface IAddEmployeevalues {
  email: string;
}

export interface IUpdatable {
  notifyAfter: number;
}

interface IUpdateType extends IUser {
  password: string;
}

type PartialValues = Partial<IUpdateType>;

export interface IUpdateValues extends PartialValues {
  id: number;
}