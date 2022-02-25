import { Between, getRepository, LessThanOrEqual, MoreThan } from "typeorm";
import { Product } from "../Entities/productEntities";
import { AppError } from "../Errors";
import { IProductProps } from "../Types";

export const createProductService = async (
  data: IProductProps,
  isAdm: boolean
) => {
  const { name } = data;

  if (isAdm) {
    try {
      const productRepository = getRepository(Product);
      let product = await productRepository.findOne({ name });

      if (!product) {
        product = productRepository.create(data);

        await productRepository.save(product);

        return product;
      } else {
        throw new AppError("Product already registered", 400);
      }
    } catch (err) {
      throw new AppError((err as any).message, 400);
    }
  } else {
    throw new AppError("Unsifficient permission", 401);
  }
};

export const getProductByIdService = async (id: string) => {
  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.findOne(
      { id },
      {
        select: ["name", "price"],
      }
    );

    if (!product) throw new AppError("Product not found", 404);

    return product;
  } catch (err) {
    throw new AppError((err as any).message, (err as any).statusCode);
  }
};

export const getAllProductsService = async () => {
  const productRepository = getRepository(Product);
  const products = await productRepository.find({
    select: ["id", "name", "price"],
    where: {
      available: true,
    },
  });

  return products;
};

export const getAllProductsByOrderService = async (orderType: string) => {
  const productRepository = getRepository(Product);
  if (orderType === "ASC" || orderType === "DESC") {
    const products = await productRepository.find({
      select: ["id", "name", "price"],
      where: {
        available: true,
      },
      order: {
        name: `${orderType}`,
      },
    });

    return products;
  } else {
    throw new AppError("Wrong query params", 404);
  }
};

export const getAllProductsByPriceOrderService = async (orderPrice: number) => {
  const productRepository = getRepository(Product);
  let products;

  if (orderPrice <= 10) {
    products = await productRepository.find({
      select: ["id", "name", "price"],
      where: {
        available: true,
        price: LessThanOrEqual(orderPrice),
      },
    });
  } else if (orderPrice > 10 && orderPrice <= 50) {
    products = await productRepository.find({
      select: ["id", "name", "price"],
      where: {
        available: true,
        price: Between(10, 50),
      },
    });
  } else if (orderPrice > 50) {
    products = await productRepository.find({
      select: ["id", "name", "price"],
      where: {
        available: true,
        price: MoreThan(orderPrice),
      },
    });
  }

  return products;
};

export const updateProductStatusService = async (
  id: string,
  status: boolean,
  isAdm: boolean
) => {
  const productRepository = getRepository(Product);

  if (isAdm) {
    if (typeof status === "boolean") {
      try {
        const product = await productRepository.findOne(id);

        return await productRepository.save({
          ...product,
          available: status,
        });
      } catch (err) {
        throw new AppError("Product not found", 404);
      }
    } else {
      throw new AppError("Only available allowed. It must be a boolean", 400);
    }
  } else {
    throw new AppError("Unsufficient permission", 401);
  }
};
