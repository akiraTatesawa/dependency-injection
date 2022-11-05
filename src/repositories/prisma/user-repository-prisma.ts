import { User } from "@/entities/user.entity";
import { inject, injectable } from "inversify";
import TYPES from "@/types";
import { User as PrismaUser } from "@prisma/client";
import { UserRepositoryInterface } from "../user-repository-interface";
import { DBContext } from "../../data/DBContext";

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  private readonly prisma: DBContext;

  constructor(@inject(TYPES.DBContext) prisma: DBContext) {
    this.prisma = prisma;
  }

  public async create(user: User): Promise<void | PrismaUser> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
