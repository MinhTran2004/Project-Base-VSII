import React, { useState, useRef } from "react";
import ButtonCreateUser from "./ButtonCreateUser";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import {
    validateEmail,
    validatePassword,
  } from "../utils/validation"; 

  
  const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const [errors, setErrors] = useState({
      email: "",
      password: "",
    });


    const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const setInputRef = (name: string) => (el: HTMLInputElement | null) => {
        inputRefs.current[name] = el;
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  
      // Xóa lỗi của trường khi người dùng nhập lại
      setErrors((prev) => ({ ...prev, [name]: "" }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      
        const newErrors = {
          email: validateEmail(formData.email) || "",
          password: validatePassword(formData.password) || "",
        };
      
        setErrors(newErrors);
      
        const hasErrors = Object.values(newErrors).some((error) => error.length > 0);
      
        if (hasErrors) {
          const firstErrorField = Object.keys(newErrors).find((key) => newErrors[key].length > 0);
          if (firstErrorField) {
            const inputElement = document.querySelector<HTMLInputElement>(`input[name="${firstErrorField}"]`);
            inputElement?.focus();
          }
          return;
        }

        setLoading(true);

      
        const fixedAccount = {
          email: "admin@gmail.com",
          password: "Admin@123",
        };

         
        setTimeout(() => {
            setLoading(false);
          
            if (formData.email === fixedAccount.email && formData.password === fixedAccount.password) {
              localStorage.setItem('role', 'admin'); // Lưu vai trò vào localStorage
          
              // Chờ một thời gian ngắn để đảm bảo dữ liệu được lưu
              setTimeout(() => {
                navigate("/addListUser", {
                  state: { message: "Đăng nhập thành công!", type: "success" },
                });
              }, 200); // Đợi 200ms để localStorage sẵn sàng
            } else {
              alert("Thông tin đăng nhập không chính xác.");
            }
          }, 1000);
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

            <div className="container mt-5" style={{ maxWidth: "500px", background: 'white', padding: '5%',  boxShadow: "0px 0px 16px 0px #00000026"  }}>
                <h2 className="text-center mb-4">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        placeholder="Nhập email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        width="100%"
                        height="45px"
                    ref={setInputRef("email")}
                    />
                    <InputField
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        width="100%"
                        height="45px"
                        type="password"
                    ref={setInputRef("password")}
                    />
                    <div className="mt-5">
                        <ButtonCreateUser
                            text="Đăng nhập"
                            width="100%"
                            height="45px"
                            onClick={ handleSubmit}
                            loading={loading}
                            disabled={loading}
                        />
                    </div>

                </form>
            </div>
        </>

    );
};

export default LoginForm;
