import TYPES from "@/types";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestParam,
  response,
} from "inversify-express-utils";
import * as express from "express";
import { SchemaValidator } from "@/middlewares/schema-validator";
import { CreateUserServiceInterface } from "./createUser/interfaces/create-user-service.interface";
import { GetUserServiceInterface } from "./getUser/interfaces/get-user-service.interface";

@controller("/users")
export class UserController
  extends BaseHttpController
  implements interfaces.Controller
{
  private readonly createUserService: CreateUserServiceInterface;

  private readonly getUserService: GetUserServiceInterface;

  constructor(
    @inject(TYPES.CreateUserServiceInterface)
    createUserService: CreateUserServiceInterface,
    @inject(TYPES.GetUserServiceInterface)
    getUserService: GetUserServiceInterface
  ) {
    super();
    this.createUserService = createUserService;
    this.getUserService = getUserService;
  }

  @httpPost("/", SchemaValidator.validateBody("createUserSchema"))
  public async create(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const user = await this.createUserService.execute(req.body);

    return res.status(201).send(user);
  }

  @httpGet("/:id")
  public async listOne(
    @requestParam("id") id: string,
    @response() res: express.Response
  ) {
    const user = await this.getUserService.execute({ id });

    return res.status(200).send(user);
  }
}
