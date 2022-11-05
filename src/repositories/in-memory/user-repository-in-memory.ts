import { User } from "@/entities/user.entity";
import { UserRepositoryInterface } from "../user-repository-interface";

export class UserRepositoryInMemory implements UserRepositoryInterface {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
