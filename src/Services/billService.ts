import { getRepository } from "typeorm";
import { AppError } from "../Errors";
import { Bill } from "../Entities/billEntities";
import { Order } from "../Entities/orderEntites";
import { OrderProduct } from "../Entities/orderProductEntites";
import { Table } from "../Entities/tableEntities";
import { IBillProps } from "../Types";

let formattedOrders = (orderProductlist: any) => {
  let orderProductList = [];
  for (let i = 0; i < orderProductlist.length; i++) {
    let productResponse = {
      productId: orderProductlist[i].product.id,
      product: orderProductlist[i].product.name,
      price: orderProductlist[i].product.price,
      quantity: orderProductlist[i].product_quantity,
    };
    orderProductList.push(productResponse);
  }
  return orderProductList;
};

const findBill = async (order: any, getASingleBill: boolean = false) => {
  const billRepository = getRepository(Bill);
  const ordersProductRepository = getRepository(OrderProduct);

  let bill = await billRepository.findOne({
    where: { order },
    relations: ["order"],
  });

  if (!bill) {
    if (getASingleBill) {
      throw new AppError("There is no bill for this table", 400);
    } else {
      return {
        orderID: order.id,
        message: "There is no bill registered for this order",
      };
    }
  }

  let orderProductlist = await ordersProductRepository.find({
    where: { order },
    relations: ["product"],
    select: ["product", "product_quantity"],
  });

  const billResponse = {
    billId: bill.id,
    date: bill.bill_date,
    orderId: order.id,
    client: order.client,
    finalPrice: bill.final_price,
    formOfPayment: bill.form_of_payment,
    orders: formattedOrders(orderProductlist),
  };

  return billResponse;
};

const listBills = async (orderList: any) => {
  let billsList = [];
  for (let index = 0; index < orderList.length; index++) {
    let bill = await findBill(orderList[index]);
    billsList.push(bill);
  }
  return billsList;
};

const getOrder = async (orderId: string) => {
  const orderRepository = getRepository(Order);

  let order = await orderRepository.findOne({
    where: { id: orderId },
    relations: ["table", "dispatched", "order_product"],
  });

  if (!order) {
    throw new AppError("The Order does not exist", 404);
  }

  return order;
};

const getFinalPrice = async (order: any) => {
  const ordersProductRepository = getRepository(OrderProduct);
  const orderProductlist = await ordersProductRepository.find({
    where: { order },
    relations: ["product"],
  });

  let finalPrice = orderProductlist.reduce((ac, item) => {
    return ac + item.product.price * item.product_quantity;
  }, 0);

  return finalPrice;
};

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
