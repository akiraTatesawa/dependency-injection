import { CreateUserDTO } from "@/dto/create-user.dto";
import { ServiceExecute } from "@/lib/service.interface";
import { User as PrismaUser } from "@prisma/client";

export interface CreateUserServiceInterface
  extends ServiceExecute<CreateUserDTO, PrismaUser> {}
