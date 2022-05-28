import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { Pie, PieChart, Sector } from "recharts";

interface IUsersPieChart {
  averageTimeEachUser: Array<any>;
}

export const formatToHoursAndMinutes = (time: number) => {
  if (!time) {
    return "00:00";
  }
  var dur = moment.duration(time, "ms");
  var hours = Math.floor(dur.asHours());
  var mins = Math.floor(dur.asMinutes()) - hours * 60;

  var result =
    `${hours < 10 ? `0${hours}` : hours}` +
    ":" +
    `${mins < 10 ? `0${mins}` : mins}`;
  return result;
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
    user,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Time spent ${formatToHoursAndMinutes(value)}h`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        cursor="pointer"
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${user}`}
      </text>
    </g>
  );
};

export const UsersPieChart: React.FC<IUsersPieChart> = ({
  averageTimeEachUser,
}) => {
  const [value, setValue] = useState(0);
  return (
    <Box mt="1rem">
      <Typography fontSize="1.5rem" variant="h4" align="center">Project time distribution pie chart between team members</Typography>
      <PieChart width={600} height={250}>
        <Pie
          activeShape={renderActiveShape}
          activeIndex={value}
          onMouseEnter={(_, index) => setValue(index)}
          scale="2"
          outerRadius={60}
          fill="#8884d8"
          data={averageTimeEachUser}
          dataKey="time"
          nameKey="user"
        />
      </PieChart>
    </Box>
  );
};
