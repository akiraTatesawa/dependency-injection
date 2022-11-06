import { UpdateUserDTO } from "@/dto/update-user.dto";
import { User } from "@/entities/user.entity";
import { CustomError } from "@/lib/errors";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { randEmail, randFullName, randPassword, randUuid } from "@ngneat/falso";
import { UpdateUserService } from "./update-user.service";

describe("Update User Service", () => {
  const userRepository = new UserRepositoryInMemory();
  const updateUserService = new UpdateUserService(userRepository);

  const createUser = async (user: User) => userRepository.create(user);

  it("Should be able to update an user", async () => {
    const mockUser = new User({
      email: randEmail(),
      name: randFullName(),
      password: randPassword(),
    });
    const { id } = await createUser(mockUser);
    const updatedUser: UpdateUserDTO = {
      id,
      name: randFullName(),
    };

    await expect(updateUserService.execute(updatedUser)).resolves.not.toThrow();
  });

  it("Should not be able to update if the user does not exist", async () => {
    const id = randUuid();
    const updatedUser: UpdateUserDTO = {
      id,
      name: randFullName(),
    };

    await expect(updateUserService.execute(updatedUser)).rejects.toEqual(
      new CustomError("error_not_found", "User not found")
    );
  });
});
