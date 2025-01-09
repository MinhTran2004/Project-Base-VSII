import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addAllUsers } from "../services/apiService";
import ButtonCreateUser from "./ButtonCreateUser";
import { User } from "../types";
import { toast } from "react-toastify";
import { FaSadTear } from "react-icons/fa"; 



interface ModalDisplayProps {
    show: boolean;
    onHide: () => void;
    listUser: User[];
    onAddAllUsers: (newListUser: User[]) => void;
}

const ModalDisplayListUser: React.FC<ModalDisplayProps> = ({ show, onHide, listUser, onAddAllUsers }) => {
    const [loading, setLoading] = useState(false);

    const handleAddAllUsers = async () => {
        setLoading(true);
        try {
            const response = await addAllUsers(listUser);

            if (response.status === 200) {
                const failed = response.data.failed || []; // Danh sách thất bại từ API

                // Lọc danh sách người dùng thất bại
                const failedUsers = listUser.filter((user) =>
                    failed.some((failedUser: User) => failedUser.userName === user.userName)
                );

                // Cập nhật lại listUser chỉ với những người dùng thất bại
                localStorage.setItem("listUser", JSON.stringify(failedUsers)); // Lưu lại danh sách thất bại
                onAddAllUsers(failedUsers); // Cập nhật lại danh sách trong component cha

                toast.success("Đăng ký thành công!");
            } else {
                toast.error(`thêm người dùng không thành công!`);
            }
        } catch (error) {
            console.error("Lỗi khi thêm người dùng:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
            <Modal.Title>Danh sách tài khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "300px", overflowY: "auto", overflowX: "auto" }}>
            {listUser.length > 0 ? (
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Tên</th>
                            <th>Họ</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser.map((user, index) => (
                            <tr key={index}>
                                <td>{user.userName}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center mt-5">
                    <h4>
                        Chưa có dữ liệu{" "}
                        <FaSadTear style={{ color: "red", fontSize: "30px", marginLeft: "10px" }} />
                    </h4>
                    <p style={{ fontSize: "18px", color: "#6c757d" }}>Danh sách tài khoản hiện tại trống.</p>
                </div>
            )}
        </Modal.Body>
        {listUser.length > 0 && (
            <Modal.Footer>
                <ButtonCreateUser
                    text="Thêm"
                    width="10%"
                    height="45px"
                    onClick={handleAddAllUsers}
                    loading={loading}
                    disabled={loading}
                />
            </Modal.Footer>
        )}
    </Modal>
    );
};

export default ModalDisplayListUser;
