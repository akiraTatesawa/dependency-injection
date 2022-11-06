import { UserDTO } from "@/dto/user.dto";
import { UserMapper } from "@/mappers/user.mapper";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import TYPES from "@/types";
import { inject, injectable } from "inversify";
import { GetAllUsersServiceInterface } from "./interfaces/get-all-users-service.interface";

@injectable()
export class GetAllUsersService implements GetAllUsersServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<UserDTO[]> {
    const dbUsers = await this.userRepository.findAll();

    const mapper = new UserMapper();

    return dbUsers.map((dbUser) => mapper.toDTO(dbUser));
  }
}
