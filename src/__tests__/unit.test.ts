// write tests for timer utils
import {
  calculateTotalDayTime,
  convertTimeToHoursAndMinutes,
  groupTimersByTask,
  calculateTimeBetweenDates,
  calculateTotalProjectTime,
  formatDate,
  getRunningTimerTime,
  calculateTotalTaskTime,
  formatTimer,
  formatDateShort,
} from "utils/timer";
describe("Timer utils", () => {
  describe("calculateTotalDayTime", () => {
    it("should return 0 if no timers are passed", () => {
      const times = [];
      const totalTime = calculateTotalDayTime({ times });
      expect(totalTime).toStrictEqual({ hours: 0, minutes: 1 });
    });
  });
  describe("groupTimersByTask", () => {
    it("should return an empty array if no timers are passed", () => {
      const timers = [];
      const groupedTimers = groupTimersByTask(timers);
      expect(groupedTimers).toEqual([]);
    });
  });
  describe("convertTimeToHoursAndMinutes", () => {
    it("should return 0 hours and 0 minute if time is 0", () => {
      const time = 0;
      const hoursAndMinutes = convertTimeToHoursAndMinutes(time);
      expect(hoursAndMinutes).toStrictEqual({ hours: 0, minutes: 1 });
    });
    it("should return 1 hour and 0 minutes if time is 3600000", () => {
      const time = 3600000;
      const hoursAndMinutes = convertTimeToHoursAndMinutes(time);
      expect(hoursAndMinutes).toStrictEqual({ hours: 1, minutes: 0 });
    });
    it("should return 1 hour and 1 minute if time is 3600001", () => {
      const time = 3600001;
      const hoursAndMinutes = convertTimeToHoursAndMinutes(time);
      expect(hoursAndMinutes).toStrictEqual({ hours: 1, minutes: 0 });
    });
  });
  describe("calculateTimeBetweenDates", () => {
    it("should return 0 if no dates are passed", () => {
      const startDate = "";
      const endDate = "";
      const time = calculateTimeBetweenDates(startDate, endDate);
      expect(time).toBe(0);
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
  describe("formatDate", () => {
    it("should return a date string", () => {
      const date = new Date();
      const dateString = formatDate(date.toISOString());
      expect(dateString).toBeDefined();
    }
    );
  });
  describe("getRunningTimerTime", () => {
    it("should return 0 if no dates are passed", () => {
      const startDate = "";
      const endDate = "";
      const time = getRunningTimerTime(startDate, endDate);
      expect(time).toBe(0);
    });
  })
  describe("calculateTotalTaskTime", () => {
    it("should return 0 if no timers are passed", () => {
      const timeEntries: any = [];
      const totalTime = calculateTotalTaskTime(timeEntries);
      expect(totalTime).toBe(0);
    });
  });
  describe("formatTimer", () => {
    it("should return a formatted timer", () => {
      const timer: any = {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        task: {
          name: "test",
          project: {
            name: "test",
          },
        },
      };
      const formattedTimer = formatTimer(timer);
      expect(formattedTimer).toBeDefined();
    });
  });
});
