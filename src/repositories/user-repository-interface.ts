import { User as PrismaUser } from "@prisma/client";
import { User } from "@/entities/user.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<PrismaUser>;
  findByEmail(email: string): Promise<null | PrismaUser>;
  findById(id: string): Promise<null | PrismaUser>;
}
