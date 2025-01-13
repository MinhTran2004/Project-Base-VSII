import React, { useEffect, useState, useCallback } from "react";
import { Box, Typography, CircularProgress, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { StatusSelector } from "../components/FindPetsByStatus/StatusSelector";
import { PetTable } from "../components/FindPetsByStatus/PetTable";
import { ActionButton } from "../components/FindPetsByStatus/ActionButton";
import { Loading } from "../components/FindPetsByStatus/Loading";
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
import { useNavigate } from "react-router-dom";
import Header from "../components/FindPetsByStatus/Header";
import Cookies from "js-cookie";

const commonStyles = {
  display: "flex",
  justifyContent: "center",
  mt: 4,
};

const FindPetsByStatus: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pets = useSelector(selectPets);
  const fetchStatus = useSelector(selectStatus);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<Status>(
    Status.AVAILABLE
  );
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");

    if (!sessionId) {
      navigate("/login");
    } else {
      setLoadingPage(false);
    }
  }, [navigate]);

  const fetchPets = useCallback(async () => {
    if (!selectedStatus) {
      setSnackbarOpen(true);
      return;
    }

    try {
      await dispatch(
        fetchPetsByStatus({
          status: selectedStatus,
        })
      ).unwrap();
      setIsSearchClicked(false);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setSnackbarOpen(true);
    }
  }, [dispatch, selectedStatus]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      if (isSearchClicked) {
        fetchPets();
        setIsSearchClicked(false);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
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
    if (isOffline) {
      setSnackbarOpen(true);
    } else {
      setIsSearchClicked(true);
      fetchPets();
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header />
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

              {fetchStatus === "loading" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    minHeight: { xs: "200px", sm: "300px" },
                  }}
                >
                  <CircularProgress sx={{ color: "#cd8f5d" }} />
                </Box>
              )}
              {fetchStatus === "success" && pets.length === 0 && (
                <Typography
                  textAlign="center"
                  color="neutral"
                  fontWeight="bold"
                  sx={{
                    fontSize: {
                      xs: "0.5rem",
                      sm: "0.7rem",
                      md: "1rem",
                      lg: "1.5.5rem",
                    },
                  }}
                >
                  No pets found for the selected status.
                </Typography>
              )}
              {fetchStatus === "success" && pets.length > 0 && (
                <PetTable
                  pets={displayedPets}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
              {error && (
                <Typography
                  textAlign="center"
                  color="error"
                  sx={{
                    fontSize: {
                      xs: "0.5rem",
                      sm: "0.7rem",
                      md: "1rem",
                      lg: "1.5.5rem",
                    },
                  }}
                >
                  {error}
                </Typography>
              )}
            </>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={
          !selectedStatus
            ? "Please select a status."
            : isOffline
            ? "You are offline. Please check your connection."
            : "Failed to fetch pets."
        }
      />
    </>
  );
};

export default FindPetsByStatus;
