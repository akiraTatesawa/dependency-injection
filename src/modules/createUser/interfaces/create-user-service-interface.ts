import { CreateUserDTO } from "@/dto/create-user.dto";
import { User as PrismaUser } from "@prisma/client";

export interface CreateUserServiceInterface {
  execute(user: CreateUserDTO): Promise<void | PrismaUser>;
}
