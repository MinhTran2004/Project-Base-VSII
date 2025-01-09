import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StatusSelector } from "../components/StatusSelector";
import { PetTable } from "../components/PetTable";
import { ActionButton } from "../components/ActionButton";
import { Loading } from "../components/Loading";
import { Status } from "../types/types";
import {
  fetchPetsByStatus,
  selectPets,
  selectStatus,
  selectError,
  selectCurrentPage,
  selectTotalPages,
  setPage,
} from "../store/slices/petSlice";
import backgroundImg from "../assets/3.jpg";
import { AppDispatch } from "../store/store";

const commonStyles = {
  display: "flex",
  justifyContent: "center",
  mt: 4,
};

const FindPetsByStatus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector(selectPets);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    Status.AVAILABLE
  );
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);

  useEffect(() => {
    setLoadingPage(false);
  }, []);

  const fetchPets = useCallback(async () => {
    try {
      await dispatch(
        fetchPetsByStatus({
          status: selectedStatus,
        })
      ).unwrap();
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }, [dispatch, selectedStatus]);

  useEffect(() => {
    if (isSearchClicked) {
      fetchPets();
      setIsSearchClicked(false);
    }
  }, [isSearchClicked, fetchPets]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [isSearchClicked, dispatch]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  const displayedPets = pets.slice((currentPage - 1) * 10, currentPage * 10);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(236, 231, 231, 0.5)",
          zIndex: 0,
        }}
      />
      <Box sx={{ p: 4, zIndex: 1 }}>
        {loadingPage ? (
          <Box sx={commonStyles}>
            <Loading />
          </Box>
        ) : (
          <>
            <Typography
              mb={3}
              textAlign="center"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                fontWeight: "bold",
                textTransform: "uppercase",
                color: "#332113",
              }}
            >
              Find Pets by Status
            </Typography>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={4}
              justifyContent="center"
            >
              <StatusSelector
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
              <ActionButton onClick={handleSearchClick} text="Search" />
            </Box>

            {status === "loading" ? (
              <Box sx={commonStyles}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" align="center" mt={4}>
                {error}
              </Typography>
            ) : (
              <PetTable
                pets={displayedPets}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FindPetsByStatus;
