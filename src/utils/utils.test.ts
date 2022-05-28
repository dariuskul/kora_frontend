import { ITimeEntry } from "store/types/Task";
import {
  calculateTimeBetweenDates,
  calculateTotalDayTime,
  calculateTotalProjectTime,
  calculateTotalTaskTime,
  convertTimeToHoursAndMinutes,
  formatDate,
  formatDateShort,
  formatTime,
  formatTimer,
  getRunningTimerTime,
  groupTimersByTask,
} from "utils/timer";

// test all imported functions
describe("Timer utils", () => {
  describe("calculateTimeBetweenDates", () => {
    it("should return 0 if no dates are passed", () => {
      const startDate = "";
      const endDate = "";
      const time = calculateTimeBetweenDates(startDate, endDate);
      expect(time).toBe(0);
    });
  })
  describe("calculateTotalDayTime", () => {
    it("should return 0 if no timers are passed", () => {
      const times: any = [];
      const totalTime = calculateTotalDayTime({ times });
      expect(totalTime).toStrictEqual({ hours: 0, minutes: 1 });
    });
  })
  describe("groupTimersByTask", () => {
    it("should return an empty array if no timers are passed", () => {
      const timers: any = [];
      const groupedTimers = groupTimersByTask(timers);
      expect(groupedTimers).toEqual([]);
    });
  });
  describe("convertTimeToHoursAndMinutes", () => {
    it("should return 0 hours and 1 minute if time is 0", () => {
      const time = 0;
      const hoursAndMinutes = convertTimeToHoursAndMinutes(time);
      expect(hoursAndMinutes).toStrictEqual({ hours: 0, minutes: 1 });
    });
  });
  describe("calculateTotalProjectTime", () => {
    it("should return 0 if no project is passed", () => {
      const project: any = {};
      const totalTime = calculateTotalProjectTime(project);
      expect(totalTime).toBe(0);
    });
    it("should return 0 if no tasks are passed", () => {
      const project: any = { tasks: [] };
      const totalTime = calculateTotalProjectTime(project);
      expect(totalTime).toBe(0);
    });
  });
})
