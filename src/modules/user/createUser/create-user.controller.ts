import { SchemaValidator } from "@/middlewares/schema-validator";
import TYPES from "@/types";
import { Request } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  interfaces,
} from "inversify-express-utils";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";

@controller("/users")
export class CreateUserController
  extends BaseHttpController
  implements interfaces.Controller
{
  private readonly createUserService: CreateUserServiceInterface;

  constructor(
    @inject(TYPES.CreateUserServiceInterface)
    createUserService: CreateUserServiceInterface
  ) {
    super();
    this.createUserService = createUserService;
  }

  @httpPost("/", SchemaValidator.validateBody("createUserSchema"))
  public async create(req: Request): Promise<interfaces.IHttpActionResult> {
    const user = await this.createUserService.execute(req.body);

    return this.ok(user);
  }
}
