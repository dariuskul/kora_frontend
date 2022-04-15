export interface IModalState {
  timerEditModal: {
    open: boolean;
    data: any;
  },
  importTaskModal: {
    open: boolean;
    data: any;
  }
}

export const initialModalState: IModalState = {
  timerEditModal: {
    open: false,
    data: null,
  },
  importTaskModal: {
    open: false,
    data: null,
  }
};