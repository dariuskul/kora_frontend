import moment from "moment";
import { TApiProjectItem } from "store/types/Project";
import { IProjectEntry, ITimeEntry, TApiTaskItem } from "store/types/Task";

export const formatTimer = (time: number) => {
  const seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
  const minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
  const hours = ("0" + Math.floor(time / 3600000)).slice(-2);
  return { hours, minutes, seconds };
}

// format date to YYYY-MM-DD hh:mm using moment.js
export const formatDate = (date: string) => {
  return moment(date).format("HH:mm");
}

// format date to YYYY-MM-DD using moment.js
export const formatDateShort = (date: string) => {
  return moment(date).format("YYYY-MM-DD");
}


export const getRunningTimerTime = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return 0;
  }
  const time = Number(new Date(endDate)) - Number(new Date(startDate));
  return time;
}

export const calculateTotalTaskTime = (timeEntries: Array<ITimeEntry>) => {
  let totalTime = 0;
  timeEntries.forEach((element) => {
    totalTime += getRunningTimerTime(element.startDate, element.endDate) || 0;
  });
  return totalTime;
}


export const calculateTotalProjectTime = (project: TApiProjectItem) => {
  let totalTime = 0;
  if (!project) return 0;
  const tasks = project.tasks;
  if (!tasks) {
    return 0;
  }
  tasks.forEach(task => {
    totalTime += calculateTotalTaskTime(task.timers);
  })

  return totalTime;
}
// convert time to hours and minutes
export const convertTimeToHoursAndMinutes = (time: number) => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  if (hours === 0 && minutes === 0) {
    return { hours: 0, minutes: 1 };
  }
  return { hours, minutes };
}


export const calculateTimeBetweenDates = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return 0;
  }
  const time = Number(new Date(endDate)) - Number(new Date(startDate));
  return time;
}

// calculate total day time and covert total time to hours, minutes
export const calculateTotalDayTime = ({ times }) => {
  let totalTime = 0;
  times.forEach(project => {
    totalTime += calculateTimeBetweenDates(project.startDate, project.endDate)
  })
  return convertTimeToHoursAndMinutes(totalTime);
}

export const groupTimersByTask = (timers: Array<IProjectEntry>) => {
  const items = new Map<number, { task: TApiTaskItem, time: any, forced: any, allData: Array<any> }>()
  if (!timers) {
    return [];
  }
  timers.forEach(timer => {
    if (items.has(timer.task.id) && items.get(timer.task.id).forced === timer.forced) {
      const item = items.get(timer.task.id);
      item.time += calculateTimeBetweenDates(timer.startDate, timer.endDate);
      item.allData.push(timer)
    }
    else {
      items.set(timer.task.id, {
        task: timer.task,
        time: calculateTimeBetweenDates(timer.startDate, timer.endDate),
        forced: timer.forced,
        allData: [timer],
      })
    }
  })

  // convert task times to hours and minutes
  const itemsArray = Array.from(items.values());
  itemsArray.forEach(item => {
    item.time = convertTimeToHoursAndMinutes(item.time);
  })
  return itemsArray;
}

export const formatTime = (hours: number, minutes: number) => {
  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
};
