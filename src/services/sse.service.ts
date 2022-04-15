import { EVENTS_ENDPOINT } from "constants/api"
import { EventSourcePolyfill } from 'event-source-polyfill';

export const initTimerEvents = (userToken: string) => {
  const timerEvent = initStopTimerEvent(userToken);
  return { timerStopped: timerEvent };
}

export const initStopTimerEvent = (userToken: string) => {
  const timerEvent = new EventSourcePolyfill(EVENTS_ENDPOINT.STOP_TIMER_EVENT, {
    headers: {
      'Authorization': 'Bearer ' + userToken
    }
  });
  return timerEvent;
};

export const initRealTimeDashBord = (userToken: string) => {
  const dashBord = new EventSourcePolyfill(`${EVENTS_ENDPOINT.DASHBOARD}`, {
    headers: {
      'Authorization': 'Bearer ' + userToken
    }
  });
  return dashBord;
}