import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { Order } from "../Entities/orderEntites";
import { Product } from "../Entities/productEntities";
import { OrderProduct } from "../Entities/orderProductEntites";
import { AppError } from "../Errors";
import { ICreateOrder } from "../Types";
import { saveOrderProductList } from "../utils";

export const createOrderService = async (data: ICreateOrder) => {
  const tableRepository = getRepository(Table);
  const orderRepository = getRepository(Order);
  const productsRepository = getRepository(Product);
  const orderProductRepository = getRepository(OrderProduct);

  let table = await tableRepository.findOne({ id: data.tableId });

  if (!table) {
    throw new AppError("Table not registered", 400);
  }

  let productsList = await productsRepository.find();

  let orderData = {
    table: table,
    client: data.client,
  };

  let order = orderRepository.create(orderData);
  await orderRepository.save(order);

  let selectedProducts = data.products.map((item) => {
    let findProducts = productsList.filter(
      (product) => product.id === item.productId
    );

    if (findProducts.length === 0) throw new AppError("Product not found", 404);

    let orderAtualProduct = orderProductRepository.create({
      product: findProducts[0],
      product_quantity: item.quantity,
      order: order,
    });

    return orderAtualProduct;
  });

  await saveOrderProductList(selectedProducts);

  return order;
};
