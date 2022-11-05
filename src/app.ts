import "dotenv/config";

import { UserRepositoryInMemory } from "./repositories/in-memory/user-repository-in-memory";
import { CreateUserService } from "./modules/createUser/create-user.service";
import { CreateUserController } from "./modules/createUser/create-user.controller";

export async function Bootstrap() {
  const userRepository = new UserRepositoryInMemory();
  const createUserService = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUserService);

  await createUserController.handle({
    email: "email@gmail.com",
    name: "Test",
    password: "1234",
  });
}

try {
  Bootstrap();
} catch (error) {
  console.log(error);
}
