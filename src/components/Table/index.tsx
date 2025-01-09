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
import BackgroundImg from "../../assets/background.jpg";

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
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImg})`, // Đường dẫn tới ảnh
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        height: "77vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 221, 1, 0.5)", // Màu vàng với độ mờ 30%
        }}
      />
      <TableContainer
        sx={{
          width: "90%",
          height: "70vh",
          zIndex: 1,
          bgcolor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {categoryTable.map((category) => (
                <TableCell
                  key={category.id}
                  align="center"
                  sx={{ fontWeight: "bold" }}
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
    </Box>
  );
}
