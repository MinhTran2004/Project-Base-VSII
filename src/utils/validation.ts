export const validateEmail = (email: string): string | null => {
    if (email.length === 0) {
        return "Email là bắt buộc.";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email) ? null : "Định dạng email không hợp lệ.";
};


export const validatePhoneNumber = (phone: string): string | null => {
    if (phone.length === 0) {
        return "Số điện thoại là bắt buộc.";
    }

    const phonePattern = /^(03|05|07|08|09)[0-9]{8}$/;
    return phonePattern.test(phone) ? null : "Định dạng số điện thoại không hợp lệ.";
};

export const validateUserName = (userName: string): string | null => {
    return userName.length === 0 ? "Tên đăng nhập là bắt buộc." : null;
};

export const validatePassword = (password: string): string | null => {
    // Kiểm tra nếu mật khẩu trống
    if (password.length === 0) {
        return "Mật khẩu là bắt buộc.";
    }

    // Kiểm tra mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return passwordPattern.test(password)
        ? null
        : "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
};

export const validateName = (name: string, fieldName: string): string | null => {
    return name.length === 0 ? `${fieldName} là bắt buộc.` : null;
};
