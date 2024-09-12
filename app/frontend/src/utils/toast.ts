// src/utils/toast.ts
import toast from 'react-hot-toast';

const errorMessages: { [key: number]: string } = {
    1001: "Email không hợp lệ",
    1002: "Không tìm thấy đường dẫn",
    1003: "Tên người dùng không hợp lệ",
    1004: "Không tìm thấy người dùng",
    1005: "Không thể lưu phiên khi đăng nhập",
    1006: "Người dùng đã tồn tại",
    1007: "Lỗi không xác định",
    1008: "Mật khẩu không hợp lệ",
    1009: "Tên không hợp lệ",
    1010: "Họ không hợp lệ",
    1011: "Họ và tên không hợp lệ",
  };
  

export function showToast(message: string) {
  toast.success(message);
}

export function showErrorToast(code: number) {
  const message = errorMessages[code] || "An unknown error occurred";
  toast.error(message);
}