export enum LoginUser {
  Login = 'users/LOGIN',
}

export enum LogOutUser {
  LogOut = 'users/LOG_OUT',
}

export enum UpdateUser {
  UpdateUser = 'users/UpdateUser',
}

export interface IUsersState {
  readonly id: number;
  readonly authenticated: boolean;
  readonly fullName: string;
  readonly email: string;
  readonly role: string;
  readonly notifyAfter: number;
}

export const initialUsersState: IUsersState = {
  id: -1,
  authenticated: false,
  email: '',
  fullName: '',
  role: '',
  notifyAfter: 0,
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  isSuspended: string | null;
  status: string;
  dateOfBirth: string;
  role: string;
  notifyAfter: number;
}