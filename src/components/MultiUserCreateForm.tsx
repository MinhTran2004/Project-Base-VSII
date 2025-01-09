import React, { useState, useEffect, useRef } from "react";
import InputField from "./InputField";
import ButtonCreateUser from "./ButtonCreateUser";
import ModalDisplayListUser from "./ModalDisplayListUser";
import { validateEmail, validatePhoneNumber, validateUserName, validatePassword, validateName } from "../utils/validation";  // Import các hàm validate
import { User } from "../types";
import { ToastContainer, toast } from 'react-toastify';


const MultiUserCreateForm: React.FC = () => {

    const [user, setUser] = useState<User>({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        userStatus: 1,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [listUser, setListUser] = useState<User[]>([]);  // Sử dụng kiểu User[]
    const [showModal, setShowModal] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);

    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    const setInputRef = (name: string) => (el: HTMLInputElement | null) => {
        inputRefs.current[name] = el;
    };

    useEffect(() => {
        const savedListUser = localStorage.getItem("listUser");
        if (savedListUser) {
            setListUser(JSON.parse(savedListUser));
        }
    }, []);

    useEffect(() => {
        if (listUser.length > 0) {
            localStorage.setItem("listUser", JSON.stringify(listUser));
        }
    }, [listUser]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        // Thực hiện kiểm tra và trả về lỗi nếu có
        newErrors.userName = validateUserName(user.userName) || "";
        newErrors.firstName = validateName(user.firstName, "Tên") || "";
        newErrors.lastName = validateName(user.lastName, "Họ") || "";
        newErrors.email = validateEmail(user.email) || "";
        newErrors.password = validatePassword(user.password) || "";
        newErrors.phoneNumber = validatePhoneNumber(user.phoneNumber) || "";

        // Loại bỏ các trường không có lỗi
        for (const key in newErrors) {
            if (!newErrors[key]) {
                delete newErrors[key];
            }
        }

        setErrors(newErrors);

        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            // Xử lý submit thành công
            setIsLoadingSubmit(true);
            setListUser((prevList) => [...prevList, user]);
            setUser({
                userName: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phoneNumber: "",
                userStatus: 1,
            });
            setTimeout(() => {
                setIsLoadingSubmit(false);
                toast.success("Thêm vào danh sách thành công!");
            }, 1000);
        } else {
            // Focus vào input đầu tiên có lỗi
            const firstErrorField = Object.keys(validationErrors)[0];
            if (inputRefs.current[firstErrorField]) {
                inputRefs.current[firstErrorField]?.focus();
            }
        }
    };


    const handleShowModal = () => {
        setIsLoadingModal(true);

        setTimeout(() => {
            setIsLoadingModal(false);
            setShowModal(true);
        }, 500);
    };
    const handleCloseModal = () => setShowModal(false);

    const onAddAllUsers = (newListUser: User[]) => {
        setListUser(newListUser);
    };

    return (
        <>
            <style>
                {`
      html, #root {
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
      `}
            </style>
            <div className="container-fluid d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-6" style={{ marginTop: "3%", marginBottom: "3%", maxWidth: "600px", background: "white", padding: "4%", boxShadow: "0px 0px 16px 0px #00000026" }}>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <InputField
                            label="Tên đăng nhập"
                            placeholder="Nhập tên đăng nhập"
                            name="userName"
                            value={user.userName}
                            onChange={handleChange}
                            error={errors.userName}
                            width="100%"
                            height="45px"
                            ref={setInputRef("userName")}
                        />
                        <div className="d-flex justify-content-between mt-3" style={{ gap: "4%" }}>
                            <InputField
                                label="Tên"
                                placeholder="Nhập tên của bạn"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                error={errors.firstName}
                                width="100%"
                                height="45px"
                                ref={setInputRef("firstName")}
                            />
                            <InputField
                                label="Họ"
                                placeholder="Nhập họ của bạn"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                error={errors.lastName}
                                width="100%"
                                height="45px"
                                ref={setInputRef("lastName")}
                            />
                        </div>
                        <InputField
                            label="Email"
                            placeholder="Nhập email của bạn"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            error={errors.email}
                            width="100%"
                            height="45px"
                            ref={setInputRef("email")}
                        />
                        <InputField
                            label="Mật khẩu"
                            placeholder="Nhập mật khẩu của bạn"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            error={errors.password}
                            type="password"
                            width="100%"
                            height="45px"
                            ref={setInputRef("password")}
                        />
                        <InputField
                            label="Số điện thoại"
                            placeholder="Nhập số điện thoại của bạn"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            error={errors.phoneNumber}
                            width="100%"
                            height="45px"
                            ref={setInputRef("phoneNumber")}
                        />
                        <div className="d-flex justify-content-between mt-4" style={{ marginTop: "2%" }}>
                            <ButtonCreateUser text="Xem danh sách" onClick={handleShowModal} width="49%" height="45px" loading={isLoadingModal}
                                disabled={isLoadingModal} />
                            <ButtonCreateUser
                                text="Gửi"
                                onClick={handleSubmit}
                                width="49%"
                                height="45px"
                                loading={isLoadingSubmit}
                                disabled={isLoadingSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <ModalDisplayListUser show={showModal} onHide={handleCloseModal} listUser={listUser} onAddAllUsers={onAddAllUsers} />
        </>
    );
};

export default MultiUserCreateForm;
