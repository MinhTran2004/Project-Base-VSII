import { TableCell, TableRow } from "@mui/material";
import { IPet } from "../types/types";

interface IPetRowProps {
  pet: IPet;
}

export const PetRow: React.FC<IPetRowProps> = ({ pet }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {pet.id}
      </TableCell>
      <TableCell>{pet.name}</TableCell>
      <TableCell>{pet.status}</TableCell>
      <TableCell>{pet.category.name}</TableCell>
    </TableRow>
  );
};
