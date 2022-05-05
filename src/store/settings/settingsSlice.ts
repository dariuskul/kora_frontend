import { createSlice } from "@reduxjs/toolkit";
import { reducer } from "store/settings/reducer";
import { initialSettingsstate } from "store/settings/types";

const settingsSlice = createSlice({
  name: 'settingsState',
  initialState: initialSettingsstate,
  reducers: reducer
})

export const {
  changeLanguage,
} = settingsSlice.actions;


export default settingsSlice.reducer;