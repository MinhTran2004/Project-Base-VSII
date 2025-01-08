import { TableCell, TableRow } from "@mui/material";
import { IPet } from "../types/types";

interface IPetRowProps {
  pet: IPet;
}

export const PetRow: React.FC<IPetRowProps> = ({ pet }) => {
  return (
    <TableRow
      sx={{
        backgroundColor: "#f9f9f9",
        transition: "background-color 0.3s ease",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          fontWeight: "bold",
          fontSize: {
            xs: "0.65rem",
            sm: "0.85rem",
            md: "0.95rem",
            lg: "1rem",
          },
        }}
      >
        {pet.id}
      </TableCell>
      <TableCell
        sx={{
          fontSize: {
            xs: "0.65rem",
            sm: "0.85rem",
            md: "0.95rem",
            lg: "1rem",
          },
        }}
      >
        {pet.name}
      </TableCell>
      <TableCell
        sx={{
          fontSize: {
            xs: "0.65rem",
            sm: "0.85rem",
            md: "0.95rem",
            lg: "1rem",
          },
          color:
            pet.status === "available"
              ? "#10d216"
              : pet.status === "pending"
              ? "#faa421"
              : "#f41a0b",
        }}
      >
        {pet.status}
      </TableCell>
      <TableCell
        sx={{
          fontSize: {
            xs: "0.65rem",
            sm: "0.85rem",
            md: "0.95rem",
            lg: "1rem",
          },
        }}
      >
        {pet?.category?.name}
      </TableCell>
    </TableRow>
  );
};
