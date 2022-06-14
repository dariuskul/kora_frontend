import React, { useEffect } from 'react';
import { CssBaseline } from '@mui/material';

import MainRouter from 'routes/MainRouter';
import { NotificationService } from 'services/notification.service';
import { TokenStorage } from 'constants/tokenStorage';
import { useAppThunkDispatch } from 'store/store';
import { useAppSelector } from 'store/selectors';
import { stopTask } from 'store/tasks/actions';
import { initTimerEvents } from 'services/sse.service';
import 'moment/locale/en-gb'
import { useTranslation } from 'react-i18next';
import moment from "moment";
import 'moment/dist/locale/lt';
import i18n from 'i18n';
import { stopManually } from 'store/tasks/taskSlice';
import { setTimerWillStop } from 'store/settings/settingsSlice';
const url = "http://localhost:3000/stream"
export const App = () => {
  const dispatch = useAppThunkDispatch();
  const { authenticated, id } = useAppSelector(s => s.userState)
  const { t } = useTranslation();
  const userToken = TokenStorage.getToken();
  const language = i18n.language;
  useEffect(() => {
    console.log(language.toLocaleLowerCase())
    moment.locale(language.toLocaleLowerCase());
  }, [language])
  useEffect(() => {
    const notificationService = new NotificationService();
    if (notificationService.getPermission() === 'default') {
      notificationService.getPermission();
    }
    if (!userToken) {
      return;
    }
    const { timerStopped } = initTimerEvents(userToken);
    timerStopped.addEventListener('message', (e) => {
      console.log(e);
      const { showNotifsTo, showWarning, willStop } = JSON.parse(e.data);
      const element = willStop[0];
      if (typeof element === 'number') {
        dispatch(setTimerWillStop(element))
      }
      if (showNotifsTo.includes(id)) {
        try {
          dispatch(stopManually());
          notificationService.showNotification('Your current timer was stopped');
        } catch (error) {

        }
      }

      // if (showWarning.includes(id)) {
      //   if (TokenStorage.getWarning()) {
      //     return;
      //   } else {
      //     notificationService.showNotification('Your timer is running pretty long, it will be stopped after 30 seconds!');
      //     TokenStorage.setWarning(id.toString());
      //   }
      // }
    });
  }, [authenticated, userToken]);

  return (
    <>
      <CssBaseline />
      <div>
        <MainRouter />
      </div>
    </>
  )
}
