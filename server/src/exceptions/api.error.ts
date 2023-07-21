import { ValidationError } from "express-validator";
class ApiError extends Error {
  public status: number;
  public errors?: ValidationError[];

  constructor(status: number, message: string, errors?: ValidationError[]) {
    super(message);
    (this.status = status), (this.errors = errors);
  }

  static UnauthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static BadRequest(message: string, errors?: ValidationError[]) {
    return new ApiError(400, message, errors);
  }
}

export default ApiError;
