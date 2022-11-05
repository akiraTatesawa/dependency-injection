import { User } from "@/entities/user.entity";
import { injectable } from "inversify";
import { UserRepositoryInterface } from "../user-repository-interface";

@injectable()
export class UserRepositoryInMemory implements UserRepositoryInterface {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
