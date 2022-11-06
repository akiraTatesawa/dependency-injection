import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { User } from "@/entities/user.entity";
import { randEmail, randFullName, randPassword, randUuid } from "@ngneat/falso";
import { CustomError } from "@/lib/errors";
import { GetUserService } from "./get-user.service";

describe("Get User By Id Service", () => {
  const userRepository = new UserRepositoryInMemory();
  const getUserService = new GetUserService(userRepository);

  const createUser = (user: User) => userRepository.create(user);

  it("Should be able to get an user", async () => {
    const mockUser = new User({
      email: randEmail(),
      name: randFullName(),
      password: randPassword(),
    });

    const { id } = await createUser(mockUser);

    const userFromRepo = await getUserService.execute({ id });

    expect(userFromRepo.email).toEqual(mockUser.email);
    expect(userFromRepo.name).toEqual(mockUser.name);
    expect(userFromRepo.id).toEqual(id);
    expect(userFromRepo).toHaveProperty("registrationDate");
  });

  it("Should not be able to get an user if it does not exist", async () => {
    await expect(getUserService.execute({ id: randUuid() })).rejects.toEqual(
      new CustomError("error_not_found", "User not found")
    );
  });
});
