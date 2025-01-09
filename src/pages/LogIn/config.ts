export const expirationTimeRefreshToken = () => {
  const expirationTime = new Date();
  //   expirationTime.setTime(expirationTime.getTime() + 30 * 1000);
  expirationTime.setDate(expirationTime.getDate() + 7);
  return expirationTime;
};

export const expirationTimeAccessToken = () => {
  const expirationTime = new Date();
  expirationTime.setDate(expirationTime.getDate() + 1);
  return expirationTime;
};
