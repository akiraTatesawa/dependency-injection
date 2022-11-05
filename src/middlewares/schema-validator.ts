import { CustomError } from "@/lib/errors";
import * as Schemas from "@/schemas/user-schemas";
import { NextFunction, Request, Response } from "express";

type SchemasTypes = keyof typeof Schemas;

export class SchemaValidator {
  public static validateBody(schema: SchemasTypes) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const { error } = Schemas[schema].validate(req.body, {
        abortEarly: false,
        convert: false,
      });

      if (error) {
        const message = error.details
          .map((detail) => detail.message)
          .join("; ");
        throw new CustomError("error_bad_request", message);
      }

      return next();
    };
  }
}
