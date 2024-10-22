import crypto from "crypto";

export const getToken = () => {
  const randomString = crypto.randomBytes(4).toString("hex");
  return randomString;
};

export const getHashedVerifyToken = (token: string) => {
  const verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return verificationToken;
};

export const getVerifyTokenExpired = () => {
  const verificationTokenExpire = new Date(Date.now() + 30 * 60 * 1000);
  return verificationTokenExpire;
};

export const getHashedResetToken = (token: string) => {
  const resetToken = crypto.createHash("sha256").update(token).digest("hex");
  return resetToken;
};

export const getResetTokenExpired = () => {
  const resetTokenExpire = new Date(Date.now() + 30 * 60 * 1000);
  return resetTokenExpire;
};
