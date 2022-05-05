import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createClient } from "services/admin.service";
import { fetchClients, postClient, removeClient, updateClient } from "store/clients/actions";
import { IClient, IClientState } from "store/clients/types";
import { getAllTasks, getAvailableTasks, getCurrentTimer, getTimeEntries, startTask, stopTask } from "store/tasks/actions";
import { ITasks } from "store/types/Task";

const reducer = {
};

const thunkReducer = (builder: ActionReducerMapBuilder<IClientState>) => {
  builder.addCase(fetchClients.fulfilled, (state, { payload }) => {
    state.clients = [...payload];
  });
  builder.addCase(postClient.fulfilled, (state, { payload }) => {
    state.clients.push(payload);
  });
  builder.addCase(removeClient.fulfilled, (state, { payload }) => {
    state.clients = state.clients.filter((client) => client.id !== payload);
  });
  builder.addCase(updateClient.fulfilled, (state, { payload }) => {
    state.clients = state.clients.map((client) => client.id === payload.id ? payload : client);
  });
};


export { reducer, thunkReducer };