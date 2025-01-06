import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { categoryTable } from "./config";
import { IPet } from "../../types/types";
import { TableBody } from "@mui/material";

export default function PetTable({
  propsData,
}: {
  propsData: IPet | undefined;
}) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {categoryTable.map((category) => (
              <TableCell
                key={category.id}
                align="center"
                className="table-header"
              >
                {category.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {propsData && (
            <TableRow>
              <TableCell component="th" scope="row">
                {propsData.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {propsData.category.name}
              </TableCell>

              <TableCell component="th" scope="row">
                {propsData.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {propsData.photoUrls.map((item, index) => (
                  <TableRow key={index}>{item}</TableRow>
                ))}
              </TableCell>
              <TableCell component="th" scope="row">
                {propsData.tags.map((item) => (
                  <TableRow key={item.id}>{item.name}</TableRow>
                ))}
              </TableCell>
              <TableCell>{propsData.status}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
