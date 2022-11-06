import httpStatus from "http-status";

export const Errors = {
  error_bad_request: {
    status: httpStatus.BAD_REQUEST,
    name: "Bad Request",
  },
  error_unauthorized: {
    status: httpStatus.UNAUTHORIZED,
    name: "Unauthorized",
  },
  error_forbidden: {
    status: httpStatus.FORBIDDEN,
    name: "Forbidden",
  },
  error_not_found: {
    status: httpStatus.NOT_FOUND,
    name: "Not Found",
  },
  error_conflict: {
    status: httpStatus.CONFLICT,
    name: "Conflict",
  },
  error_unprocessable_entity: {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    name: "Unprocessable Entity",
  },
  error_internal_server_error: {
    status: httpStatus.INTERNAL_SERVER_ERROR,
    name: "Internal Server Error",
  },
};

export type ErrorType = keyof typeof Errors;

interface CustomErrorInterface {
  type: ErrorType;
  message: string;
}

export class CustomError implements CustomErrorInterface {
  public type: ErrorType;

  public message: string;

  constructor(type: ErrorType, message: string) {
    this.type = type;
    this.message = message;
  }
}
