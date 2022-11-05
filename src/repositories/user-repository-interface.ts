import { User } from "@/entities/user.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
}
