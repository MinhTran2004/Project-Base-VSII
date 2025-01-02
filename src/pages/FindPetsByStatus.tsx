import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { StatusSelector } from "../components/StatusSelector";
import { PetTable } from "../components/PetTable";
import { ActionButton } from "../components/ActionButton";
import { Loading } from "../components/Loading";
import { IPet, Status } from "../types/types";
import backgroundImg from "../assets/3.jpg";

const FindPetsByStatus: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true); // Loading page state
  const fakePets: IPet[] = [
    {
      id: 1,
      name: "Black Widow",
      status: Status.AVAILABLE,
      category: { id: 1, name: "Dog" },
      photoUrl: ["https://1.jpg"],
      tags: [
        { id: 1, name: "Cute" },
        { id: 2, name: "Cute" },
      ],
    },
    {
      id: 2,
      name: "Bat Man",
      status: Status.PENDING,
      category: { id: 2, name: "Cat" },
      photoUrl: ["https://2.jpg"],
      tags: [{ id: 3, name: "Cute" }],
    },
    {
      id: 3,
      name: "Spider Man",
      status: Status.SOLD,
      category: { id: 1, name: "Dog" },
      photoUrl: ["https://3.jpg"],
      tags: [{ id: 4, name: "Cute" }],
    },
    {
      id: 4,
      name: "Captain America",
      status: Status.AVAILABLE,
      category: { id: 3, name: "Cat" },
      photoUrl: ["https://4.jpg"],
      tags: [{ id: 5, name: "Cute" }],
    },
  ];

  useEffect(() => {
    setLoadingPage(false);
  }, []);
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
          <Box display="flex" justifyContent="center" mt={4}>
            <Loading />
          </Box>
        ) : (
          <>
            <Typography
              variant="h3"
              mb={3}
              textAlign="center"
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
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
              <StatusSelector />
              <ActionButton
                onClick={() => setLoading(!loading)}
                text="Search"
              />
            </Box>

            {loading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : (
              <PetTable pets={fakePets} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FindPetsByStatus;
