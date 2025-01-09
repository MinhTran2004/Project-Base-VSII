import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { IPet } from "../types/types";

interface PetRowProps {
  pet: IPet;
}

const commonStyles = {
  fontSize: {
    xs: "0.65rem",
    sm: "0.85rem",
    md: "0.95rem",
    lg: "1rem",
  },
};

export const PetRow: React.FC<PetRowProps> = ({ pet }) => {
  return (
    <TableRow>
      <TableCell sx={commonStyles}>{pet.id}</TableCell>
      <TableCell sx={commonStyles}>{pet.name}</TableCell>
      <TableCell
        sx={{
          ...commonStyles,
          color:
            pet.status === "available"
              ? "#10d216"
              : pet.status === "pending"
              ? "#faa421"
              : "#f00",
        }}
      >
        {pet.status}
      </TableCell>
      <TableCell sx={commonStyles}>{pet.category?.name}</TableCell>
      <TableCell sx={commonStyles}>
        {pet.tags.map((tag) => tag.name).join(", ")}
      </TableCell>
    </TableRow>
  );
};
