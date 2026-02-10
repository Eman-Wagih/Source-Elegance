import { AppDataSource } from "../data-source.js";
import { User, type userType } from "../entity/User.js";

export const createUser = async (data: {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  type?: userType;
}) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ ...data, type: data.type || "shopper" });
  return await userRepo.save(user);
};

export const loginUser = async (identifier: string) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({
    where: [{ userName: identifier }, { email: identifier }],
  });
  return user;
};
