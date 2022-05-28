import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { initialUsersState, IUsersState } from "store/types/User";
import { getTeam, login, removeEmployee, updateUser } from "store/users/actions";

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
    state.notifyAfter = payload?.notifyAfter || state.notifyAfter;
    state.fullName = payload?.fullName || state.fullName;
    state.dailySummaries = payload?.dailySummaries || state.dailySummaries;
  });
  builder.addCase(getTeam.fulfilled, (state, { payload }) => {
    state.team = payload;
  });
  builder.addCase(removeEmployee.fulfilled, (state, { payload }) => {
  });
};

export { thunkReducer, reducer };
