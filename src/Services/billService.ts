import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { Table } from "../Entities/tableEntities";
import { IBillProps } from "../Types";
import { findBill, listBills, getOrder, getFinalPrice } from "../utils";

export const createBillService = async (data: IBillProps) => {
  const { orderId } = data;
  const billRepository = getRepository(Bill);

  try {
    let billOrder = await getOrder(orderId);

    let finalPrice = await getFinalPrice(billOrder);

    let billData = {
      form_of_payment: data.formOfPayment,
      final_price: finalPrice,
      order: billOrder,
    };

    let bill = billRepository.create(billData);
    await billRepository.save(bill);

    return bill;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};

export const GetBillService = async (orderId: string) => {
  const orderRepository = getRepository(Order);
  try {
    let order = await getOrder(orderId);

    let billResponse = findBill(order, true);

    return billResponse;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};

export const GetTableBillsService = async (tableId: string) => {
  const tableRepository = getRepository(Table);
  const orderRepository = getRepository(Order);

  try {
    let table = await tableRepository.findOne(tableId);

    if (!table) {
      throw new AppError("unregistered table", 400);
    }

    let orders = await orderRepository.find({
      where: { table },
      relations: ["table", "dispatched", "order_product"],
    });

    let bills = await listBills(orders);

    return bills;
  } catch (err) {
    throw new AppError((err as any).message, 400);
  }
};
