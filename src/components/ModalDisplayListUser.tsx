import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addAllUsers } from "../services/apiService";
import ButtonCreateUser from "./ButtonCreateUser";
import { User } from "../types/types";
import { toast } from "react-toastify";
import { FaSadTear } from "react-icons/fa";
import "../css/ModalDisplay.css"


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

            switch (response.status) {
                case 200:
                case 201:
                    const failed = response.data.failed || [];
                    const failedUsers = listUser.filter((user) =>
                        failed.some((failedUser: User) => failedUser.userName === user.userName)
                    );

                    localStorage.setItem("listUser", JSON.stringify(failedUsers));
                    onAddAllUsers(failedUsers);

                    toast.success("Đăng ký thành công!");
                    break;

                case 400:
                    toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
                    break;

                case 401:
                    toast.error("Bạn không có quyền thực hiện hành động này!");
                    break;

                case 403:
                    toast.error("Bạn không có quyền truy cập vào tài nguyên này!");
                    break;

                case 404:
                    toast.error("Không tìm thấy tài nguyên!");
                    break;

                case 500:
                    toast.error("Lỗi hệ thống, vui lòng thử lại sau!");
                    break;

                default:
                    toast.error("Thêm người dùng không thành công!");
            }
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                toast.error("Yêu cầu bị timeout, vui lòng thử lại!");
            } else {
                toast.error("Lỗi mạng, vui lòng kiểm tra kết nối!");
            }
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
            <Modal.Body className="modal-body-custom">
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
