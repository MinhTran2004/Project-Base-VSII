import Cookies from "js-cookie";

/**
 * Lấy giá trị cookie
 * @param name Tên cookie
 * @returns Giá trị của cookie hoặc undefined nếu không tồn tại
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}
