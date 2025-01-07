import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { categoryTable } from "./config";
import { IPet } from "../../types/types";
import { Box, TableBody, Typography } from "@mui/material";
import { isFetchBaseQueryError } from "../../components/handleFetching";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import LinearDeterminate from "../Loading";

export default function PetTable({
  propsData,
  error,
  isLoading,
}: {
  propsData: IPet | undefined;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}) {
  const Error = () => {
    if (isFetchBaseQueryError(error)) {
      const status = error.status;
      const errorMessages: Record<string, string> = {
        400: "400 Bad Request: Yêu cầu không hợp lệ.",
        404: "404 Not Found: Không tìm thấy dữ liệu.", //*
      };
      const message =
        errorMessages[status] || `Lỗi không xác định (HTTP ${status})`;

      // console.log({ errorMessages });
      return <Typography variant="h6">{message}</Typography>;
    }
    return null;
  };

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
        {isLoading && <LinearDeterminate />}
        <TableBody>
          {!error && propsData ? (
            <TableRow>
              <TableCell align="center" component="th" scope="row">
                {propsData.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {propsData.category.name}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {propsData.name}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {propsData.photoUrls.map((item, index) => (
                  <Box key={index}>
                    <a href={item} target="_blank" rel="noopener noreferrer">
                      {item}
                    </a>
                  </Box>
                ))}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {propsData.tags.map((item) => (
                  <div key={item.id}>{item.name}</div>
                ))}
              </TableCell>

              <TableCell align="center">{propsData.status}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Error />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
