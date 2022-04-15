import React, { useState } from "react";
import { Add, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useAsyncDebounce, useGlobalFilter, useSortBy, useTable } from "react-table";

import { IUser } from "store/types/User";

interface IInvitedUsersTable {
  data: Array<IUser>;
  columns: any;
  setOpen: (open: boolean) => void;
  loading?: boolean;
}

export const InvitedUsersTable: React.FC<IInvitedUsersTable> = ({
  data,
  columns,
  setOpen,
  loading,
}) => {

  const [value, setValue] = useState('');

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  const onSearchChange = useAsyncDebounce(inputValue => {
    setGlobalFilter(inputValue);
  }, 200);

  const handleSearchFieldCHange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value);
    onSearchChange(e.target.value);
  };

  if (!data.length && !loading) {
    return null;
  }

  return (
    <Paper elevation={3} >
      <Box borderRadius="0.25rem" p="0.75rem" bgcolor="white" mt="2rem">
        <Box mb="1rem">
          <TextField
            value={value}
            autoFocus
            color="primary"
            placeholder="Search users"
            onChange={e => handleSearchFieldCHange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box mb="0.5rem" display="flex" alignItems="center">
          <Button onClick={() => setOpen(true)} variant="contained">Add to project</Button>
        </Box>
        <Table stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow hover {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps({
                    style: {
                      width: column.width,
                    },
                  }))}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow sx={{ cursor: 'pointer' }} hover {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};
