import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { deleteCookie } from "../utils/deleteCookie";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/service/api";

interface ConfirmLogoutProps {
  open: boolean;
  handleClose: () => void;
}

const ConfirmLogout: React.FC<ConfirmLogoutProps> = ({ open, handleClose }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
      // Xóa cookie nếu logout thành công
      deleteCookie("sessionId");
      navigate("/login");
    } catch (error) {
      console.error("Logout thất bại:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {"Bạn có chắc chắn muốn đăng xuất?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleLogout} autoFocus disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng xuất"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLogout;
