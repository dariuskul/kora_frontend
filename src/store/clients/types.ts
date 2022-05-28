/* istanbul ignore next */

export interface IClient {
  name: string;
  id: number;
}

export interface IUpdateClient {
  id: number;
  name: string;
}

export interface IClientState {
  clients: IClient[];
}

export const initialClientState: IClientState = {
  clients: [],
};