import { UserDTO } from "@/dto/user.dto";
import { ServiceExecute } from "@/lib/service.interface";

export interface GetAllUsersServiceInterface
  extends ServiceExecute<void, UserDTO[]> {}
