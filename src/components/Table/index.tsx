import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { categoryTable } from "./config";
import { IPropData } from "../../types/types";
import { Box, TableBody } from "@mui/material";
import LinearDeterminate from "../Loading";
import BackgroundImg from "../../assets/background.jpg";
import ErrorComponent from "../FetchingError";

export default function PetTable({
  propsData,
}: // error,
// isLoading,
{
  propsData: IPropData | undefined;
  // error: FetchBaseQueryError | SerializedError | undefined;
  // isLoading: boolean;
}) {
  const Error = () => {
    if (propsData) {
      <ErrorComponent propsData={propsData} />;
    }
    return null;
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImg})`,
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
          backgroundColor: "rgba(255, 221, 1, 0.5)",
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
          {propsData && (
            <>
              {propsData.loading && <LinearDeterminate />}
              <TableBody>
                {!propsData.error && propsData.data ? (
                  <TableRow>
                    <TableCell align="center" component="th" scope="row">
                      {propsData.data.id}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {propsData.data.category.name}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {propsData.data.name}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {propsData.data.photoUrls.map((item, index) => (
                        <Box key={index}>
                          <a
                            href={item}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item}
                          </a>
                        </Box>
                      ))}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {propsData.data.tags.map((item) => (
                        <div key={item.id}>{item.name}</div>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {propsData.data.status}
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Error />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
