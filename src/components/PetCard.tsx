import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { IPet } from "../types/types";

interface PetCardProps {
  pet: IPet;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => (
  <Card
    sx={{
      margin: { xs: "8px", sm: "12px", md: "16px" },
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    <CardContent
      sx={{
        padding: { xs: "8px", sm: "12px", md: "16px" },
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
          fontWeight: 600,
          color: "#333",
          marginBottom: "8px",
        }}
      >
        {pet.name}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          fontWeight: 400,
          color: "#666",
        }}
      >
        Status: {pet.status}
      </Typography>
    </CardContent>
  </Card>
);
