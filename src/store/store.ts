import { Action, combineReducers, configureStore, DeepPartial, getDefaultMiddleware, StateFromReducersMapObject, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import clientSlice from 'store/clients/clientSlice';
import { IClientState } from 'store/clients/types';
import modalSlice from 'store/modals/modalSlice';
import projectsSlice from 'store/projects/projectsSlice';
import settingsSlice from 'store/settings/settingsSlice';
import { ISettingsState } from 'store/settings/types';
import taskSlice from 'store/tasks/taskSlice';
import { IModalState } from 'store/types/Modal';
import { TInitialProjectState } from 'store/types/Project';
import { ITasks } from 'store/types/Task';

import { IUsersState } from "store/types/User";
import usersSlice from 'store/users/usersSlice';

export interface IAppState {
  userState: IUsersState;
  projectsState: TInitialProjectState,
  tasksState: ITasks,
  modalState: IModalState,
  settingsState: ISettingsState,
  clientsState: IClientState,
}

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['usersState']
};

export type RootState = StateFromReducersMapObject<IAppState>;
export const configStore = (preloadedState: DeepPartial<RootState>) => {
  const rootReducer = combineReducers({
    userState: usersSlice,
    projectsState: projectsSlice,
    tasksState: taskSlice,
    modalState: modalSlice,
    settingsState: settingsSlice,
    clientsState: clientSlice,
  });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();