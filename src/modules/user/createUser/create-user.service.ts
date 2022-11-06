import "reflect-metadata";

import { CreateUserDTO } from "@/dto/create-user.dto";
import { User } from "@/entities/user.entity";
import { UserRepositoryInterface } from "@/repositories/user-repository-interface";
import TYPES from "@/types";
import { inject, injectable } from "inversify";
import { User as PrismaUser } from "@prisma/client";
import { CustomError } from "@/lib/errors";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";

@injectable()
export class CreateUserService implements CreateUserServiceInterface {
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    @inject(TYPES.UserRepositoryInterface)
    userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  private async ensureUserIsUnique({ email }: CreateUserDTO) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new CustomError(
        "error_conflict",
        `The email ${email} is already being used`
      );
    }
  }

  public async execute(user: CreateUserDTO): Promise<PrismaUser> {
    await this.ensureUserIsUnique(user);

    const userDb = new User(user);

    const createdUser = await this.userRepository.create(userDb);

    return createdUser;
  }
}
