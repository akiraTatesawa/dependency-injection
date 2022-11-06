/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from "express";
import "express-async-errors";
import "dotenv/config";
import { InversifyExpressServer } from "inversify-express-utils";
import { Container } from "inversify";

import TYPES from "@/types";
import { UserRepositoryPrisma } from "@/repositories/prisma/user-repository-prisma";
import { DBContext } from "@/data/DBContext";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import { CreateUserServiceInterface } from "@/modules/user/createUser/interfaces/create-user-service-interface";
import { CreateUserService } from "@/modules/user/createUser/create-user.service";
import { Application } from "@/lib/abstract-application";

import "@/modules/user/createUser/create-user.controller";
import { ExceptionHandler } from "@/middlewares/exception-handler";

export class App extends Application {
  private server: InversifyExpressServer;

  constructor() {
    super();

    this.server = new InversifyExpressServer(this.container);
    this.server.setConfig((app) => {
      app.use(express.json());
    });
    this.server.setErrorConfig((app) => {
      app.use(ExceptionHandler.handle);
    });
  }

  public configDependencies(container: Container): void {
    container.bind(DBContext).toSelf();
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

  public async init(): Promise<void> {
    const db = this.container.get(DBContext);

    await db.connect();

    const app = this.server.build();

    app.listen(process.env.PORT || 4000, () => {
      console.log(`\nServer running on http://localhost:${process.env.PORT}`);
    });
  }
}
