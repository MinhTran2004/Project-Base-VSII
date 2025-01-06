export default function isValidPhoneNumber(phoneNumber: string): boolean {
  const pattern = /^0(3|5|7|8|9)[0-9]{8}$/;
  return pattern.test(phoneNumber);
}
