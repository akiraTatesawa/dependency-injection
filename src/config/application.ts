import * as express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import TYPES from "@/types";
import { UserRepositoryPrisma } from "@/repositories/prisma/user-repository-prisma";
import { container } from "./di-container";
import { UserRepositoryInterface } from "../repositories/user-repository-interface";
import "@/modules/createUser/create-user.controller";
import { CreateUserServiceInterface } from "../modules/createUser/interfaces/create-user-service-interface";
import { CreateUserService } from "../modules/createUser/create-user.service";
import { DBContext } from "../data/DBContext";

export class App {
  private server: InversifyExpressServer;

  constructor() {
    this.configDependencies();

    this.server = new InversifyExpressServer(container);

    this.server.setConfig((app) => {
      app.use(express.json());
    });
  }

  public configDependencies() {
    container.bind<DBContext>(TYPES.DBContext).to(DBContext);
    container
      .bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
      .to(UserRepositoryPrisma);
    container
      .bind<CreateUserServiceInterface>(TYPES.CreateUserServiceInterface)
      .to(CreateUserService);
  }

  public get getApp(): express.Application {
    return this.server.build();
  }

  public async init() {
    const app = this.server.build();

    app.listen(4000, () => {
      console.log("Server running on port 4000");
    });
  }
}
