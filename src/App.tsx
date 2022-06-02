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
import 'moment/locale/lt';
import moment from 'moment';
import { stopManually } from 'store/tasks/taskSlice';
const url = "http://localhost:3000/stream"
export const App = () => {
  const dispatch = useAppThunkDispatch();
  const { authenticated, id } = useAppSelector(s => s.userState)
  const language = TokenStorage.getLanguage().toLocaleLowerCase();
  const { t } = useTranslation();
  const userToken = TokenStorage.getToken();
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
      const { showNotifsTo, showWarning } = JSON.parse(e.data);
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
