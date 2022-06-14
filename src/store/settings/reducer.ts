import { PayloadAction } from "@reduxjs/toolkit";
import { ISettingsState } from "store/settings/types";

const reducer = {
  changeLanguage(state: ISettingsState, payload: any) {
    return {
      ...state,
      language: payload.payload,
    }
  },
  setTimerWillStop(state: ISettingsState, payload: any) {
    return {
      ...state,
      timerWillStop: payload.payload,
    }
  }
};

export { reducer };
