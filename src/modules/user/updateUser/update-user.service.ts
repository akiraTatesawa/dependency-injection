import { UpdateUserDTO } from "@/dto/update-user.dto";
import { CustomError } from "@/lib/errors";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import TYPES from "@/types";
import { inject, injectable } from "inversify";
import { UpdateUserServiceInterface } from "./interfaces/update-user-service.interface";

@injectable()
export class UpdateUserService implements UpdateUserServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  private async ensureUserExists(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError("error_not_found", "User not found");
    }
  }

  public async execute({ id, name }: UpdateUserDTO): Promise<void> {
    await this.ensureUserExists(id);

    await this.userRepository.update({ id, name });

    console.log("\nUser updated successfully");
  }
}
