import { CreateUserDTO } from "@/dto/create-user.dto";

export interface CreateUserServiceInterface {
  execute(user: CreateUserDTO): Promise<void>;
}
