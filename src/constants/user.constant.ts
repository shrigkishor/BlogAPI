const USER_LOCAL = {
  /**
   * 1 MB in bytes
   */
  maxProfileImgSize: 1 * 1024 * 1024,
}

export const USER = {
  ...USER_LOCAL,
  profilePictureChanged: 'Avatar changed.',
  userNotFound: 'User not found',
  emailAlreadyTaken: 'Username already taken',
  otpExpired: 'OTP is expired',
  emailNotVerified: 'Email not verified',
  userAlreadyExist: 'User already exists',
  systemError: 'Something went wrong while registering the user',
  passwordMismatch: 'New password and confirm password should be match',

  lgProfileImgNotAllowed: `Image is not allowed more than ${USER_LOCAL.maxProfileImgSize} in bytes.`,
  publicMediaRoute: 'public/users',
}
