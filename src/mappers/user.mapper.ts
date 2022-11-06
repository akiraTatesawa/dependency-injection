import { UserDTO } from "@/dto/user.dto";
import { Mapper } from "@/lib/mapper";
import { User as PrismaUser } from "@prisma/client";
import dayjs from "dayjs";

export class UserMapper extends Mapper<PrismaUser, UserDTO> {
  public toDTO({ createdAt, email, id, name }: PrismaUser): UserDTO {
    const registrationDate: string = dayjs(createdAt).format("DD/MM/YYYY");

    return {
      id,
      email,
      name,
      registrationDate,
    };
  }
}
