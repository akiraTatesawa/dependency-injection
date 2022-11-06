import { User } from "@/entities/user.entity";
import { CustomError } from "@/lib/errors";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { randEmail, randFullName, randPassword, randUuid } from "@ngneat/falso";
import { DeleteUserService } from "./delete-user.service";

describe("Delete User Service", () => {
  const userRepository = new UserRepositoryInMemory();
  const deleteUserService = new DeleteUserService(userRepository);

  const createUser = (user: User) => userRepository.create(user);

  it("Should be able to delete an user", async () => {
    const mockUser = new User({
      email: randEmail(),
      name: randFullName(),
      password: randPassword(),
    });

    const { id } = await createUser(mockUser);

    await expect(deleteUserService.execute({ id })).resolves.not.toThrow();
  });

  it("Should not be able to delete if user does not exist", async () => {
    const id = randUuid();

    await expect(deleteUserService.execute({ id })).rejects.toEqual(
      new CustomError("error_not_found", "User not found")
    );
  });
});
