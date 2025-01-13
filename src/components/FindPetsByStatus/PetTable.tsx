import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
} from "@mui/material";
import { IPet } from "../../types/types";
import { PetRow } from "./PetRow";

interface PetTableProps {
  pets: IPet[];
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const commonStyles = {
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  },
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
};

export const PetTable: React.FC<PetTableProps> = ({
  pets,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell sx={commonStyles}>ID</TableCell> */}
            <TableCell sx={commonStyles}>Name</TableCell>
            <TableCell sx={commonStyles}>Status</TableCell>
            <TableCell sx={commonStyles}>Category</TableCell>
            <TableCell sx={commonStyles}>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((pet, index) => (
            <PetRow key={`${pet.id}-${index}`} pet={pet} />
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
          color="primary"
          sx={{ padding: 2 }}
        />
      </Box>
    </TableContainer>
  );
};
