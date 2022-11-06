import { ServiceExecute } from "@/lib/service.interface";

export type DeleteUserParams = { id: string };

export interface DeleteUserServiceInterface
  extends ServiceExecute<DeleteUserParams, void> {}
