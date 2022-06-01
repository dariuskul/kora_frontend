import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { updateTask } from "services/tracking.service";
import { useAppSelector } from "store/selectors";

interface ITaskStatus {
  status: string;
  taskId: number;
}

const OPTIONS = ['Active', 'Done']


export const TaskStatus: React.FC<ITaskStatus> = ({ status, taskId }) => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    console.log(status)
    setValue(status);
  }, [status])
  const handleChange = async (e: any) => {
    e.stopPropagation();
    setValue(e.target.value);
    await updateTask(taskId, { status: e.target.value })
  }
  return (
    <Box>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onClick={e => e.stopPropagation()}
          onChange={handleChange}
        >
          {OPTIONS.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {t(opt)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
