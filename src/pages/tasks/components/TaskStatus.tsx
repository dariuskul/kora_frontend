import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { updateTask } from "services/tracking.service";
import { useAppSelector } from "store/selectors";

interface ITaskStatus {
  status: string;
  taskId: number;
}

const OPTIONS = ['Active', 'Done']


export const TaskStatus: React.FC<ITaskStatus> = ({ status, taskId }) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(status);
  }, [status])
  const handleChange = async (e: any) => {
    await updateTask(taskId, { status: e.target.value })
    setValue(status);
  }
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
