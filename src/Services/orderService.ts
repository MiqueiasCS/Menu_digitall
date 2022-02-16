import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { Order } from "../Entities/orderEntites";
import { Product } from "../Entities/productEntities";
import { OrderProduct } from "../Entities/orderProductEntites";
import { AppError } from "../Errors";

interface IProducts {
  productId: string;
  quantity: number;
}

interface ICreateOrder {
  tableId: string;
  client: string;
  products: IProducts[];
}

const teste = async (list: any) => {
  const orderProductRepository = getRepository(OrderProduct);

  const maisumalista = [];

  for (let i = 0; i < list.length; i++) {
    let algumacoisa = await orderProductRepository.save(list[i]);

    maisumalista.push(algumacoisa);
  }

  return maisumalista;
};

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

  let order = await orderRepository.findOne({
    where: { table: table },
    relations: ["order_product", "table"],
  });

  if (!order) {
    let orderData = {
      table: table,
      client: data.client,
    };

    order = orderRepository.create(orderData);
    await orderRepository.save(order);
  }

  let selectedProducts = data.products.map((item) => {
    let findProducts = productsList.filter(
      (product) => product.id === item.productId
    );

    let orderAtualProduct = orderProductRepository.create({
      product: findProducts[0],
      product_quantity: item.quantity,
      order: order,
    });

    return orderAtualProduct;
  });

  // console.log(selectedProducts);

  let meusdeusmeajuda = await teste(selectedProducts);

  console.log(meusdeusmeajuda);
};
