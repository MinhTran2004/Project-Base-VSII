// Hàm xử lý thông báo lỗi dựa trên mã trạng thái HTTP
export const getErrorMessage = (status: string, navigate: any): string => {
    switch (status) {
        // Mã trạng thái 1xx: Thông báo thông tin
        case '100':
            return 'Đang xử lý yêu cầu, vui lòng chờ.';
        case '101':
            return 'Đang chuyển giao giao thức.';
        case '102':
            return 'Đang xử lý yêu cầu, không trả lời ngay.';
        case '103':
            return 'Đang xử lý yêu cầu, trả lời sớm.';

        // Mã trạng thái 2xx: Thành công
        case '200':
            return 'Yêu cầu thành công.';
        case '201':
            return 'Tài nguyên đã được tạo thành công.';
        case '202':
            return 'Yêu cầu đã được tiếp nhận nhưng chưa xử lý.';
        case '203':
            return 'Thông tin không đáng tin cậy.';
        case '204':
            return 'Không có nội dung được trả về.';
        case '205':
            return 'Yêu cầu thành công, và người dùng cần phải xóa hoặc thay đổi thông tin trong tài liệu.';
        case '206':
            return 'Yêu cầu thành công, và chỉ có một phần dữ liệu được trả về.';

        // Mã trạng thái 3xx: Chuyển hướng
        case '300':
            return 'Yêu cầu có nhiều lựa chọn.';
        case '301':
            return 'Trang đã bị chuyển hướng vĩnh viễn.';
        case '302':
            return 'Trang đã chuyển hướng tạm thời.';
        case '303':
            return 'Để lấy tài nguyên, vui lòng thực hiện một yêu cầu GET tại địa chỉ khác.';
        case '304':
            return 'Tài nguyên chưa thay đổi kể từ lần yêu cầu trước.';
        case '305':
            return 'Yêu cầu phải sử dụng proxy.';
        case '306':
            return 'Mã trạng thái không còn sử dụng.';
        case '307':
            return 'Trang đã chuyển hướng tạm thời (được yêu cầu với phương thức giống như yêu cầu ban đầu).';
        case '308':
            return 'Chuyển hướng vĩnh viễn, yêu cầu vẫn phải sử dụng phương thức HTTP ban đầu.';

        // Mã trạng thái 4xx: Lỗi phía client
        case '400':
            return 'Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.';
        case '401':
            navigate('/*', { state: { imageError: 'https://sitechecker.pro/wp-content/uploads/2023/06/401-status-code.png' } });
            return 'Bạn cần đăng nhập để thực hiện hành động này.';
        case '402':
            return 'Thanh toán cần thiết (chưa sử dụng phổ biến).';
        case '403':
            navigate('/*', { state: { imageError: 'https://sitechecker.pro/wp-content/uploads/2023/06/403-status-code.png' } });
            return 'Bạn không có quyền truy cập vào tài nguyên này.';
        case '404':
            navigate('/*', { state: { imageError: 'https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png' } });
            return 'Không tìm thấy tài nguyên yêu cầu.';
        case '405':
            return 'Phương thức yêu cầu không được phép cho tài nguyên này.';
        case '406':
            return 'Tài nguyên không thể chấp nhận yêu cầu theo định dạng hiện tại.';
        case '407':
            return 'Xác thực proxy yêu cầu.';
        case '408':
            return 'Yêu cầu của bạn đã hết thời gian chờ.';
        case '409':
            return 'Xung đột dữ liệu. Vui lòng kiểm tra lại.';
        case '410':
            return 'Tài nguyên không còn tồn tại và sẽ không được truy cập nữa.';
        case '411':
            return 'Yêu cầu thiếu trường "Content-Length".';
        case '412':
            return 'Điều kiện trước đó của yêu cầu không được thỏa mãn.';
        case '413':
            return 'Yêu cầu của bạn quá lớn để xử lý.';
        case '414':
            return 'URL yêu cầu quá dài.';
        case '415':
            return 'Định dạng của tài nguyên không hỗ trợ.';
        case '416':
            return 'Dải tài nguyên yêu cầu không hợp lệ.';
        case '417':
            return 'Yêu cầu thất bại do điều kiện "Expectation" không thỏa mãn.';
        case '418':
            return 'Tôi là một ấm trà (mã lỗi vui của RFC 2324).';
        case '421':
            return 'Yêu cầu bị lạ hóa do định tuyến không chính xác.';
        case '422':
            return 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.';
        case '423':
            return 'Tài nguyên đã bị khóa.';
        case '424':
            return 'Yêu cầu thất bại do lỗi phụ thuộc.';
        case '425':
            return 'Lỗi chưa được xác định (RFC 8470).';
        case '426':
            return 'Yêu cầu nâng cấp phiên bản giao thức.';
        case '427':
            return 'Bắt buộc phải sử dụng mã hóa dữ liệu.';
        case '428':
            return 'Yêu cầu phải có điều kiện trước.';
        case '429':
            return 'Quá nhiều yêu cầu trong một khoảng thời gian ngắn. Vui lòng thử lại sau.';
        case '431':
            return 'Yêu cầu có trường đầu quá lớn.';
        case '451':
            return 'Tài nguyên bị hạn chế do lý do pháp lý.';

        // Mã trạng thái 5xx: Lỗi phía server
        case '500':
            navigate('/*', { state: { imageError: 'https://sitechecker.pro/wp-content/uploads/2023/08/505-status-code.png' } });
            return 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.';
        case '501':
            return 'Máy chủ không hỗ trợ tính năng yêu cầu.';
        case '502':
            return 'Lỗi gateway. Máy chủ không thể kết nối tới máy chủ phụ trợ.';
        case '503':
            return 'Dịch vụ không khả dụng. Máy chủ đang bảo trì.';
        case '504':
            return 'Yêu cầu của bạn đã hết thời gian chờ.';
        case '505':
            return 'Phiên bản HTTP không được hỗ trợ.';
        case '506':
            return 'Chuyển hướng với tính năng nâng cao không hợp lệ.';
        case '507':
            return 'Không đủ dung lượng để hoàn tất yêu cầu.';
        case '508':
            return 'Vòng lặp vô hạn trong yêu cầu.';
        case '510':
            return 'Cần phải mở rộng tính năng để xử lý yêu cầu.';
        case '511':
            return 'Yêu cầu xác thực mạng (Network Authentication Required).';

        // Nếu mã trạng thái không được nhận dạng
        default:
            return 'Mã trạng thái không hợp lệ hoặc không được hỗ trợ.';
    }
};