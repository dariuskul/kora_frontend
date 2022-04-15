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
const url = "http://localhost:3000/stream"
export const App = () => {
  const dispatch = useAppThunkDispatch();
  const { authenticated, id } = useAppSelector(s => s.userState)
  useEffect(() => {
    const userToken = TokenStorage.getToken();
    const notificationService = new NotificationService();
    if (notificationService.getPermission() === 'default') {
      notificationService.getPermission();
    }
    const { timerStopped } = initTimerEvents(userToken);
    timerStopped.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (data.includes(id)) {
        try {
          dispatch(stopTask()).then(() => {
            notificationService.showNotification('Your current timer was stopped');
          });
        } catch (error) {

        }

      }
    });

    return () => {
      timerStopped.close();
    };
  }, [authenticated]);
  return (
    <>
      <CssBaseline />
      <div>
        <MainRouter />
      </div>
    </>
  )
}
