import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import { useTable, useSortBy } from "react-table";

import { TApiTaskItem } from "store/types/Task";

interface ITasksTable {
  data: Array<TApiTaskItem>;
  columns: any;
  loading?: boolean;
}

export const TasksTable: React.FC<ITasksTable> = ({
  data,
  columns,
  loading,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);
  if (!data.length && !loading) {
    return null;
  }

  return (
    <Paper elevation={3}>
      <Box borderRadius="0.25rem" p="0.75rem" bgcolor="white" mt="2rem" sx={{ maxHeight: '35rem', overflowY: 'auto' }}>
        <Table stickyHeader {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow hover {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
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
