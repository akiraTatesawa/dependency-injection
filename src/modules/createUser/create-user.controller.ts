import { CreateUserDTO } from "@/dto/create-user.dto";
import { CreateUserControllerInterface } from "./interfaces/create-user-controller-interface";
import { CreateUserServiceInterface } from "./interfaces/create-user-service-interface";

export class CreateUserController implements CreateUserControllerInterface {
  private readonly createUserService: CreateUserServiceInterface;

  constructor(createUserService: CreateUserServiceInterface) {
    this.createUserService = createUserService;
  }

  async handle(data: CreateUserDTO): Promise<void> {
    await this.createUserService.execute(data);
  }
}
