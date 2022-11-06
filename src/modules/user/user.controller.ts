import TYPES from "@/types";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  interfaces,
  request,
  requestBody,
  requestParam,
  response,
} from "inversify-express-utils";
import * as express from "express";
import { SchemaValidator } from "@/middlewares/schema-validator";
import { CreateUserServiceInterface } from "./createUser/interfaces/create-user-service.interface";
import { GetUserServiceInterface } from "./getUser/interfaces/get-user-service.interface";
import { GetAllUsersServiceInterface } from "./getAllUsers/interfaces/get-all-users-service.interface";
import { UpdateUserServiceInterface } from "./updateUser/interfaces/update-user-service.interface";
import { DeleteUserServiceInterface } from "./deleteUser/interfaces/delete-user-service.interface";

@controller("/users")
export class UserController
  extends BaseHttpController
  implements interfaces.Controller
{
  private readonly createUserService: CreateUserServiceInterface;

  private readonly getUserService: GetUserServiceInterface;

  private readonly getAllUsersService: GetAllUsersServiceInterface;

  private readonly updateUserService: UpdateUserServiceInterface;

  private readonly deleteUserService: DeleteUserServiceInterface;

  constructor(
    @inject(TYPES.CreateUserServiceInterface)
    createUserService: CreateUserServiceInterface,
    @inject(TYPES.GetUserServiceInterface)
    getUserService: GetUserServiceInterface,
    @inject(TYPES.GetAllUsersServiceInterface)
    getAllUsersService: GetAllUsersServiceInterface,
    @inject(TYPES.UpdateUserServiceInterface)
    updateUserService: UpdateUserServiceInterface,
    @inject(TYPES.DeleteUserServiceInterface)
    deleteUserService: DeleteUserServiceInterface
  ) {
    super();
    this.createUserService = createUserService;
    this.getUserService = getUserService;
    this.getAllUsersService = getAllUsersService;
    this.updateUserService = updateUserService;
    this.deleteUserService = deleteUserService;
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

  @httpGet("/")
  public async listAll(@response() res: express.Response) {
    const user = await this.getAllUsersService.execute();

    return res.status(200).send(user);
  }

  @httpPatch("/:id", SchemaValidator.validateBody("updateUserSchema"))
  public async update(
    @requestParam("id") id: string,
    @requestBody() body: { name: string },
    @response() res: express.Response
  ) {
    await this.updateUserService.execute({ id, name: body.name });

    return res.status(200).send();
  }

  @httpDelete("/:id")
  public async delete(
    @requestParam("id") id: string,
    @response() res: express.Response
  ) {
    await this.deleteUserService.execute({ id });

    return res.status(200).send();
  }
}
