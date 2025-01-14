import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { addAllUsers } from "../services/apiService";
import ButtonCreateUser from "./ButtonCreateUser";
import { User } from "../types/types";
import { toast } from "react-toastify";
import { FaSadTear } from "react-icons/fa";
import "../css/ModalDisplay.css"
import { handleError } from "../services/handleError";
import { useNavigate } from 'react-router-dom'; 


interface ModalDisplayProps {
    show: boolean;
    onHide: () => void;
    listUser: User[];
    onAddAllUsers: (newListUser: User[]) => void;
}

const ModalDisplayListUser: React.FC<ModalDisplayProps> = ({ show, onHide, listUser, onAddAllUsers }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddAllUsers = async () => {
        setLoading(true);
        try {
            const response = await addAllUsers(listUser);
    
            if (response.status === 200) {
                const failed = response.data.failed || [];
                const failedUsers = listUser.filter((user) =>
                    failed.some((failedUser: User) => failedUser.userName === user.userName)
                );
    
                localStorage.setItem("listUser", JSON.stringify(failedUsers));
                onAddAllUsers(failedUsers);
    
                toast.success("Đăng ký thành công!");
                onHide();
            } else {
                console.log();
                
                handleError(response.status, navigate);
            }
        } catch (error: any) {
            toast.error("Lỗi khi thêm người dùng:", error);
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
