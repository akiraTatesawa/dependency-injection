import "reflect-metadata";

import { User } from "@/entities/user.entity";
import { injectable } from "inversify";
import { User as PrismaUser } from "@prisma/client";
import { randUuid } from "@ngneat/falso";
import { UpdateUserDTO } from "@/dto/update-user.dto";
import { UserRepositoryInterface } from "../user-repository-interface";

@injectable()
export class UserRepositoryInMemory implements UserRepositoryInterface {
  private users: PrismaUser[] = [];

  public async create(user: User): Promise<PrismaUser> {
    const repoUser: PrismaUser = { ...user, id: randUuid() };

    this.users.push(repoUser);

    return repoUser;
  }

  public async findByEmail(email: string): Promise<PrismaUser | null> {
    const user = this.users.find(
      (inMemoryUser) => inMemoryUser.email === email
    );

    if (!user) {
      return null;
    }

    return user;
  }

  public async findById(id: string): Promise<PrismaUser | null> {
    const user = this.users.find((inMemoryUser) => inMemoryUser.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  public async findAll(): Promise<PrismaUser[]> {
    return this.users;
  }

  public async update({ id, name }: UpdateUserDTO): Promise<void> {
    const userIndex = this.users.findIndex(
      (inMemoryUser) => inMemoryUser.id === id
    );

    this.users[userIndex].name = name;
  }
}
