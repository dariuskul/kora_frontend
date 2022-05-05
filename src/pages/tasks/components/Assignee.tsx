import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { updateTask } from "services/tracking.service";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";

interface IAssignee {
  name: string;
  oldUserId: number;
  taskId: number;
}


const getOptions = (oldUser: any, currentUser: any) => {
  let options = new Set([]);

  options.add({ id: -1, fullName: 'None' })
  if (oldUser.id !== -1 && oldUser.id !== currentUser.id) {
    options.add(oldUser);
  }
  options.add(currentUser);
  return options;
}

// convert set to array
const setToArray = (set: Set<any>) => {
  let array = [];
  set.forEach(item => {
    array.push(item);
  });
  return array;
}



export const Assignee: React.FC<IAssignee> = ({ name, oldUserId, taskId }) => {
  const { fullName, id } = useAppSelector((s) => s.userState);
  const [value, setValue] = useState(-1);
  useEffect(() => {
    setValue(oldUserId);
  }, [oldUserId])
  const OPTIONS = setToArray(getOptions({ id: oldUserId, fullName: name }, { id, fullName }));
  const handleChange = async (e: any) => {
    e.stopPropagation()
    await updateTask(taskId, { assigneeId: e.target.value })
    const findOption = OPTIONS.find(opt => opt.id === e.target.value);
    setValue(findOption.id);
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
            <MenuItem key={opt.value} value={opt.id}>
              {opt.fullName === fullName ? "Me" : opt.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
