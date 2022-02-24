import { getRepository } from "typeorm";
import * as bcrypt from "bcrypt";
import { AppError } from "../Errors";
import { ILoginProps, IUserProps, ISellableQuantityProps } from "../Types";
import { User } from "../Entities/userEntities";
import jwt from "jsonwebtoken";
import { BillBackup } from "../Entities/billsBackupEntities";
import { getMostSellableProduct } from "../utils";
import { getAllProductsService } from "./productService";

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

export const getDailyBalanceService = async (date: string) => {
  const backupRepository = getRepository(BillBackup)

  const backups = await backupRepository.find({
    select: ["billDate", "totalPaid", "orders"],
    relations: ["orders"]
  })

  let backupsByDate = backups.filter(el => el.billDate.includes(date))
  let dailyBalance = backupsByDate.reduce((acc, cur) => acc + cur.totalPaid, 0)

  let allProductsInfo = await getAllProductsService()
  let products: string[] = []
  allProductsInfo.map(el => products.push(el.name))

  let sellableInfo: ISellableQuantityProps = {}

  for (let i = 0; i < products.length; i++) {
    sellableInfo[products[i]] = 0
  }

  backupsByDate.map(el => {
    el.orders.map(elm => {
      for (let i = 0; i < products.length; i++) {
        if (elm.product === products[i]) {
          sellableInfo[products[i]] += elm.quantity
        }
      }
    })
  })

  let mostSellableProduct = getMostSellableProduct(sellableInfo)

  return {
    dailyBalance: `R$ ${dailyBalance}`,
    bestSelling: mostSellableProduct,
    allSoldProducts: sellableInfo
  }
}
