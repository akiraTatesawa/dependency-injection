import "reflect-metadata";

import { User } from "@/entities/user.entity";
import { injectable } from "inversify";
import { User as PrismaUser } from "@prisma/client";
import { randUuid } from "@ngneat/falso";
import { UserRepositoryInterface } from "../user-repository-interface";

@injectable()
export class UserRepositoryInMemory implements UserRepositoryInterface {
  private users: PrismaUser[] = [];

  async create(user: User): Promise<PrismaUser> {
    const repoUser: PrismaUser = { ...user, id: randUuid() };

    this.users.push(repoUser);

    return repoUser;
  }
}
