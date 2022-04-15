import { USER_ENDPOINT } from "constants/api"
import { apiCall } from "services/middleware"
import { IAddEmployeevalues, IRegisterValues, IUpdateValues } from "store/users/types";

export const loginUser = async (email: string, password: string) => {
  const response = await apiCall('POST', USER_ENDPOINT.LOGIN, false, {
    email,
    password
  });
  return response;
}

export const getUserByVerificationToken = async (token: string) => {
  const response = await apiCall('GET', USER_ENDPOINT.VERIFY_ACCOUNT(token), false);
  return response;
}

export const register = async (payload: IRegisterValues) => {
  const response = await apiCall('POST', USER_ENDPOINT.REGISTER, false, payload);
  return response;
}

export const getAllUsers = async () => {
  const response = await apiCall('GET', USER_ENDPOINT.GET_ALL, true);
  return response;
}

export const inviteUser = async (values: IAddEmployeevalues) => {
  const response = await apiCall('POST', USER_ENDPOINT.INVITE_USER, true, {
    email: values.email
  })

  return response;
}

export const update = async (values: IUpdateValues) => {
  const response = await apiCall('PATCH', USER_ENDPOINT.UPDATE, true, values)

  return response;
}