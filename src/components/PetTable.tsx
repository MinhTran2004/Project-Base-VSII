import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IPet } from "../types/types";
import { PetRow } from "./PetRow";

interface IPetTableProps {
  pets: IPet[];
}

export const PetTable: React.FC<IPetTableProps> = ({ pets }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Category </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.length > 0 ? (
            pets.map((pet) => (
              //   <TableRow key={pet.id}>
              //     <TableCell component="th" scope="row">
              //       {pet.id}
              //     </TableCell>
              //     <TableCell>{pet.name}</TableCell>
              //     <TableCell>{pet.status}</TableCell>
              //     <TableCell>{pet.category.name}</TableCell>
              //   </TableRow>
              <PetRow key={pet.id} pet={pet} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No pets found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
