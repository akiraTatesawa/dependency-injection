import { User as PrismaUser } from "@prisma/client";
import { User } from "@/entities/user.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void | PrismaUser>;
}
