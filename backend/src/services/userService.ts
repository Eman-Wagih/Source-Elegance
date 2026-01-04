import { AppDataSource } from "../data-source";
import { User, type userType } from "../entity/User.js";

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  type?: userType;
}) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ ...data, type: data.type || "shopper" });
  await userRepo.save(user);

  return user;
};
