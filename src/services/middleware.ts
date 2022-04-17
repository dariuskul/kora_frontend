import axios, { Method, ResponseType } from 'axios';
import { TokenStorage } from 'constants/tokenStorage';
// https://kora-be.herokuapp.com/api
export const baseUrl = 'http://localhost:3000/api';
// export const baseUrl = 'https://kora-be.herokuapp.com/api';
export const apiClient = (responseType?: ResponseType) => axios.create({
  baseURL: baseUrl,
  responseType,
});

export const apiCall = async (
  method: Method,
  url: string,
  needAuth?: boolean,
  data?: any,
  contentType?: string,
  params?: Record<string, any>,
  responseType?: ResponseType,
) => {
  const client = apiClient(responseType);
  const userToken = TokenStorage.getToken();

  if (needAuth) {
    client.interceptors.request.use(request => {
      (request.headers as any).Authorization = `Bearer ${userToken}`;
      return request;
    });
  }

  const response = await client.request({
    data,
    method,
    params,
    url,
    headers: {
      'Content-Type': contentType || 'application/json'
    },
  });

  return response;
};
