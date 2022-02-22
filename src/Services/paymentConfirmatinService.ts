import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { AppError } from "../Errors";
import { getOrder, getOrderProductListResponse, listBills } from "../utils";

const list_orders = async (orders: any) => {
  let orderList = [];

  for (let index = 0; index < orders.length; index++) {
    let order = await getOrder(orders[index].id);
    orderList.push(order);
  }
  return orderList;
};

const list_products_per_order = async (orders: any) => {
  const orderList = [];
  for (let index = 0; index < orders.length; index++) {
    let order = await getOrderProductListResponse(orders[index]);

    let orderResponse = {
      orderDate: orders[index].order_date,
      orderId: orders[index].id,
      client: orders[index].client,
      table: orders[index].table.tableidentifier,
      products: order,
    };
    orderList.push(orderResponse);
  }
  return orderList;
};

export const createPaymentConfirmationService = async (
  tableidentifier: string
) => {
  const tableRepository = getRepository(Table);

  tableidentifier = tableidentifier.toLowerCase();

  try {
    let table = await tableRepository.findOne({
      where: { tableidentifier: tableidentifier },
      relations: ["orders"],
    });

    if (!table) {
      throw new AppError("Table not registered", 400);
    }

    let orderList = await list_orders(table.orders);

    // let ordersListWithProducts = list_products_per_order(orderList);

    let bills = await listBills(orderList);

    let unpaidList = bills.filter((item) => item.hasOwnProperty("message"));

    if (unpaidList.length > 0) {
      return unpaidList;
    }

    return bills;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
