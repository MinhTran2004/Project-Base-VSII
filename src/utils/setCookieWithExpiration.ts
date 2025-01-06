import Cookies from "js-cookie";

/**
 * Đặt cookie với thời gian hết hạn
 * @param name Tên của cookie
 * @param value Giá trị của cookie
 * @param expires Thời gian hết hạn, có thể là ngày hoặc số ngày
 */
function setCookieWithExpiration(
  name: string,
  value: string | number,
  expires: Date | number
): void {
  Cookies.set(name, value.toString(), { expires });
}

export default setCookieWithExpiration;
