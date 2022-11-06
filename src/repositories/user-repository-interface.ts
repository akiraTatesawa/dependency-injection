import { User as PrismaUser } from "@prisma/client";
import { User } from "@/entities/user.entity";
import { UpdateUserDTO } from "@/dto/update-user.dto";

export interface UserRepositoryInterface {
  create(user: User): Promise<PrismaUser>;
  findByEmail(email: string): Promise<null | PrismaUser>;
  findById(id: string): Promise<null | PrismaUser>;
  findAll(): Promise<PrismaUser[]>;
  update(data: UpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}
