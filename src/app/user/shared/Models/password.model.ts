export interface UserIdPassword {
  oldPassword: string,
  newPassword: string
}

export interface UserEmailPassword {
  email: string,
  mobile: number,
  newPassword: string
}

export interface PasswordResponse {
  statusCode: number,
  message: string
}
