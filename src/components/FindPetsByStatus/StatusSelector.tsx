import React from "react";

import { Status } from "../../types/types";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface StatusSelectorProps {
  selectedStatus: Status;
  setSelectedStatus: (status: Status) => void;
}

export const StatusSelector: React.FC<StatusSelectorProps> = ({
  selectedStatus,
  setSelectedStatus,
}) => {
  const handleChange = (event: SelectChangeEvent<Status>) => {
    const newStatus = event.target.value as Status;
    setSelectedStatus(newStatus);
  };

  return (
    <Select
      value={selectedStatus}
      onChange={handleChange}
      displayEmpty
      sx={{
        width: {
          xs: "100%",
          sm: "200px",
        },
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
          md: "1rem",
          lg: "1.125rem",
        },
        "& .MuiSelect-icon": {
          color: "#b3723d",
        },
        "&:hover": {
          backgroundColor: "#e0e0e0",
        },
      }}
    >
      {Object.values(Status).map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
};
