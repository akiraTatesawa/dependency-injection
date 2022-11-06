import { UserDTO } from "@/dto/user.dto";
import { ServiceExecute } from "@/lib/service.interface";

export type GetUserRequest = { id: string };

export interface GetUserService
  extends ServiceExecute<GetUserRequest, UserDTO> {}
