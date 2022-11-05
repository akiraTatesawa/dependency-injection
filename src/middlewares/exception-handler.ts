/* eslint-disable @typescript-eslint/no-unused-vars */
import { Errors, ErrorType } from "@/lib/errors";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface ErrorHandlerObject extends ErrorRequestHandler, Error {
  type: ErrorType;
  message: string;
}

export class ExceptionHandler {
  public static handle(
    error: ErrorHandlerObject,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) {
    const { message, type } = error;

    if (Errors[type]) {
      const { status, name } = Errors[type];
      return res.status(status).json({ name, message });
    }

    console.log(error);
    return res.sendStatus(500);
  }
}
