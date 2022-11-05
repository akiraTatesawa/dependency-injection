import { CreateUserDTO } from "@/dto/create-user.dto";

export class User {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly timestamp: Date;

  constructor({ email, name, password }: CreateUserDTO) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.timestamp = new Date();
  }
}
