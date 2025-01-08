import React from "react";
import Box from "@mui/material/Box";
import { PetCard } from "./PetCard";
import { IPet } from "../types/types";

interface PetListProps {
  pets: IPet[];
}

export const PetList: React.FC<PetListProps> = ({ pets }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      },
      gap: 2,
    }}
  >
    {pets.map((pet) => (
      <Box key={pet.id} sx={{ display: "flex", justifyContent: "center" }}>
        <PetCard pet={pet} />
      </Box>
    ))}
  </Box>
);
