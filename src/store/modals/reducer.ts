import { IModalState, initialModalState } from "store/types/Modal";

const reducer = {
  openEditModal(state: IModalState, payload: any) {
    return {
      ...state,
      timerEditModal: {
        open: true,
        data: payload.payload,
      },
    }
  },
  openImportTaskModal(state: IModalState) {
    return {
      ...state,
      importTaskModal: {
        open: true,
        data: null,
      },
    }
  },
  closeImportTaskModal(state: IModalState) {
    return {
      ...state,
      importTaskModal: {
        open: null,
        data: null,
      },
    }
  },
  closeEditModal(state: IModalState) {
    return {
      ...state,
      ...initialModalState
    }
  },
  openEditTaskModal(state: IModalState, payload: any) {
    return {
      ...state,
      editTaskModal: {
        open: true,
        data: payload.payload,
      },
    }
  },
  closeEditTaskModal(state: IModalState) {
    return {
      ...state,
      editTaskModal: {
        open: null,
        data: null,
      },
    }
  }

};

export { reducer };