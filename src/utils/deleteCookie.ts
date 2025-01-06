import Cookies from "js-cookie";

/**
 * Xóa cookie
 * @param name Tên cookie
 */
export function deleteCookie(name: string): void {
  Cookies.remove(name);
}
