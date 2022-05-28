import React from 'react';
import { calculateTotalProjectTime, convertTimeToHoursAndMinutes, formatTime } from "utils/timer"


export const TotalTracked = (value: any) => {
  const totalTracked = calculateTotalProjectTime(value.value);
  const convertedToHours = convertTimeToHoursAndMinutes(totalTracked);
  const formatTimedTime = formatTime(convertedToHours.hours, convertedToHours.minutes);
  return (
    <div>{formatTimedTime}</div>
  )
}