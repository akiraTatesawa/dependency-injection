import { CustomError } from "@/lib/errors";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import TYPES from "@/types";
import { inject, injectable } from "inversify";
import {
  DeleteUserParams,
  DeleteUserServiceInterface,
} from "./interfaces/delete-user-service.interface";

@injectable()
export class DeleteUserService implements DeleteUserServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  private async ensureUserExist(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }
  }

  public async execute({ id }: DeleteUserParams): Promise<void> {
    await this.ensureUserExist(id);

    await this.userRepository.delete(id);

    console.log("User deleted successfully!");
  }
}
