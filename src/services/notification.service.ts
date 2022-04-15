import { jiraImage } from "pages/tracking/timer/components/DayEntry";

// make a class 
export class NotificationService {
  private notificationPermission: string | null;
  constructor() {
    this.notificationPermission = null;
  }

  public getPermission = () => {
    if (this.notificationPermission === null) {
      if (Notification.permission === 'granted') {
        this.notificationPermission = 'granted';
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(permission => {
          if (permission === 'granted') {
            this.notificationPermission = 'granted';
          } else {
            this.notificationPermission = 'denied';
          }
        });
      } else {
        this.notificationPermission = 'denied';
      }
    }
    return this.notificationPermission;
  }

  public showNotification = (text: string) => {
    if (this.getPermission() === 'granted') {
      const notification = new Notification('Kora time tracker', {
        body: text,
        icon: 'logo.png',
      });
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };
}
