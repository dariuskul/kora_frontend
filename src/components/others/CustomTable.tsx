import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import {
  Box,
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

interface ITable {
  data: Array<any>;
  columns: any;
  searchLabel: string;
  loading?: boolean;
  onCellClick?: (row: any) => void;
  maxWidth?: string;
  disabledSearch?: boolean;
}

export const CustomTable: React.FC<ITable> = ({
  data,
  columns,
  searchLabel,
  loading,
  onCellClick,
  maxWidth,
  disabledSearch
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
    <Paper sx={{ maxWidth: maxWidth || 1200 }} elevation={3} >
      <Box borderRadius="0.25rem" p="0.75rem" bgcolor="white" mt="2rem">
        {disabledSearch && <Box mb="1rem">
          <TextField
            value={value}
            autoFocus
            color="primary"
            placeholder={searchLabel}
            onChange={e => handleSearchFieldCHange(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>}
        <Box overflow="hidden auto" maxHeight="40rem">
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
                  <TableRow onClick={() => onCellClick?.(row)} sx={{ cursor: 'pointer' }} hover {...row.getRowProps()}>
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
      </Box>
    </Paper>
  );
};