import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'store/selectors';

export const ProjecttSettings = () => {
  const { clients } = useAppSelector(s => s.clientsState);
  return (
    <Box>
      <Box px="1rem">
        <div>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Client</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={clients[0]}
              onChange={() => console.log('test')}
              label="Client"
            >
              <MenuItem value="">
              </MenuItem>
              {clients.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Box>
  )
}