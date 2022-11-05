import { CreateUserDTO } from "@/dto/create-user.dto";
import { CreateUserServiceInterface } from "./interfaces/create-user-service-interface";
import { UserRepositoryInterface } from "../../repositories/user-repository-interface";
import { User } from "../../entities/user.entity";

export class CreateUserService implements CreateUserServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  async execute(user: CreateUserDTO): Promise<void> {
    const userDb = new User(user);

    await this.userRepository.create(userDb);

    console.log(userDb);
  }
}
