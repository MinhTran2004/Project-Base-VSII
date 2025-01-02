import React from "react";

import { Status } from "../types/types";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

export const StatusSelector: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<Status>(
    Status.AVAILABLE
  );
  const handleChange = (event: SelectChangeEvent<Status>) => {
    setSelectedStatus(event.target.value as Status);
  };

  return (
    <Select value={selectedStatus} onChange={handleChange} displayEmpty>
      {Object.values(Status).map((status) => (
        <MenuItem key={status} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
  );
};
