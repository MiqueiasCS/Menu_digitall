import { getRepository } from "typeorm";
import { Table } from "../Entities/tableEntities";
import { AppError } from "../Errors";
import { listBills, list_orders, registerBillsBackupList } from "../utils";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { OrderProduct } from "../Entities/orderProductEntites";
import { OrderDispatched } from "../Entities/orderDispatched";

const clearOrderProductDataList = async (orderProductList: any) => {
  const orderProductRepository = getRepository(OrderProduct);

  for (let index = 0; index < orderProductList.length; index++) {
    let orderProductId = orderProductList[index].id;

    await orderProductRepository.delete(orderProductId);
  }
  return "successfully deleted";
};

const clearOrderDispatchedDataList = async (orderDispatchedList: any) => {
  const orderDispatchedRepository = getRepository(OrderDispatched);

  for (let index = 0; index < orderDispatchedList.length; index++) {
    let orderDispatchedId = orderDispatchedList[index].id;

    await orderDispatchedRepository.delete(orderDispatchedId);
  }
  return "successfully deleted";
};

const clearOrderDataList = async (orderList: any) => {
  const orderRepository = getRepository(Order);

  for (let index = 0; index < orderList.length; index++) {
    let orderId = orderList[index].id;
    await clearOrderProductDataList(orderList[index].order_product);
    await clearOrderDispatchedDataList(orderList[index].dispatched);

    await orderRepository.delete(orderId);
  }

  return "successfully deleted";
};

const clearBillDataList = async (billsList: any) => {
  const billRepository = getRepository(Bill);

  for (let index = 0; index < billsList.length; index++) {
    let billId = billsList[index].billId;
    await billRepository.delete(billId);
  }
  return "successfully deleted";
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

    if (table.orders.length === 0) {
      throw new AppError("There are no orders registered for this table", 400);
    }

    let orderList = await list_orders(table.orders);

    let bills = await listBills(orderList);

    let unpaidList = bills.filter((item) => item.hasOwnProperty("message"));

    if (unpaidList.length > 0) {
      return unpaidList;
    }

    await registerBillsBackupList(bills);
    await clearBillDataList(bills);
    await clearOrderDataList(orderList);

    return { message: "payment confirmed!" };
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
