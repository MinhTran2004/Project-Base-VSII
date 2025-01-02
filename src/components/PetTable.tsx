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
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: "8px",
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                  lg: "1.125rem",
                },
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                  lg: "1.125rem",
                },
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                  lg: "1.125rem",
                },
              }}
            >
              Status
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
                fontSize: {
                  xs: "0.75rem",
                  sm: "0.875rem",
                  md: "1rem",
                  lg: "1.125rem",
                },
              }}
            >
              Category{" "}
            </TableCell>
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
