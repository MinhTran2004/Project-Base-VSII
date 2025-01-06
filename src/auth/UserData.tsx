import { Avatar, Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import ConfirmLogout from "./ConfirmLogout";

interface UserDataProps {}

const UserData: React.FC<UserDataProps> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="avt" src="https://picsum.photos/50" />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FFA21A",
          color: "#000",
          fontWeight: "bold",
          padding: "9px 20px",
          borderRadius: "10px",
        }}
        onClick={handleClickOpen}
      >
        Đăng xuất
      </Button>
      <ConfirmLogout open={open} handleClose={handleClose} />
    </Stack>
  );
};

export default UserData;
