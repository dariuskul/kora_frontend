import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { initialUsersState, IUsersState } from "store/types/User";
import { login, updateUser } from "store/users/actions";

const reducer = {
  logout(state: IUsersState) {
    localStorage.clear();
    return {
      ...state,
      ...initialUsersState
    }
  }
};

const thunkReducer = (builder: ActionReducerMapBuilder<IUsersState>) => {
  builder.addCase(login.fulfilled, (state, { payload }) => {
    state.authenticated = true;
    state.email = payload.email;
    state.fullName = payload.fullName;
    state.role = payload.role;
    state.id = payload.id;
    state.notifyAfter = payload.notifyAfter;
  });
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.notifyAfter = payload.notifyAfter;
    state.fullName = payload.fullName || state.fullName;
    state.dailySummaries = payload.dailySummaries;
  });
};

export { thunkReducer, reducer };
