import { CreateUserDTO } from "@/dto/create-user.dto";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { randAbbreviation, randEmail, randFullName } from "@ngneat/falso";
import { CreateUserService } from "./create-user.service";

describe("Create User Service", () => {
  const userRepository = new UserRepositoryInMemory();
  const userService = new CreateUserService(userRepository);

  it("Should be able to create an user", async () => {
    const mockUser: CreateUserDTO = {
      email: randEmail(),
      name: randFullName(),
      password: randAbbreviation(),
    };

    const user = await userService.execute(mockUser);

    expect(user.email).toEqual(mockUser.email);
    expect(user.name).toEqual(mockUser.name);
    expect(user.password).toEqual(mockUser.password);
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("createdAt");
  });
});
