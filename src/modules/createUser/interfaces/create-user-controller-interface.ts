import { CreateUserDTO } from "@/dto/create-user.dto";

export interface CreateUserControllerInterface {
  handle(data: CreateUserDTO): Promise<void>;
}
