import { createSlice } from "@reduxjs/toolkit";
import { reducer } from "store/modals/reducer";
import { initialModalState } from "store/types/Modal";
import { initialProjectState } from "store/types/Project";

const modalSlice = createSlice({
  name: 'modalState',
  initialState: initialModalState,
  reducers: reducer
})

export const {
  closeEditModal, openEditModal, closeImportTaskModal, openImportTaskModal, closeEditTaskModal, openEditTaskModal
} = modalSlice.actions;

export default modalSlice.reducer;