import Joi from "joi";
import { CreateUserDTO } from "../dto/create-user.dto";

const createUserSchema = Joi.object<CreateUserDTO>({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const updateUserSchema = Joi.object<{ name: string }>({
  name: Joi.string().required(),
});

export { createUserSchema, updateUserSchema };
