import { UpdateUserDTO } from "@/dto/update-user.dto";
import { ServiceExecute } from "@/lib/service.interface";

export interface UpdateUserServiceInterface
  extends ServiceExecute<UpdateUserDTO, void> {}
