import { UserDTO } from "@/dto/user.dto";
import { ServiceExecute } from "@/lib/service.interface";

export type GetUserRequest = { id: string };

export interface GetUserServiceInterface
  extends ServiceExecute<GetUserRequest, UserDTO> {}
