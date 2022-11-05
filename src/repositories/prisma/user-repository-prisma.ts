import { User } from "@/entities/user.entity";
import { injectable } from "inversify";
import { User as PrismaUser } from "@prisma/client";
import { UserRepositoryInterface } from "../user-repository-interface";
import { DBContext } from "../../data/DBContext";

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  private readonly prisma: DBContext;

  constructor(prisma: DBContext) {
    this.prisma = prisma;
  }

  public async create(user: User): Promise<void | PrismaUser> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
