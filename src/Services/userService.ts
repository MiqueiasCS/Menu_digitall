import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AppError } from "../Errors";
import { ILoginProps, IUserProps } from "../Types";
import { User } from "../Entities/userEntities";
import jwt from "jsonwebtoken";

export const createUserService = async (data: IUserProps) => {
  const { email } = data;
  data.password = bcrypt.hashSync(data.password, 10);

  try {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({ email });

    if (!user) {
      user = userRepository.create(data);
      await userRepository.save(user);

      return user;
    } else {
      throw new AppError("Email already exists", 400);
    }
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};

export const loginService = async (data: ILoginProps) => {
  const { email, password } = data;
  const userRepository = getRepository(User);

  try {
    let user = await userRepository.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new AppError("Email or password incorrect", 401);
      }

      let tokenData = { id: user.id, isAdm: user.isAdm, email: user.email };

      const token = jwt.sign({ user: tokenData }, "secret", {
        expiresIn: process.env.EXPIRES_IN,
      });

      return token;
    }
  } catch (e) {
    throw new AppError((e as any).message, 404);
  }
};
