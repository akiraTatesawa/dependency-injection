import { User } from "@/entities/user.entity";
import { UserRepositoryInMemory } from "@/repositories/in-memory/user-repository-in-memory";
import { randEmail, randFullName, randPassword } from "@ngneat/falso";
import { GetAllUsersService } from "./get-all-users.service";

describe("Get All Users Service", () => {
  const userRepository = new UserRepositoryInMemory();
  const getAllUsersService = new GetAllUsersService(userRepository);

  const generateMockUser = () =>
    new User({
      email: randEmail(),
      name: randFullName(),
      password: randPassword(),
    });

  beforeAll(async () => {
    const promise = [
      userRepository.create(generateMockUser()),
      userRepository.create(generateMockUser()),
    ];

    await Promise.all(promise);
  });

  it("Should return an array with all the users", async () => {
    const users = await getAllUsersService.execute();

    expect(users).toBeInstanceOf(Array);
    expect(users[1]).toHaveProperty("id");
  });
});
