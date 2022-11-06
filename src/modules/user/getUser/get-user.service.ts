import { UserDTO } from "@/dto/user.dto";
import { CustomError } from "@/lib/errors";
import TYPES from "@/types";
import { inject, injectable } from "inversify";
import { UserRepositoryInterface } from "../../../repositories/user-repository-interface";
import { UserMapper } from "../../../mappers/user.mapper";
import {
  GetUserRequest,
  GetUserServiceInterface,
} from "./interfaces/get-user-service.interface";

@injectable()
export class GetUserService implements GetUserServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  public async execute({ id }: GetUserRequest): Promise<UserDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }

    return new UserMapper().toDTO(user);
  }
}
